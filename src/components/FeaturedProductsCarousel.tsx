import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { Product } from '../data/companyData';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedProductsCarouselProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToProducts: (product?: Product) => void;
}

export const FeaturedProductsCarousel: React.FC<FeaturedProductsCarouselProps> = ({
  onSelectProduct,
  onNavigateToProducts
}) => {
  const { products } = useCms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Filter featured products from CMS (or fallback to all products)
  const featured = products.filter(p => p.featured);
  const displayProducts = featured.length > 0 ? featured : products;
  const total = displayProducts.length;

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, total - itemsPerPage);

  // Auto sliding carousel with smooth transition
  useEffect(() => {
    if (total <= itemsPerPage || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [total, itemsPerPage, isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 40) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -40) {
      handlePrev();
    }
  };

  const handleCardClick = (product: Product) => {
    onSelectProduct(product);
    onNavigateToProducts(product);
  };

  const itemWidthPercent = 100 / itemsPerPage;

  return (
    <section className="py-12 bg-slate-950/70 border-b border-slate-900 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Carousel Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Manufacturing Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any product image below to view complete technical specifications, certifications, and drawings on the Products page.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors shadow-sm focus:outline-none"
              aria-label="Previous product image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors shadow-sm focus:outline-none"
              aria-label="Next product image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigateToProducts()}
              className="ml-2 text-xs font-semibold text-lime-400 hover:text-lime-300 flex items-center gap-1 font-mono whitespace-nowrap px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-lime-500/40 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Product Images Sliding Track Container */}
        <div
          className="relative overflow-hidden -mx-2.5 py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Smooth Sliding Flex Track */}
          <div
            className="flex transition-transform duration-600 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * itemWidthPercent}%)`
            }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 px-2.5"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <div
                  onClick={() => handleCardClick(product)}
                  className="group cursor-pointer bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400/80 transition-all duration-300 shadow-xl hover:shadow-cyan-950/40 transform hover:-translate-y-1.5 flex flex-col relative h-full"
                >
                  {/* Product Image Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center filter brightness-95 contrast-105 group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Subtle scrim for title contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />

                    {/* Category Tag on top left */}
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-cyan-300 border border-slate-800/80">
                      {product.categoryLabel}
                    </div>

                    {/* Availability pill on top right */}
                    <div className="absolute top-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono text-emerald-400 border border-slate-800/80">
                      {product.availability === 'In Production & Stock' ? 'Ready Stock' : 'Active Supply'}
                    </div>

                    {/* Product Name overlay at bottom of image */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-left">
                      <h3 className="text-sm sm:text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors truncate drop-shadow-md">
                        {product.name}
                      </h3>
                      <p className="text-[11px] font-mono text-lime-400 truncate mt-0.5">
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Clean bottom bar with view details CTA */}
                  <div className="p-3 bg-slate-950/80 border-t border-slate-800/70 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                      {product.standards[0] || 'MoRTH Certified'}
                    </span>
                    <span className="text-cyan-400 font-semibold group-hover:text-lime-400 transition-colors flex items-center gap-1 text-[11px]">
                      <span>Specs</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        {total > itemsPerPage && (
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-cyan-400'
                    : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Go to slide group ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
