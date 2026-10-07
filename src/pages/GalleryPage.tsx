import React, { useState } from 'react';
import { GalleryItem } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { Camera, MapPin, Maximize2, X, ArrowRight } from 'lucide-react';

interface GalleryPageProps {
  onEnquireProduct: (productName: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onEnquireProduct }) => {
  const { gallery } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: `All Photos (${gallery.length})` },
    { id: 'barriers', label: 'Crash Barriers' },
    { id: 'lighting', label: 'Lighting & Road Safety' },
    { id: 'mining', label: 'Mining & Drilling' },
    { id: 'concrete', label: 'Concrete Machinery' },
    { id: 'fencing', label: 'Pipes & Fencing' },
    { id: 'factory', label: 'Factory & Yard' }
  ];

  const filteredGallery = selectedCategory === 'all'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-lime-400 font-mono mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Real Project & Factory Photos</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
          Product & Project Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Take a look at our supplied W-Beam crash barriers, high mast lighting towers, mining drill rods, road marking works, and factory fabrication yard.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-4 border-b border-slate-800">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-lime-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group cursor-pointer bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-mono text-cyan-300 border border-slate-800">
                  {item.categoryLabel}
                </div>

                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-lime-400 font-mono mb-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>

                <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <span className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1">
                <span>Click to view larger photo</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400">{activePhoto.categoryLabel}</span>
                <span className="text-slate-500">&middot;</span>
                <span className="text-xs text-slate-300">{activePhoto.location}</span>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>

            <div className="p-6 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-display">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {activePhoto.description}
                </p>
              </div>

              <button
                onClick={() => {
                  const productTarget = activePhoto.title;
                  setActivePhoto(null);
                  onEnquireProduct(productTarget);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl transition-all shadow-md whitespace-nowrap self-start sm:self-auto"
              >
                Enquire for this item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
