import React, { useState, useEffect, useRef } from 'react';
import { useCms, CustomerReview } from '../context/CmsContext';
import { Star, ChevronLeft, ChevronRight, Quote, Building2, CheckCircle2 } from 'lucide-react';

interface CustomerFeedbackCarouselProps {
  onOpenInquiry?: () => void;
}

export const CustomerFeedbackCarousel: React.FC<CustomerFeedbackCarouselProps> = ({ onOpenInquiry }) => {
  const { reviews } = useCms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const slideDuration = 4500; // 4.5s auto-slide for reading reviews comfortably

  const reviewList = reviews && reviews.length > 0 ? reviews : [];

  useEffect(() => {
    if (reviewList.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewList.length);
    }, slideDuration);

    return () => clearInterval(timer);
  }, [reviewList.length, isPaused, currentIndex]);

  if (reviewList.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewList.length);
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
    <div 
      className="relative w-full max-w-5xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Active Review Slider Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-7 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-6 right-8 text-slate-800 pointer-events-none select-none">
          <Quote className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-500/10" />
        </div>

        {reviewList.map((item, idx) => {
          const isActive = idx === currentIndex;
          if (!isActive) return null;

          return (
            <div 
              key={item.id} 
              className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 text-left"
            >
              {/* Star Rating & Project Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 bg-slate-950/80 px-3.5 py-1.5 rounded-full border border-slate-800">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < (item.rating || 5) 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'fill-slate-700 text-slate-700'
                      }`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-amber-400 font-mono ml-1.5">
                    {item.rating || 5}.0 / 5.0
                  </span>
                </div>

                {item.projectScope && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-xs font-mono text-cyan-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="truncate max-w-xs">{item.projectScope}</span>
                  </div>
                )}
              </div>

              {/* Review Quotation Text */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed italic font-normal">
                "{item.reviewText}"
              </p>

              {/* Author & Company Details */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-white font-display">
                    {item.clientName}
                  </h4>
                  <div className="text-xs text-slate-400 flex flex-wrap items-center gap-1.5">
                    <span className="text-cyan-400 font-medium">{item.designation}</span>
                    <span>&middot;</span>
                    <span className="text-slate-300 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.company}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                  <span>Verified Contractor Feedback</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Carousel Controls (Arrows) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all shadow-lg hover:scale-105"
          aria-label="Previous Review"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-all shadow-lg hover:scale-105"
          aria-label="Next Review"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {reviewList.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-7 h-2 bg-gradient-to-r from-cyan-400 to-lime-400'
                : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
