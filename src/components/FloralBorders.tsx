import React from 'react';

// Delicate Victorian/Art Nouveau corner flourish with blooming rose & foliage
export const FloralCorner: React.FC<{
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ className = '', position = 'top-left' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
      className={`pointer-events-none select-none transition-transform duration-700 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C07B" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9C7A1D" />
        </linearGradient>
        <radialGradient id={`roseGrad-${position}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EFA8B0" />
          <stop offset="60%" stopColor="#C97A8B" />
          <stop offset="100%" stopColor="#7B1A2C" />
        </radialGradient>
        <linearGradient id={`leafGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A3B19B" />
          <stop offset="100%" stopColor="#5E7057" />
        </linearGradient>
      </defs>

      {/* Gold filigree swirls */}
      <path
        d="M 12 140 C 12 80, 25 35, 75 22 C 110 12, 145 12, 155 12"
        stroke={`url(#goldGrad-${position})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M 12 155 C 12 110, 20 60, 60 30 C 95 12, 130 12, 140 12"
        stroke={`url(#goldGrad-${position})`}
        strokeWidth="0.8"
        strokeDasharray="2 3"
        fill="none"
        opacity="0.6"
      />
      
      {/* Decorative leaf scrolls */}
      <path
        d="M 30 75 Q 45 60 55 72 Q 40 85 30 75 Z"
        fill={`url(#leafGrad-${position})`}
        opacity="0.65"
      />
      <path
        d="M 75 35 Q 92 45 82 58 Q 68 45 75 35 Z"
        fill={`url(#leafGrad-${position})`}
        opacity="0.65"
      />

      {/* Tender rosebud at corner junction */}
      <g transform="translate(42, 42)">
        {/* Outer petals */}
        <path
          d="M 0 15 C -15 15 -20 -5 -8 -15 C -2 -22 12 -20 18 -10 C 25 2 15 15 0 15 Z"
          fill={`url(#roseGrad-${position})`}
          opacity="0.9"
        />
        {/* Inner bud whorls */}
        <path
          d="M -3 6 C -10 6 -12 -5 -5 -11 C 0 -15 9 -12 11 -6 C 14 2 6 6 -3 6 Z"
          fill="#FAF2F4"
          opacity="0.25"
        />
        <path
          d="M 2 2 C -4 4 -6 -3 -2 -7 C 2 -10 8 -8 9 -3 C 10 2 5 2 2 2 Z"
          fill="#530F1C"
          opacity="0.8"
        />
        {/* Golden pistil dot */}
        <circle cx="2" cy="-2" r="2.2" fill="#F4E0A5" />
      </g>
    </svg>
  );
};

// Hand-drawn Luxury Botanical Rose Centerpiece / Header
export const HandDrawnRose: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 64
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block drop-shadow-md transition-transform duration-500 hover:scale-105 ${className}`}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="bloomHeart" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#FFCCD5" />
        <stop offset="45%" stopColor="#DF5F78" />
        <stop offset="85%" stopColor="#87172E" />
        <stop offset="100%" stopColor="#4A0A17" />
      </radialGradient>
      <linearGradient id="goldShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F9F1D8" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#99781B" />
      </linearGradient>
      <linearGradient id="roseLeaves" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8FA083" />
        <stop offset="100%" stopColor="#4E6146" />
      </linearGradient>
    </defs>

    {/* Background Leaves */}
    <path
      d="M 30 75 C 10 82 5 95 12 108 C 28 106 42 94 40 82 Z"
      fill="url(#roseLeaves)"
      opacity="0.85"
    />
    <path
      d="M 90 75 C 110 82 115 95 108 108 C 92 106 78 94 80 82 Z"
      fill="url(#roseLeaves)"
      opacity="0.85"
    />
    <path d="M 22 93 Q 32 86 38 83" stroke="#C4D4BA" strokeWidth="1" strokeLinecap="round" />
    <path d="M 98 93 Q 88 86 82 83" stroke="#C4D4BA" strokeWidth="1" strokeLinecap="round" />

    {/* Outer Petals */}
    <path
      d="M 60 20 C 35 15 15 35 22 62 C 28 85 50 102 60 104 C 70 102 92 85 98 62 C 105 35 85 15 60 20 Z"
      fill="url(#bloomHeart)"
    />
    {/* Middle Petal Layers */}
    <path
      d="M 40 38 C 28 50 32 75 48 88 C 65 92 82 78 82 58 C 82 42 70 32 55 35 C 48 36 43 35 40 38 Z"
      fill="#A8233C"
      opacity="0.85"
    />
    <path
      d="M 75 42 C 85 52 82 72 70 82 C 55 86 42 74 44 58 C 45 46 56 38 68 40 Z"
      fill="#C73E5B"
      opacity="0.9"
    />
    {/* Inner Blooming Spirals */}
    <path
      d="M 52 48 C 46 54 48 68 56 72 C 66 74 72 65 70 55 C 68 47 58 44 52 48 Z"
      fill="#E56A84"
    />
    <path
      d="M 58 54 C 54 58 56 64 60 65 C 65 66 67 61 65 57 C 63 53 59 52 58 54 Z"
      fill="#FCD2DC"
    />

    {/* Gold Sparkle Highlights */}
    <circle cx="60" cy="30" r="1.5" fill="url(#goldShine)" />
    <circle cx="85" cy="50" r="1.2" fill="url(#goldShine)" />
    <circle cx="35" cy="52" r="1.2" fill="url(#goldShine)" />
  </svg>
);

// Luxury Wax Seal Button / Stamp with Rose Monogram
export const LuxuryWaxSeal: React.FC<{
  label?: string;
  onClick?: () => void;
  className?: string;
  pulsing?: boolean;
}> = ({ label = 'With Love', onClick, className = '', pulsing = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`group relative inline-flex flex-col items-center justify-center cursor-pointer transition-all duration-300 focus:outline-none ${className}`}
  >
    {/* Outer Wax Irregular Ring */}
    <div
      className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105 active:scale-95 shadow-[0_12px_28px_rgba(74,10,23,0.38),inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-4px_6px_rgba(40,4,11,0.6)] ${
        pulsing ? 'animate-pulse-glow' : ''
      }`}
      style={{
        background: 'radial-gradient(circle at 35% 35%, #AB2741 0%, #7A1428 55%, #420814 100%)',
        border: '2px solid rgba(212, 175, 55, 0.45)',
      }}
    >
      {/* Decorative Gold Inner Filigree Rim */}
      <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-dashed border-[#E5C07B]/50 pointer-events-none" />

      {/* Embossed Rose Monogram in Gold */}
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-2xl sm:text-3xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform group-hover:rotate-6 transition-transform">
          🌹
        </span>
        <span className="font-serif italic text-[9px] sm:text-[10px] text-[#F9F0D9] tracking-wider uppercase drop-shadow font-semibold mt-0.5">
          {label}
        </span>
      </div>
    </div>
  </button>
);

// Elegant Ornamental Floral Ribbon Divider
export const FloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-champagne/70 to-champagne" />
    <span className="text-rose-500 font-serif text-lg tracking-widest select-none flex items-center gap-1.5 text-champagne-dark">
      ❦ <span className="text-xs text-rose-400">♥</span> ❦
    </span>
    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-champagne/70 to-champagne" />
  </div>
);

