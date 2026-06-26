import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryViewProps {
  gallery: GalleryItem[];
}

const SKELETON_HEIGHTS = ['h-64', 'h-96', 'h-80', 'h-72', 'h-96', 'h-64'];

const GallerySkeleton = ({ heightClass }: { heightClass: string; key?: React.Key }) => (
  <div className={`break-inside-avoid relative overflow-hidden rounded-sm bg-[#242424]/10 border border-[#242424]/50 animate-pulse ${heightClass} flex flex-col justify-end p-8`}>
    <div className="absolute inset-0 flex items-center justify-center">
      <ImageIcon className="w-8 h-8 text-[#B0B0B0]/15" />
    </div>
    <div className="space-y-2 relative z-10">
      <div className="h-3 bg-[#242424]/80 w-16 rounded" />
      <div className="h-5 bg-[#242424]/80 w-36 rounded" />
    </div>
  </div>
);

export default function GalleryView({ gallery }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ambience' | 'dishes' | 'events' | 'lounge'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const filters = [
    { id: 'all', label: 'All Artifacts' },
    { id: 'ambience', label: 'Lounge Ambience' },
    { id: 'dishes', label: 'Signature Dishes' },
    { id: 'events', label: 'Social & Jazz' },
    { id: 'lounge', label: 'Cellar & Liquids' }
  ];

  const filteredGallery = useMemo(() => {
    return gallery.filter(item => activeFilter === 'all' || item.category === activeFilter);
  }, [gallery, activeFilter]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev! - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div id="gallery-main-view" className="w-full bg-[#1A1A1A] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Centerpiece */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-semibold mb-3">
            &bull; CINEMATIC PHOTO-ARCHIVES &bull;
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-[#F5F5F5] font-medium leading-none">
            Visual Storytelling
          </h1>
          <p className="text-xs md:text-sm text-[#B0B0B0] mt-4 font-light tracking-wide">
            Walk into our world before arriving on Keys Avenue. Zero clutter. Pure aesthetic realism. Click to expand single artworks.
          </p>
        </div>

        {/* Categories Tab Select Panel */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {filters.map((filt) => (
            <button
              key={filt.id}
              onClick={() => setActiveFilter(filt.id as any)}
              className={`px-5 py-3 rounded text-[11px] uppercase tracking-widest font-medium transition-all ${
                activeFilter === filt.id 
                  ? 'bg-[#D4AF37] text-[#1A1A1A] font-semibold' 
                  : 'bg-[#242424]/40 text-[#B0B0B0] hover:text-[#F5F5F5] border border-[#242424]'
              }`}
            >
              {filt.label}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {isLoading ? (
            SKELETON_HEIGHTS.map((heightClass, index) => (
              <GallerySkeleton key={`gallery-skeleton-${index}`} heightClass={heightClass} />
            ))
          ) : (
            <>
              {filteredGallery.map((item, idx) => (
                <div 
                  key={item.id}
                  id={`gallery-masonry-card-${item.id}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="break-inside-avoid relative overflow-hidden rounded-sm group cursor-pointer border border-[#242424]/50 hover:border-[#D4AF37]/30 transition-all duration-300"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-auto object-cover grayscale brightness-90 group-hover:scale-102 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 rounded-sm"
                    loading="lazy"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-semibold font-mono">{item.category}</span>
                    <h3 className="font-serif text-xl text-[#F5F5F5] mt-1.5">{item.title}</h3>
                    {item.description && (
                      <p className="text-[10px] text-[#B0B0B0] mt-1 font-light leading-normal line-clamp-2">{item.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-1.5 mt-4 text-[#D4AF37] text-[10px] uppercase tracking-wider font-semibold">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Expand Visualizer</span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredGallery.length === 0 && (
                <div className="col-span-full py-16 text-center flex flex-col items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-[#D4AF37]/50 mb-4" />
                  <p className="font-serif text-lg text-[#F5F5F5]">No Gallery Assets Loaded</p>
                  <span className="text-xs text-[#B0B0B0]">Check back later or configure additions in Admin Desk.</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* 5. LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
            <motion.div
              id="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-55 bg-black/95 flex flex-col items-center justify-center p-4 md:p-12"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button top-right */}
              <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 text-[#B0B0B0] hover:text-white rounded-full bg-neutral-900 border border-neutral-800 transition-all pointer z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Navigation Trigger */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 md:left-8 p-3 text-[#B0B0B0] hover:text-white rounded-full bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 transition-all pointer z-50"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central Landscape Frame */}
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-5xl max-h-[75vh] min-h-[250px] w-full flex items-center justify-center overflow-hidden mb-6"
                onClick={(e) => e.stopPropagation()} // Stop propagation to preserve open card
              >
                <img 
                  src={filteredGallery[lightboxIndex].url} 
                  alt={filteredGallery[lightboxIndex].title} 
                  className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl border border-neutral-800"
                />
              </motion.div>

              {/* Caption details desk bottom */}
              <div 
                className="max-w-xl text-center space-y-2 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-mono block">
                  Archive Item {lightboxIndex + 1} of {filteredGallery.length} • {filteredGallery[lightboxIndex].category}
                </span>
                <h2 className="font-serif text-2xl text-[#F5F5F5]">{filteredGallery[lightboxIndex].title}</h2>
                {filteredGallery[lightboxIndex].description && (
                  <p className="text-xs text-[#B0B0B0] font-light leading-relaxed">
                    {filteredGallery[lightboxIndex].description}
                  </p>
                )}
              </div>

              {/* Next Navigation Trigger */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 md:right-8 p-3 text-[#B0B0B0] hover:text-white rounded-full bg-neutral-900/55 hover:bg-neutral-900 border border-neutral-800 transition-all pointer z-50"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
