import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { LuxuryWaxSeal, FloralCorner } from './FloralBorders';

interface GiftEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const GiftEnvelope: React.FC<GiftEnvelopeProps> = ({ onOpen, isOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerConfetti = () => {
    // Elegant shower of rose petals, hearts, and gold dust
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#E11D48', '#FDA4AF', '#F43F5E', '#D4AF37', '#FFF1F2', '#881337'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.7 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.1,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.7 },
        colors: colors,
        shapes: ['circle'],
        scalar: 1.1,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleOpenClick = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    triggerConfetti();

    // Allow the flap and ribbon unfold animation to play before transitioning view
    setTimeout(() => {
      onOpen();
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 py-8">
      {/* 3D Envelope Container */}
      <div
        className={`relative w-full aspect-[4/3] max-w-[460px] rounded-2xl transition-all duration-1000 ${
          isAnimating || isOpen ? 'scale-105' : 'hover:scale-[1.02]'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Outer Shadow & Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-900/20 via-rose-300/15 to-champagne/20 blur-xl -z-10" />

        {/* Envelope Body */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#FDF0F2] via-[#F8DCE2] to-[#E8B8C4] border-2 border-champagne/50 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6">
          
          {/* Subtle Paper Fiber Texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(#8A2846 0.75px, transparent 0.75px)',
              backgroundSize: '12px 12px',
            }}
          />

          {/* Floral Corners */}
          <FloralCorner position="top-left" className="absolute top-1 left-1 w-20 h-20 opacity-80" />
          <FloralCorner position="top-right" className="absolute top-1 right-1 w-20 h-20 opacity-80" />
          <FloralCorner position="bottom-left" className="absolute bottom-1 left-1 w-20 h-20 opacity-80" />
          <FloralCorner position="bottom-right" className="absolute bottom-1 right-1 w-20 h-20 opacity-80" />

          {/* Envelope Diagonal Fold Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 0 0 L 50 48 L 100 0"
                fill="none"
                stroke="rgba(212, 175, 55, 0.45)"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
              />
              <path
                d="M 0 100 L 50 52 L 100 100"
                fill="none"
                stroke="rgba(196, 139, 139, 0.35)"
                strokeWidth="0.6"
              />
              <path
                d="M 0 0 L 48 50 L 0 100"
                fill="none"
                stroke="rgba(196, 139, 139, 0.25)"
                strokeWidth="0.5"
              />
              <path
                d="M 100 0 L 52 50 L 100 100"
                fill="none"
                stroke="rgba(196, 139, 139, 0.25)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Satin Ribbon Horizontal & Vertical Wraps */}
          <div
            className={`absolute inset-x-0 h-10 top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-400 via-rose-300 to-rose-400 shadow-[0_2px_10px_rgba(107,22,38,0.25)] border-y border-champagne/60 flex items-center justify-center transition-all duration-700 ${
              isAnimating ? 'opacity-0 scale-y-0' : 'opacity-100'
            }`}
          >
            <div className="w-full h-0.5 bg-champagne-light/50" />
          </div>

          <div
            className={`absolute inset-y-0 w-10 left-1/2 -translate-x-1/2 bg-gradient-to-b from-rose-400 via-rose-300 to-rose-400 shadow-[2px_0_10px_rgba(107,22,38,0.25)] border-x border-champagne/60 flex items-center justify-center transition-all duration-700 ${
              isAnimating ? 'opacity-0 scale-x-0' : 'opacity-100'
            }`}
          >
            <div className="h-full w-0.5 bg-champagne-light/50" />
          </div>

          {/* Animated Flap (Rotates on Open) */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-1000 ease-in-out pointer-events-none ${
              isAnimating || isOpen ? '-rotate-x-180 opacity-40' : 'rotate-x-0'
            }`}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#FBE8EC] to-[#F3C4D0] rounded-t-2xl border-t border-champagne/60 clip-path-polygon" />
          </div>

          {/* Centerpiece Wax Seal with Rose Monogram */}
          <div className="relative z-20 flex flex-col items-center">
            <LuxuryWaxSeal
              label="Harishma"
              onClick={handleOpenClick}
              pulsing={!isAnimating && !isOpen}
            />
            <span className="mt-3 text-xs tracking-wider uppercase font-serif text-cherry-DEFAULT/80 font-semibold drop-shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-champagne-dark" /> Sealed Especially For Harishma
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={handleOpenClick}
          disabled={isAnimating || isOpen}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-serif font-semibold text-base sm:text-lg text-white bg-gradient-to-r from-cherry via-rose-600 to-cherry shadow-[0_12px_32px_rgba(107,22,38,0.35)] hover:shadow-[0_16px_40px_rgba(107,22,38,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-champagne/60 cursor-pointer disabled:opacity-70"
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 rounded-full overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </span>

          <Heart className="w-5 h-5 text-rose-200 fill-rose-300 group-hover:scale-110 transition-transform animate-pulse" />
          <span className="tracking-wide">Open Your Surprise, Chella Kutty ❤️</span>
        </button>

        <p className="text-xs sm:text-sm text-cherry/70 font-cormorant italic tracking-wide">
          Tap the wax seal or button above to unveil your love letter
        </p>
      </div>
    </div>
  );
};

