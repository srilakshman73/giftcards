import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Edit3, Heart, Share2, Check } from 'lucide-react';
import { LuxuryWaxSeal, FloralCorner, HandDrawnRose } from './FloralBorders';

interface FinalSurpriseProps {
  message?: string;
  onReplay: () => void;
  onOpenPersonalizer: () => void;
  onShare: () => void;
  shareCopied: boolean;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  message = 'No matter how ordinary today may be, I hope this little gift makes it a little more beautiful. 🌷',
  onReplay,
  onOpenPersonalizer,
  onShare,
  shareCopied,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Burst of pastel sparkles
    confetti({
      particleCount: 28,
      spread: 70,
      origin: { y: 0.85 },
      colors: ['#FDA4AF', '#E11D48', '#D4AF37', '#FFF1F2'],
    });
  };

  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 pt-8 pb-16 text-center">
      <div className="flex flex-col items-center">
        {/* Section Pretitle */}
        <span className="font-script text-2xl sm:text-3xl text-rose-500 mb-1">
          One Last Wish
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cherry-deep mb-6">
          A Gentle Token to Carry With You
        </h3>

        {/* Closed Rose-Pink Envelope */}
        {!isOpen ? (
          <div className="relative w-full max-w-md aspect-[16/10] rounded-2xl bg-gradient-to-br from-[#FDF0F3] via-[#FCE4EC] to-[#F8BBD0] border-2 border-champagne/60 shadow-xl flex flex-col items-center justify-center p-6 transition-transform hover:scale-[1.02]">
            <FloralCorner position="top-left" className="absolute top-1 left-1 w-16 h-16 opacity-70" />
            <FloralCorner position="bottom-right" className="absolute bottom-1 right-1 w-16 h-16 opacity-70" />

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-rose-400/25 border-y border-champagne/40" />

            <LuxuryWaxSeal label="Open Wish" onClick={handleOpen} pulsing />
            
            <p className="mt-4 font-serif text-xs uppercase tracking-widest text-cherry/80 font-semibold">
              Tap the seal to reveal your final wish 🌷
            </p>
          </div>
        ) : (
          /* Revealed Final Message */
          <div className="relative w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-md border border-champagne/60 shadow-luxury p-8 sm:p-10 transition-all duration-700 animate-[fadeIn_0.5s_ease-out]">
            <FloralCorner position="top-left" className="absolute top-1 left-1 w-16 h-16 opacity-70" />
            <FloralCorner position="bottom-right" className="absolute bottom-1 right-1 w-16 h-16 opacity-70" />

            <div className="flex justify-center mb-3">
              <HandDrawnRose size={50} />
            </div>

            <p className="font-cormorant italic text-2xl sm:text-3xl text-cherry-deep leading-relaxed font-medium">
              “{message}”
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 text-rose-500 font-serif text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-champagne-dark" />
              <span>With All My Heart</span>
              <Sparkles className="w-4 h-4 text-champagne-dark" />
            </div>
          </div>
        )}

        {/* Global Action Bar: Replay, Personalize, Share */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Replay Surprise */}
          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-cherry border border-rose-200 shadow-sm hover:shadow hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-serif"
          >
            <RotateCcw className="w-4 h-4 text-rose-500" />
            <span>Replay Opening ↺</span>
          </button>

          {/* Personalize Card */}
          <button
            onClick={onOpenPersonalizer}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cherry text-white hover:bg-cherry-light border border-champagne/50 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-serif font-semibold"
          >
            <Edit3 className="w-4 h-4 text-champagne" />
            <span>Personalize This Card ✎</span>
          </button>

          {/* Share Link */}
          <button
            onClick={onShare}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 hover:bg-white text-cherry border border-rose-200 shadow-sm hover:shadow hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-serif"
          >
            {shareCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-rose-500" />
                <span>Share Card Link</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Credit & Warm Quote */}
        <footer className="mt-12 text-center text-xs text-cherry/60 font-cormorant italic tracking-wide">
          <p className="flex items-center justify-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> and rose petals — A Rose Just for You.
          </p>
        </footer>
      </div>
    </section>
  );
};

