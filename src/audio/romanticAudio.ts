/**
 * Romantic Ambient Music Generator using Web Audio API
 * Produces an ethereal, warm, music-box & celesta romantic arpeggio progression.
 * 100% self-contained, no external audio file dependencies or CORS issues.
 */

class RomanticAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private currentStep: number = 0;

  // Gentle romantic melody notes (Frequencies in Hz: C4, D4, E4, F4, G4, A4, B4, C5, D5, E5, F5, G5)
  // Progression: F Major 7 -> D minor 9 -> B-flat Major 7 -> C add9
  private readonly melodyPattern: number[] = [
    // Measure 1: Fmaj7 (F3, C4, E4, A4, C5)
    174.61, 261.63, 329.63, 440.00, 523.25, 440.00, 329.63, 261.63,
    // Measure 2: Dm9 (D3, A3, F4, C5, E5)
    146.83, 220.00, 349.23, 523.25, 659.25, 523.25, 349.23, 220.00,
    // Measure 3: Bbmaj7 (Bb2, F3, D4, A4, D5)
    116.54, 174.61, 293.66, 440.00, 587.33, 440.00, 293.66, 174.61,
    // Measure 4: C9sus4 / C major (C3, G3, E4, G4, C5)
    130.81, 196.00, 329.63, 392.00, 523.25, 392.00, 329.63, 196.00,
    // Measure 5: Sweet melodic peak (A4, C5, F5, E5, C5, A4)
    440.00, 523.25, 698.46, 659.25, 523.25, 440.00, 349.23, 261.63,
    // Measure 6: Gentle descent (G4, B4, D5, G5, D5, B4)
    392.00, 493.88, 587.33, 783.99, 587.33, 493.88, 392.00, 196.00,
  ];

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      
      // Master gain for gentle volume and soft fade-in
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a soft, bell-like / music box chime tone
  private playChime(freq: number, time: number, duration: number = 2.4) {
    if (!this.audioCtx || !this.masterGain) return;

    // Dual oscillator: Sine for fundamental warmth + triangle with subtle detune for chime sweetness
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    // Gentle low-pass to eliminate harshness and create warm antique music-box quality
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.Q.setValueAtTime(1.5, time);

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, time); // Octave overtone shimmer

    // Volume envelope (gentle attack, smooth bell decay)
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(0.18, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.06, time + 0.4);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  private scheduleNextNotes = () => {
    if (!this.isPlaying || !this.audioCtx) return;

    const currentTime = this.audioCtx.currentTime;
    const noteInterval = 0.48; // Tempo in seconds per note (~62 BPM, slow & peaceful)
    const lookahead = 0.8;

    // Schedule next chunk
    while (this.audioCtx.currentTime + lookahead > currentTime) {
      const freq = this.melodyPattern[this.currentStep % this.melodyPattern.length];
      this.playChime(freq, currentTime + 0.05, 2.5);

      // Occasionally add a sweet harmony 3rd or 5th
      if (this.currentStep % 4 === 0) {
        this.playChime(freq * 1.5, currentTime + 0.12, 2.0);
      }

      this.currentStep++;
      break;
    }

    this.timerId = window.setTimeout(this.scheduleNextNotes, noteInterval * 1000);
  };

  public play() {
    this.initContext();
    if (!this.audioCtx || !this.masterGain) return;

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Gentle fade-in
    this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.45, this.audioCtx.currentTime + 1.5);

    this.scheduleNextNotes();
  }

  public pause() {
    if (!this.isPlaying || !this.audioCtx || !this.masterGain) return;
    this.isPlaying = false;

    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }

    // Gentle fade-out
    this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.8);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioPlayer();

