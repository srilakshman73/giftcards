import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Calendar, BookOpen, Quote } from 'lucide-react';
import { GiftCardConfig } from '../types';
import { FloralCorner, HandDrawnRose, FloralDivider } from './FloralBorders';

interface RomanticGiftCardProps {
  config: GiftCardConfig;
}

export const RomanticGiftCard: React.FC<RomanticGiftCardProps> = ({ config }) => {
  const [loveCount, setLoveCount] = useState(1);
  const [loveMessage, setLoveMessage] = useState<string | null>(null);
  const [isHeartBumping, setIsHeartBumping] = useState(false);

  const sweetMessages = [
    'Your smile just lit up this little universe ✨',
    'A warm hug wrapped in gentle words 💕',
    'A little extra happiness sent your way 🌹',
    'You are truly, genuinely cherished 🌸',
    'May your day be as gentle as your heart 🕊️',
    'Sending endless warmth across every mile 💫',
  ];

  const handleSendLove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    setLoveCount((prev) => prev + 1);
    setIsHeartBumping(true);
    setTimeout(() => setIsHeartBumping(false), 500);

    // Pick random sweet confirmation message
    const msg = sweetMessages[loveCount % sweetMessages.length];
    setLoveMessage(msg);

    // Rose & heart confetti burst from button
    confetti({
      particleCount: 22,
      spread: 60,
      origin: { x, y },
      colors: ['#E11D48', '#FDA4AF', '#F43F5E', '#D4AF37'],
      shapes: ['circle'],
      scalar: 1,
    });
  };

  return (
    <div id="gift-card-section" className="relative w-full max-w-3xl mx-auto px-4 py-8">
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-200/40 via-champagne/15 to-rose-300/30 blur-2xl rounded-3xl -z-10" />

      {/* Main Luxury Greeting Card Container */}
      <article className="relative bg-[#FFFDFB] rounded-3xl border-2 border-champagne/50 shadow-luxury overflow-hidden transition-all duration-500 p-6 sm:p-12 md:p-14">
        
        {/* Subtle Watermark Rose Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
          <HandDrawnRose size={520} />
        </div>

        {/* Paper Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(#9E2A44 0.6px, transparent 0.6px), radial-gradient(#D4AF37 0.6px, transparent 0.6px)',
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 8px 8px',
          }}
        />

        {/* Inner Gold Inset Filigree Border */}
        <div className="absolute inset-3 sm:inset-5 rounded-2xl border border-champagne/45 pointer-events-none" />
        <div className="absolute inset-4 sm:inset-6 rounded-2xl border border-dashed border-rose-300/40 pointer-events-none" />

        {/* Four Botanical Corner Embellishments */}
        <FloralCorner position="top-left" className="absolute top-2 left-2 w-20 sm:w-28 h-20 sm:h-28" />
        <FloralCorner position="top-right" className="absolute top-2 right-2 w-20 sm:w-28 h-20 sm:h-28" />
        <FloralCorner position="bottom-left" className="absolute bottom-2 left-2 w-20 sm:w-28 h-20 sm:h-28" />
        <FloralCorner position="bottom-right" className="absolute bottom-2 right-2 w-20 sm:w-28 h-20 sm:h-28" />

        {/* Card Header */}
        <header className="relative z-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-champagne" />
            <span className="font-script text-2xl sm:text-3xl text-rose-500">Love Letter</span>
            <span className="h-[1px] w-8 bg-champagne" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-cherry-deep tracking-tight">
            {config.mainGreeting}
          </h2>

          {/* Optional Special Date / Tag */}
          {config.specialDate && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100/70 border border-rose-200/60 text-xs sm:text-sm text-cherry/80 font-cormorant italic">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>{config.specialDate}</span>
            </div>
          )}

          <FloralDivider className="my-4 sm:my-6" />
        </header>

        {/* Heartfelt Message Body */}
        <div className="relative z-10 font-cormorant text-lg sm:text-2xl text-[#3F111B] leading-relaxed sm:leading-loose space-y-5 sm:space-y-6 text-left max-w-2xl mx-auto px-1 sm:px-4">
          
          {config.mainMessageParagraphs.map((para, idx) => (
            <p key={idx} className="relative first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-cherry first-letter:mr-1.5 first-letter:float-left">
              {para}
            </p>
          ))}

          {/* Highlight Quote Banner */}
          <div className="relative my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blush-50 via-[#FDF3F5] to-blush-50 border-l-4 border-cherry shadow-sm">
            <Quote className="absolute top-3 left-3 w-6 h-6 text-rose-300/60 pointer-events-none" />
            <p className="font-serif font-semibold text-lg sm:text-2xl text-cherry-deep italic leading-relaxed text-center sm:text-left pl-2">
              “{config.highlightQuote}”
            </p>
          </div>

          {/* Personal Inside Memory or Joke (if present) */}
          {config.personalMemory && (
            <div className="p-4 rounded-xl bg-ivory-warm/60 border border-champagne/30 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
              <div className="text-sm sm:text-base font-cormorant italic text-cherry-dark">
                <span className="font-serif font-semibold not-italic block text-xs uppercase tracking-wider text-rose-600 mb-0.5">
                  A Little Keepsake Memory
                </span>
                {config.personalMemory}
              </div>
            </div>
          )}
        </div>

        {/* Card Sign-off */}
        <footer className="relative z-10 mt-8 pt-6 border-t border-rose-200/60 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto px-1 sm:px-4">
          <div className="text-center sm:text-left">
            <span className="font-cormorant italic text-lg sm:text-xl text-cherry/70 block">
              {config.signOffPre}
            </span>
            <span className="font-serif font-bold text-xl sm:text-2xl text-cherry-deep tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
              {config.signOffName}
            </span>
          </div>

          {/* Heart Button ("Send a Little Love ❤️") */}
          <div className="flex flex-col items-center sm:items-end">
            <button
              onClick={handleSendLove}
              aria-label="Send a Little Love"
              className={`group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-serif font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-rose-500 via-cherry to-rose-600 shadow-[0_8px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_10px_26px_rgba(225,29,72,0.45)] hover:scale-105 active:scale-95 transition-all duration-300 border border-champagne/50 cursor-pointer ${
                isHeartBumping ? 'scale-110' : ''
              }`}
            >
              <Heart
                className={`w-4 h-4 fill-white text-white transition-transform ${
                  isHeartBumping ? 'scale-125' : 'group-hover:scale-110'
                }`}
              />
              <span>Send a Little Love ❤️</span>
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white font-sans">
                {loveCount}
              </span>
            </button>

            {/* Sweet Confirmation Toast */}
            {loveMessage && (
              <p
                role="status"
                className="mt-2 text-xs text-cherry-light font-cormorant italic tracking-wide animate-fade-in flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-champagne-dark" />
                {loveMessage}
              </p>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
};

