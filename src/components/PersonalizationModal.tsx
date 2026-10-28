import React, { useState } from 'react';
import { X, Sparkles, RotateCcw, Save, Share2, Check } from 'lucide-react';
import { GiftCardConfig } from '../types';
import { DEFAULT_CONFIG, generateShareUrl } from '../config';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GiftCardConfig;
  onSave: (newConfig: GiftCardConfig) => void;
  onReset: () => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<GiftCardConfig>(config);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleChange = (
    field: keyof GiftCardConfig,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...formData.mainMessageParagraphs];
    updated[index] = val;
    setFormData((prev) => ({
      ...prev,
      mainMessageParagraphs: updated,
    }));
  };

  const handleSaveAndApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleShare = () => {
    const url = generateShareUrl(formData);
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all details back to the original romantic love letter?')) {
      setFormData(DEFAULT_CONFIG);
      onReset();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cherry-deep/60 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="personalizer-title"
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#FFFDF9] rounded-3xl border-2 border-champagne/60 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-rose-200/80 bg-gradient-to-r from-blush-50 via-white to-blush-50 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-serif text-rose-500 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalize for Your Special Someone</span>
            </div>
            <h2 id="personalizer-title" className="font-serif text-2xl font-bold text-cherry-deep">
              Customize Love Letter & Gift Card
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close customizer"
            className="w-9 h-9 rounded-full bg-rose-50 hover:bg-rose-100 text-cherry flex items-center justify-center transition-colors border border-rose-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSaveAndApply} className="overflow-y-auto p-6 space-y-5 text-left text-sm">
          {/* Recipient & Sender Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
                Recipient’s Name or Nickname
              </label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                placeholder="e.g. My Favorite Person, Sarah, Dearest..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
                required
              />
            </div>
            <div>
              <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
                Sender’s Name or Nickname
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => handleChange('senderName', e.target.value)}
                placeholder="e.g. Alex, Someone who thinks you're wonderful..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
                required
              />
            </div>
          </div>

          {/* Opening Heading & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
                Opening Screen Heading
              </label>
              <input
                type="text"
                value={formData.cardOpeningHeading}
                onChange={(e) => handleChange('cardOpeningHeading', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
              />
            </div>
            <div>
              <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
                Opening Subtitle
              </label>
              <textarea
                rows={2}
                value={formData.cardOpeningSubtitle}
                onChange={(e) => handleChange('cardOpeningSubtitle', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-cormorant text-base text-cherry-deep"
              />
            </div>
          </div>

          {/* Main Greeting & Special Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
                Card Title / Main Greeting
              </label>
              <input
                type="text"
                value={formData.mainGreeting}
                onChange={(e) => handleChange('mainGreeting', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
              />
            </div>
            <div>
              <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
                Special Date or Anniversary (Optional)
              </label>
              <input
                type="text"
                value={formData.specialDate}
                onChange={(e) => handleChange('specialDate', e.target.value)}
                placeholder="e.g. October 24, Every single day with you..."
                className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
              />
            </div>
          </div>

          {/* Personal Inside Memory or Joke */}
          <div>
            <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
              A Personal Memory or Inside Joke (Optional)
            </label>
            <input
              type="text"
              value={formData.personalMemory}
              onChange={(e) => handleChange('personalMemory', e.target.value)}
              placeholder="e.g. That midnight ice cream run in the rain..."
              className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
            />
          </div>

          {/* Main Message Paragraphs */}
          <div>
            <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
              Main Love Letter Paragraphs
            </label>
            <div className="space-y-2">
              {formData.mainMessageParagraphs.map((para, i) => (
                <textarea
                  key={i}
                  rows={2}
                  value={para}
                  onChange={(e) => handleParagraphChange(i, e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-cormorant text-base text-cherry-deep"
                />
              ))}
            </div>
          </div>

          {/* Highlight Quote */}
          <div>
            <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
              Highlighted Romantic Rose Quote
            </label>
            <input
              type="text"
              value={formData.highlightQuote}
              onChange={(e) => handleChange('highlightQuote', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-serif text-cherry-deep"
            />
          </div>

          {/* Hidden Note Message */}
          <div>
            <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
              Hidden Love Note (“There’s one more thing…”)
            </label>
            <textarea
              rows={2}
              value={formData.hiddenNoteMessage}
              onChange={(e) => handleChange('hiddenNoteMessage', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-cormorant text-base text-cherry-deep"
            />
          </div>

          {/* Final Surprise Message */}
          <div>
            <label className="block font-serif font-semibold text-cherry-deep mb-1 text-xs uppercase tracking-wider">
              Final Surprise Wish Message
            </label>
            <textarea
              rows={2}
              value={formData.finalSurpriseMessage}
              onChange={(e) => handleChange('finalSurpriseMessage', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-rose-200 bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 font-cormorant text-base text-cherry-deep"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-rose-200/80 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-cherry/70 hover:text-cherry hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-300 bg-white text-cherry font-serif text-xs font-semibold hover:bg-rose-50 transition-all shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Copy Shareable Link</span>
                  </>
                )}
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cherry text-white font-serif font-semibold text-sm hover:bg-cherry-light transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <Save className="w-4 h-4 text-champagne" />
                <span>Save & Apply</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
