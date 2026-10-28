import React, { useState, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { RomanticGiftCard } from './components/RomanticGiftCard';
import { LoveNote } from './components/LoveNote';
import { FinalSurprise } from './components/FinalSurprise';
import { MusicToggle } from './components/MusicToggle';
import { PetalCanvas } from './components/PetalCanvas';
import { PersonalizationModal } from './components/PersonalizationModal';
import { loadConfig, saveConfig, resetConfig, generateShareUrl } from './config';
import { GiftCardConfig } from './types';
import { HandDrawnRose } from './components/FloralBorders';

export const App: React.FC = () => {
  const [config, setConfig] = useState<GiftCardConfig>(loadConfig());
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isPersonalizerOpen, setIsPersonalizerOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const cardSectionRef = useRef<HTMLDivElement | null>(null);

  // Handle Envelope Open sequence
  const handleOpenEnvelope = () => {
    setIsEnvelopeOpened(true);
    setTimeout(() => {
      cardSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  };

  // Replay opening from the top
  const handleReplay = () => {
    setIsEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save personalized configuration
  const handleSaveConfig = (newConfig: GiftCardConfig) => {
    setConfig(newConfig);
    saveConfig(newConfig);
  };

  const handleReset = () => {
    resetConfig();
    setConfig(loadConfig());
  };

  const handleShareLink = () => {
    const url = generateShareUrl(config);
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#FDF6F7] via-[#FFF9FA] to-[#FAF2F4] text-cherry-deep font-sans selection:bg-rose-200 selection:text-cherry-deep overflow-x-hidden">
      {/* Background Soft Paper & Botanical Glow Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 -z-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(225, 29, 72, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)',
        }}
      />

      {/* Persistent Floating Rose Petals Canvas */}
      <PetalCanvas active={true} />

      {/* Floating Ambient Music Controller (YouTube: 2NrpwkyoTrI) */}
      <MusicToggle />

      {/* Main Experience Layout */}
      <main className="relative z-10 flex flex-col items-center w-full">
        {/* Stage 1: The Surprise Opening Screen */}
        <HeroSection
          config={config}
          isOpen={isEnvelopeOpened}
          onOpen={handleOpenEnvelope}
        />

        {/* Stage 2: The Main Gift Card (Revealed after opening or scrolled into view) */}
        <div
          ref={cardSectionRef}
          className={`w-full transition-all duration-1000 ${
            isEnvelopeOpened ? 'opacity-100 translate-y-0' : 'opacity-90'
          }`}
        >
          {/* Subtle connecting motif */}
          <div className="flex justify-center my-4 opacity-75">
            <HandDrawnRose size={36} />
          </div>

          {/* Luxury Romantic Gift Card - Beautiful Centered Layout */}
          <RomanticGiftCard config={config} />

          {/* Section: Hidden Love Note ("One More Little Note, Bujji Thango 💌") */}
          <LoveNote
            title={config.hiddenNoteTitle}
            message={config.hiddenNoteMessage}
          />

          {/* Section: Final Surprise Envelope & Actions */}
          <FinalSurprise
            message={config.finalSurpriseMessage}
            onReplay={handleReplay}
            onOpenPersonalizer={() => setIsPersonalizerOpen(true)}
            onShare={handleShareLink}
            shareCopied={shareCopied}
          />
        </div>
      </main>

      {/* Personalization Modal */}
      <PersonalizationModal
        isOpen={isPersonalizerOpen}
        onClose={() => setIsPersonalizerOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;
