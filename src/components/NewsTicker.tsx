import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { Bell, Flame, ChevronRight } from 'lucide-react';

interface NewsTickerProps {
  onNavigateToContact?: () => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onNavigateToContact }) => {
  const { newsItems } = useCms();
  const [isPaused, setIsPaused] = useState(false);

  if (!newsItems || newsItems.length === 0) return null;

  // Duplicate items for seamless continuous marquee loop
  const displayItems = [...newsItems, ...newsItems];

  return (
    <div className="bg-slate-950 border-y border-slate-800/80 py-2.5 px-3 sm:px-6 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Ticker Fixed Left Badge */}
        <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-950 to-slate-900 border border-cyan-500/40 rounded-lg shadow-sm">
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold font-mono tracking-wider text-cyan-300 uppercase">
            LATEST UPDATES
          </span>
        </div>

        {/* Marquee Scrolling Viewport */}
        <div
          className="relative flex-1 overflow-hidden whitespace-nowrap cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={onNavigateToContact}
          title="Click to enquire about current dispatches"
        >
          <div
            className={`inline-flex items-center gap-8 ${
              isPaused ? '' : 'animate-marquee'
            }`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="inline-flex items-center gap-2.5 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-lime-400 font-semibold">
                  {item.tag}
                </span>
                <span className="font-medium text-slate-200">
                  {item.title}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  ({item.date})
                </span>
                <span className="text-cyan-500 font-bold ml-3" aria-hidden="true">
                  &bull;
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Enquiry Action on Right */}
        <div className="hidden lg:flex shrink-0 items-center">
          <button
            onClick={onNavigateToContact}
            className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 font-mono"
          >
            <span>Supply Notice</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
