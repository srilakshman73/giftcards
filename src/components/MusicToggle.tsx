import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ExternalLink, Sparkles } from 'lucide-react';
import { romanticAudio } from '../audio/romanticAudio';

const YOUTUBE_VIDEO_ID = '2NrpwkyoTrI';
const YOUTUBE_VIDEO_URL = 'https://youtu.be/2NrpwkyoTrI';
const SONG_TITLE = 'Adiye';

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isEmbedBlocked, setIsEmbedBlocked] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize YouTube IFrame API
  useEffect(() => {
    // Polite helper bubble after 3.5 seconds
    const hintTimer = setTimeout(() => {
      setShowHint(true);
    }, 3500);

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player('youtube-audio-iframe', {
          videoId: YOUTUBE_VIDEO_ID,
          width: '200',
          height: '200',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              event.target.setVolume(75);
            },
            onStateChange: (event) => {
              if (window.YT) {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  setIsPlaying(false);
                }
              }
            },
            onError: (event) => {
              // YouTube errors 100, 101, 150 = video not allowed to be played in embedded players
              console.warn('YouTube embed restricted or error encountered (code: ' + event.data + '). Enabling romantic fallback.');
              setIsEmbedBlocked(true);
              setIsPlaying(false);
            },
          },
        });
      } catch (err) {
        console.warn('Failed to initialize YouTube player, using romantic fallback:', err);
        setIsEmbedBlocked(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Save existing callback if any
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };

      // Load YouTube IFrame API script if not loaded
      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
    }

    return () => {
      clearTimeout(hintTimer);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Handle Play/Pause Toggle
  const handleTogglePlay = () => {
    setShowHint(false);

    // If YouTube embed is blocked or user chose fallback acoustic mode
    if (isEmbedBlocked || isFallbackMode) {
      const active = romanticAudio.toggle();
      setIsPlaying(active);
      return;
    }

    if (!playerRef.current || !isReady) {
      // If YouTube is still initializing or unavailable, use gentle fallback
      const active = romanticAudio.toggle();
      setIsPlaying(active);
      setIsFallbackMode(true);
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        // Stop any conflicting fallback synthesizer
        romanticAudio.pause();
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch {
      // If browser blocked unmuted autoplay or player errored, fallback
      setIsEmbedBlocked(true);
      const active = romanticAudio.toggle();
      setIsPlaying(active);
    }
  };

  // Handle Mute/Unmute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFallbackMode || isEmbedBlocked) {
      const active = romanticAudio.toggle();
      setIsPlaying(active);
      return;
    }

    if (playerRef.current && isReady) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (err) {
        console.warn('Could not toggle mute', err);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[90vw]"
    >
      {/* Hidden YouTube IFrame Container */}
      <div
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id="youtube-audio-iframe" />
      </div>

      {/* Gentle helper bubble */}
      {showHint && !isPlaying && (
        <div
          role="status"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-rose-200 text-xs text-cherry-deep shadow-lg animate-bounce"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-dark animate-pulse" />
          <span>Tap to play our song “{SONG_TITLE}” ♫</span>
        </div>
      )}

      {/* Luxury Romantic Player Pill */}
      <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-champagne/60 rounded-full p-1.5 pr-3 shadow-luxury transition-all duration-300 hover:shadow-gold-glow">
        {/* Main Play / Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause romantic background song' : 'Play our romantic song'}
          title={isPlaying ? 'Pause song' : `Play romantic song: ${SONG_TITLE}`}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-serif text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-500 to-cherry text-white shadow-sm'
              : 'bg-rose-50 hover:bg-rose-100 text-cherry hover:text-cherry-deep border border-rose-200/70'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 mr-0.5">
                <span className="w-0.5 h-full bg-white rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2 bg-white rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.15s]" />
                <span className="w-0.5 h-3 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.3s]" />
              </div>
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Playing: {SONG_TITLE}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Play Our Song ♫</span>
            </>
          )}
        </button>

        {/* Mute/Unmute Control (Visible when playing or in fallback) */}
        {isPlaying && (
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded-full text-cherry hover:bg-rose-100/60 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-600" />
            )}
          </button>
        )}

        {/* Direct Link to YouTube Song */}
        <a
          href={YOUTUBE_VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${SONG_TITLE} on YouTube`}
          title={`Open ${SONG_TITLE} on YouTube (new tab)`}
          className="flex items-center gap-1 pl-2 pr-1 py-1 text-[11px] font-sans text-cherry/75 hover:text-rose-600 border-l border-rose-200/60 transition-colors"
        >
          <Music className="w-3.5 h-3.5 text-rose-500" />
          <span className="hidden sm:inline font-cormorant italic text-xs">YouTube</span>
          <ExternalLink className="w-3 h-3 text-rose-400" />
        </a>
      </div>

      {/* Graceful Fallback Notice if YouTube Restricts Embedding */}
      {isEmbedBlocked && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blush-50/95 border border-rose-200 shadow-sm text-[11px] text-cherry-deep font-cormorant italic">
          <span>YouTube playback protected:</span>
          <a
            href={YOUTUBE_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif not-italic text-xs text-rose-600 underline font-semibold hover:text-cherry"
          >
            Listen on YouTube ↗
          </a>
        </div>
      )}
    </div>
  );
};
