import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../context/CmsContext';
import { PageType } from './Navbar';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  PhoneCall, 
  Sparkles
} from 'lucide-react';

interface HeroCarouselProps {
  onNavigate: (page: PageType) => void;
  onEnquireProduct: (productName: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate, onEnquireProduct }) => {
  const { heroSlides } = useCms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const slideDuration = 3200; // Snappy 3.2s auto-slide

  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : [];

  // Robust infinite slide looping with setInterval
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, slideDuration);

    return () => clearInterval(timer);
  }, [slides.length, isPaused, slideDuration, currentIndex]);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex] || slides[0];

  const handleNext = () => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
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

  return (
    /* Width Fit to Page Grid (max-w-7xl matching Navbar), Height reduced slightly to ~320-370px */
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 sm:my-3">
      <div
        className="relative min-h-[310px] sm:min-h-[340px] lg:min-h-[370px] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-2xl flex items-center select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Dynamic Multi-Layer Animated Slides with Smooth Looping Crossfade */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                  : 'opacity-0 scale-98 pointer-events-none z-0'
              }`}
            >
              {/* Slide Image with Subtle Gradient Scrim & Ken-Burns Effect */}
              <img
                src={slide.image}
                alt={slide.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-[4000ms] ease-out ${
                  isActive ? 'scale-106' : 'scale-100'
                }`}
              />

              {/* Scrim Overlay allowing clear picture visibility while keeping text crisp */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/50 to-slate-950/15" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/25" />
              <div className="absolute inset-0 bg-cyan-950/10 mix-blend-color pointer-events-none" />
            </div>
          );
        })}

        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-20" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl pointer-events-none z-20" />

        {/* Spacious, Clean Hero Content */}
        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 w-full z-20 py-8 sm:py-9 lg:py-10 text-left">
          <div 
            key={currentSlide.id} 
            className="space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            {/* Slide Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] sm:text-xs text-slate-200 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="font-semibold text-white">{currentSlide.badge}</span>
            </div>

            {/* Slide Title */}
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.15] font-display max-w-3xl drop-shadow-md">
              {currentSlide.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 block mt-0.5 sm:mt-1">
                {currentSlide.highlightText}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm line-clamp-2 sm:line-clamp-none">
              {currentSlide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate(currentSlide.primaryBtnAction)}
                className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>{currentSlide.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>{currentSlide.secondaryBtnText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-lg hover:scale-105 focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all shadow-lg hover:scale-105 focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom Bar: Indicators & Looping Counter (Play/Pause Button Removed per request) */}
        <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 z-30 flex items-center justify-between">
          {/* Quick Speed/Status Indicator */}
          <div className="text-[11px] font-mono text-cyan-400/80 bg-slate-950/70 border border-slate-800/80 px-2.5 py-0.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Sanjog Infra</span>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? 'w-6 sm:w-8 h-2 bg-gradient-to-r from-cyan-400 to-lime-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <span className="text-[11px] font-mono text-slate-300 bg-slate-950/70 border border-slate-800 px-2.5 py-0.5 rounded-lg backdrop-blur-sm">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Dynamic Progress Indicator Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900/80 z-30 overflow-hidden">
          <div
            key={currentIndex}
            className={`h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 ${
              isPaused ? 'w-full' : 'animate-[progress_3200ms_linear]'
            }`}
            style={{
              animation: isPaused ? 'none' : `growWidth ${slideDuration}ms linear`
            }}
          />
        </div>

      </div>

      <style>{`
        @keyframes growWidth {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};
