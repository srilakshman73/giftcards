import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../audio/romanticAudio';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Show a polite subtle hint after 3 seconds if music hasn't been played
    const timer = setTimeout(() => {
      if (!romanticAudio.getIsPlaying()) {
        setShowHint(true);
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    const active = romanticAudio.toggle();
    setIsPlaying(active);
    setShowHint(false);
  };

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      {/* Gentle helper bubble */}
      {showHint && !isPlaying && (
        <div
          role="status"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200 text-xs text-cherry shadow-lg animate-bounce"
        >
          <Music className="w-3.5 h-3.5 text-rose-500 animate-spin" />
          <span>Tap to play romantic melody ♫</span>
        </div>
      )}

      {/* Luxury Music Button */}
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause background romantic melody' : 'Play background romantic melody'}
        title={isPlaying ? 'Pause romantic melody' : 'Play gentle music box melody'}
        className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
          isPlaying
            ? 'bg-rose-500/90 text-white border border-rose-300 shadow-rose-300/40 hover:bg-rose-600'
            : 'bg-white/85 text-cherry-deep border border-champagne/60 hover:bg-white hover:border-champagne hover:shadow-gold-glow'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 h-full bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-white rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-3 bg-white rounded-full animate-[pulse_0.6s_ease-in-out_infinite_0.4s]" />
            </div>
            <Volume2 className="w-4 h-4 text-white" />
            <span className="text-xs font-serif font-medium tracking-wide">Melody On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors" />
            <span className="text-xs font-serif font-medium tracking-wide text-cherry">Play Melody</span>
          </>
        )}
      </button>
    </div>
  );
};

