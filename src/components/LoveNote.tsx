import React, { useState } from 'react';
import { Mail, Sparkles, X, HeartHandshake } from 'lucide-react';
import { HandDrawnRose, FloralCorner } from './FloralBorders';

interface LoveNoteProps {
  title?: string;
  message?: string;
}

export const LoveNote: React.FC<LoveNoteProps> = ({
  title = 'There’s one more thing…',
  message = 'Out of all the little surprises life could bring, I’m glad you’re someone I get to know. Keep smiling, keep being yourself, and never forget that someone out there thinks you’re amazing.',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Closed State Button / Teaser */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/90 backdrop-blur-md border border-rose-300 shadow-md hover:shadow-card-glow hover:border-champagne hover:scale-105 active:scale-95 transition-all duration-300 text-cherry cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors shadow-inner">
            <Mail className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>

          <div className="text-left">
            <span className="block font-serif font-bold text-base sm:text-lg text-cherry-deep group-hover:text-rose-600 transition-colors">
              {title}
            </span>
            <span className="block font-cormorant italic text-xs sm:text-sm text-cherry/70">
              Tap to unfold this private little note
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-champagne-dark animate-pulse ml-1" />
        </button>
      ) : (
        /* Unfolded Note Container */
        <div className="relative w-full rounded-3xl bg-[#FFFDF9] border border-champagne/60 shadow-luxury p-6 sm:p-10 transition-all duration-700 animate-[fadeIn_0.5s_ease-out] overflow-hidden">
          
          {/* Paper Texture and Inset Border */}
          <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-dashed border-rose-200/80 pointer-events-none" />
          
          {/* Floral Corners */}
          <FloralCorner position="top-left" className="absolute top-1 left-1 w-16 h-16 opacity-75" />
          <FloralCorner position="bottom-right" className="absolute bottom-1 right-1 w-16 h-16 opacity-75" />

          {/* Close / Fold Button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fold secret note"
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-100 text-cherry/70 hover:text-cherry flex items-center justify-center transition-colors border border-rose-200"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Note Header */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/60 text-xs font-serif text-cherry-light uppercase tracking-wider mb-2">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>A Quiet Whisper</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-cherry-deep font-bold">
              {title}
            </h3>
          </div>

          {/* Botanical Rose Center Accent */}
          <div className="flex justify-center my-2">
            <HandDrawnRose size={42} />
          </div>

          {/* Handwritten Note Content */}
          <div className="relative z-10 max-w-lg mx-auto my-4 text-center">
            <p className="font-cormorant italic text-xl sm:text-2xl text-cherry-dark leading-relaxed font-normal px-2 sm:px-6">
              “{message}”
            </p>
          </div>

          {/* Note Signoff */}
          <div className="mt-6 text-center font-script text-2xl sm:text-3xl text-rose-600">
            Always & Truly
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-serif uppercase tracking-wider text-cherry/60 hover:text-cherry underline decoration-champagne underline-offset-4 cursor-pointer"
            >
              Fold note back up ✉
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

