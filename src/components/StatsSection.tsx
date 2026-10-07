import React from 'react';
import { useCms } from '../context/CmsContext';
import { Award, TrendingUp, CheckCircle, ShieldCheck, Activity } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const { stats } = useCms();

  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-12 bg-slate-950/90 border-t border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-lime-400 font-mono mb-2">
            <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>Manufacturing Benchmarks & Milestones</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Sanjog Production & Site Delivery Numbers
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Certified metrics achieved across Indian national expressways, flyovers, and mining zones.
          </p>
        </div>

        {/* Dynamic CMS-Controlled Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-left">
          {stats.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all hover:bg-slate-900/90 group flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 mb-1 group-hover:scale-105 transition-transform duration-300 inline-block">
                  {item.number}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white font-display mb-1.5">
                  {item.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-cyan-400">
                <span>Verified Metric</span>
                <CheckCircle className="w-3 h-3 text-cyan-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
