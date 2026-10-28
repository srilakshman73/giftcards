import React, { useRef } from 'react';
import { Camera, Calendar, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import { GalleryMemory } from '../types';
import { HandDrawnRose } from './FloralBorders';

interface MemoryGalleryProps {
  memories: GalleryMemory[];
  onUpdateMemoryImage?: (id: string, dataUrl: string) => void;
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({
  memories,
  onUpdateMemoryImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activeMemoryIdRef = useRef<string | null>(null);

  const handleUploadClick = (memoryId: string) => {
    activeMemoryIdRef.current = memoryId;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeMemoryIdRef.current && onUpdateMemoryImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateMemoryImage(activeMemoryIdRef.current!, result);
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input
    if (e.target) e.target.value = '';
  };

  const renderIllustration = (type?: string) => {
    switch (type) {
      case 'stargaze':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#2B1020] via-[#4A1730] to-[#7A2446] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#FAF0D9_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            <Sparkles className="w-8 h-8 text-champagne animate-pulse relative z-10" />
            <span className="font-serif italic text-xs text-rose-100 tracking-wider mt-2 relative z-10">
              Midnight Under Starlight
            </span>
          </div>
        );
      case 'coffee':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#F7EBE1] via-[#EED8C6] to-[#DCBAA3] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <span className="text-3xl filter drop-shadow">☕</span>
            <span className="font-cormorant italic text-xs text-cherry-deep tracking-wider mt-2 font-semibold">
              Quiet Warmth & Coffee
            </span>
          </div>
        );
      case 'heart':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#FFF0F3] via-[#FAD0D9] to-[#EFA0B0] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-400 animate-pulse" />
            <span className="font-serif italic text-xs text-cherry-deep tracking-wider mt-2">
              Unspoken Chemistry
            </span>
          </div>
        );
      case 'rose':
      default:
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#FFF5F7] via-[#FCE4EC] to-[#F8BBD0] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
            <HandDrawnRose size={56} />
            <span className="font-serif italic text-xs text-cherry tracking-wider mt-1 font-semibold">
              Botanical Grace
            </span>
          </div>
        );
    }
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-12">
      {/* Hidden file input for quick photo uploading */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-hidden="true"
      />

      {/* Gallery Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-champagne/40 text-xs font-serif text-cherry uppercase tracking-widest mb-3">
          <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
          <span>Keepsakes & Memories</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl text-cherry-deep font-bold tracking-tight">
          Snapshots of Beautiful Moments
        </h2>
        <p className="mt-2 font-cormorant italic text-base sm:text-xl text-cherry/75 max-w-lg mx-auto">
          Every little chapter is a gentle memory worth preserving.
        </p>
      </div>

      {/* Scrapbook Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {memories.map((mem, index) => {
          // Slight alternating rotational tilt for authentic polaroid look
          const tiltDegrees = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

          return (
            <div
              key={mem.id}
              className={`group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 p-4 pb-6 flex flex-col border border-champagne/40 hover:-translate-y-1.5 hover:rotate-0 ${tiltDegrees}`}
            >
              {/* Scrapbook Washi Tape Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-200/70 backdrop-blur-sm border-x border-dashed border-rose-300/80 shadow-sm transform -rotate-1 pointer-events-none" />

              {/* Photo Area / Illustrated Placeholder */}
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-rose-100 bg-rose-50/50 shadow-inner">
                {mem.imageUrl ? (
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  renderIllustration(mem.illustrationType)
                )}

                {/* Hover overlay with upload button */}
                <div className="absolute inset-0 bg-cherry-deep/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
                  <button
                    onClick={() => handleUploadClick(mem.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-cherry font-serif text-xs font-semibold shadow hover:bg-white hover:scale-105 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5 text-rose-500" />
                    <span>{mem.imageUrl ? 'Change Photo' : 'Add Couple Photo'}</span>
                  </button>
                </div>
              </div>

              {/* Polaroid Caption & Details */}
              <div className="mt-4 flex flex-col flex-grow text-center">
                <span className="font-serif font-bold text-cherry-deep text-base sm:text-lg tracking-wide group-hover:text-rose-600 transition-colors">
                  {mem.title}
                </span>

                <div className="flex items-center justify-center gap-1 text-[11px] sm:text-xs text-cherry/60 font-sans mt-0.5 mb-2">
                  <Calendar className="w-3 h-3 text-rose-400" />
                  <span>{mem.date}</span>
                </div>

                <p className="font-cormorant italic text-sm text-cherry/85 leading-relaxed mt-auto px-1">
                  “{mem.caption}”
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

