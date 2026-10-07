import React, { useState } from 'react';
import { SanjogLogo } from './SanjogLogo';
import { InteractiveNetworkCanvas } from './InteractiveNetworkCanvas';
import { SANJOG_METRICS } from '../data/companyData';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  HardHat, 
  Hammer, 
  Sparkles,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDossier: () => void;
  onExploreProducts: () => void;
  onOpenInquiry: (productName?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDossier,
  onExploreProducts,
  onOpenInquiry
}) => {
  const [activeHighlight, setActiveHighlight] = useState<'barriers' | 'lighting' | 'mining' | 'concrete'>('barriers');

  const highlightData = {
    barriers: {
      title: 'Crash Barriers (W-Beam & Thrie Beam)',
      spec: 'MoRTH Sec 811 & AASHTO M180',
      zinc: '≥ 550 g/m² Hot-Dip Galvanized',
      leadTime: 'Immediate Stock Dispatch',
      image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg'
    },
    lighting: {
      title: 'High Mast Lighting Octagonal Towers',
      spec: 'Heights 12m to 35m Tapered',
      zinc: 'IS 875 Wind Speed Rated 180 km/h',
      leadTime: 'Motorized Winch Included',
      image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg'
    },
    mining: {
      title: 'Mining & TCT Drill Rods + Rock Drills',
      spec: 'Alloy Chrome-Moly Carburized Steel',
      zinc: 'Tungsten Carbide YG11C Tips',
      leadTime: 'High Penetration Rate',
      image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg'
    },
    concrete: {
      title: 'Concrete Mixers, Vibrators & Needles',
      spec: '10/7 CFT Batch & Immersion Needles',
      zinc: 'Heavy ISMC Channel Chassis',
      leadTime: 'Ready for Civil Works',
      image: '/src/assets/images/sanjog_concrete_machinery_1791292215407.jpg'
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-mesh-sanjog">
      {/* Background Interactive Canvas */}
      <InteractiveNetworkCanvas />

      {/* Ambient Lighting Accents */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-lime-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Inline verified certification tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="font-medium text-slate-200">SANJOG INFRASTRUCTURE WORKS</span>
              <span className="text-slate-500" aria-hidden="true">&middot;</span>
              <span className="text-cyan-400 font-mono">MoRTH & ISO 9001 Certified</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-display max-w-2xl">
              Highway Safety, Mining Tools &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400">
                Infrastructure Equipment.
              </span>
            </h1>

            {/* Paragraph Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mb-8 font-normal">
              Sanjog is a trusted manufacturing and supply partner for certified W-Beam & Thrie-Beam crash barriers, high mast octagonal lighting towers, mining drill rods, concrete machinery, and road safety infrastructure nationwide.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onExploreProducts}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all transform hover:-translate-y-0.5"
              >
                <span>View Full Product Lineup (16 Items)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenDossier}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 hover:border-slate-500 rounded-xl transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Company Profile & Catalog</span>
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Metric Row */}
            <div className="w-full pt-6 border-t border-slate-800/80">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SANJOG_METRICS.map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white tabular-nums">
                      {metric.value}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Product Spotlight & Specs Preview */}
          <div className="lg:col-span-5 relative w-full">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-lime-500/10 rounded-3xl blur-2xl -z-10" />

            <div className="relative rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-5 sm:p-6 backdrop-blur-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-lime-400" />
                  <span className="text-xs font-mono text-slate-400 ml-2">SANJOG FACTORY DISPATCH</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NABL LAB VERIFIED</span>
                </div>
              </div>

              {/* Product Visual */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 mb-5 group">
                <img
                  src={highlightData[activeHighlight].image}
                  alt={highlightData[activeHighlight].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Overlay Badge with Logo */}
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800/90 flex items-center gap-2">
                  <SanjogLogo size="sm" showText={false} />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {highlightData[activeHighlight].title}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-cyan-300">
                  {highlightData[activeHighlight].spec}
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-lg mb-4 border border-slate-800/80">
                <button
                  onClick={() => setActiveHighlight('barriers')}
                  className={`flex-1 py-1.5 px-1 text-[11px] sm:text-xs font-medium rounded-md transition-all truncate ${
                    activeHighlight === 'barriers'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Crash Barrier
                </button>
                <button
                  onClick={() => setActiveHighlight('lighting')}
                  className={`flex-1 py-1.5 px-1 text-[11px] sm:text-xs font-medium rounded-md transition-all truncate ${
                    activeHighlight === 'lighting'
                      ? 'bg-slate-800 text-lime-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  High Mast
                </button>
                <button
                  onClick={() => setActiveHighlight('mining')}
                  className={`flex-1 py-1.5 px-1 text-[11px] sm:text-xs font-medium rounded-md transition-all truncate ${
                    activeHighlight === 'mining'
                      ? 'bg-slate-800 text-teal-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Drill Rods
                </button>
                <button
                  onClick={() => setActiveHighlight('concrete')}
                  className={`flex-1 py-1.5 px-1 text-[11px] sm:text-xs font-medium rounded-md transition-all truncate ${
                    activeHighlight === 'concrete'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Concrete
                </button>
              </div>

              {/* Tab Data Specifications */}
              <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800/80 text-xs font-mono space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Technical Standard:</span>
                  <span className="text-cyan-400 font-medium">{highlightData[activeHighlight].spec}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Protective Coating / Build:</span>
                  <span className="text-lime-400 font-medium">{highlightData[activeHighlight].zinc}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Availability:</span>
                  <span className="text-white font-medium">{highlightData[activeHighlight].leadTime}</span>
                </div>
              </div>

              {/* Bottom Quick Trigger */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Pan-India Direct Logistics
                </span>
                <button
                  onClick={() => onOpenInquiry(highlightData[activeHighlight].title)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Request Factory Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
