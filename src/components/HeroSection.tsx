import React from 'react';
import { GiftEnvelope } from './GiftEnvelope';
import { HandDrawnRose, FloralDivider } from './FloralBorders';
import { GiftCardConfig } from '../types';

interface HeroSectionProps {
  config: GiftCardConfig;
  isOpen: boolean;
  onOpen: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, isOpen, onOpen }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      {/* Delicate Ambient Rose Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[550px] sm:h-[550px] rounded-full bg-gradient-to-tr from-rose-200/40 via-blush-200/30 to-champagne/20 blur-3xl -z-10 pointer-events-none animate-pulse-glow" />

      {/* Decorative Top Rose Emblem */}
      <div className="mb-4">
        <HandDrawnRose size={54} className="animate-float-slow" />
      </div>

      {/* Top Pre-title Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-champagne/40 text-xs sm:text-sm font-serif tracking-widest text-cherry-light uppercase mb-4 shadow-sm">
        <span>A Rose Just For You</span>
        <span className="text-rose-400">✦</span>
        <span>Dedicated to {config.recipientName}</span>
      </div>

      {/* Main Romantic Heading */}
      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-cherry-deep font-bold tracking-tight max-w-2xl leading-[1.15] drop-shadow-sm">
        {config.cardOpeningHeading}
      </h1>

      {/* Heartfelt Subtitle */}
      <p className="mt-4 font-cormorant italic text-lg sm:text-2xl text-cherry/85 max-w-xl mx-auto leading-relaxed font-normal">
        “{config.cardOpeningSubtitle}”
      </p>

      {/* Ornamental Floral Divider */}
      <FloralDivider className="my-5" />

      {/* The Sealed Luxury Envelope */}
      <div className="w-full mt-2">
        <GiftEnvelope isOpen={isOpen} onOpen={onOpen} />
      </div>
    </section>
  );
};

