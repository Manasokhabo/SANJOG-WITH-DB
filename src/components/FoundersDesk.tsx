import React from 'react';
import { useCms } from '../context/CmsContext';
import { Quote, Award, CheckCircle2, ArrowRight, PhoneCall, Building2 } from 'lucide-react';
import { PageType } from './Navbar';

interface FoundersDeskProps {
  onNavigate?: (page: PageType) => void;
  onOpenDossier?: () => void;
}

export const FoundersDesk: React.FC<FoundersDeskProps> = ({ onNavigate, onOpenDossier }) => {
  const { founderDesk, companyInfo } = useCms();
  const organizationName = founderDesk.organization || companyInfo.companyName || 'Sanjog';

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-[#070B14] to-slate-950 border-t border-b border-slate-900 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Founder Photo & Professional Credential Badge */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              {/* Outer decorative gradient frame */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-teal-500/20 to-lime-500/30 blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                {/* Photo */}
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={founderDesk.image || '/src/assets/images/sanjog_founder_portrait_1791294725163.jpg'}
                    alt={founderDesk.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top filter brightness-100 contrast-105 group-hover:scale-102 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback image if broken
                      (e.target as HTMLImageElement).src = '/src/assets/images/sanjog_founder_portrait_1791294725163.jpg';
                    }}
                  />
                  {/* Subtle lower gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* Floating verification badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                    <span>Founder & Leadership</span>
                  </div>

                  {/* Bottom name overlay on photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800/90 text-left">
                    <h3 className="text-lg font-bold text-white font-display">
                      {founderDesk.name}
                    </h3>
                    <p className="text-xs font-semibold text-lime-400 font-mono">
                      {founderDesk.designation}
                    </p>
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                      <span>Experience: {founderDesk.experienceYears || '18+ Years'}</span>
                      <span className="text-cyan-400 font-semibold">{organizationName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick credentials ticker */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start max-w-sm sm:max-w-md w-full">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 font-mono">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>MoRTH & NHAI Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 font-mono">
                <Building2 className="w-3.5 h-3.5 text-lime-400" />
                <span>Modern Fabrication Yard</span>
              </div>
            </div>
          </div>

          {/* Right Column: Words from Founder's Desk */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300">
              <Quote className="w-3.5 h-3.5 text-cyan-400" />
              <span>{founderDesk.badge || "From the Founder's Desk"}</span>
            </div>

            {/* Quote Headline */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-display leading-snug">
              {founderDesk.quoteTitle || "“Every kilometer of highway crash barrier we manufacture represents human lives protected and India's infrastructure advancing forward.”"}
            </blockquote>

            {/* Founder's words */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              <p>
                {founderDesk.paragraph1 || `When we laid the foundation of ${organizationName}, India was entering an unprecedented golden era of expressway, bridge, and high-speed corridor construction under national vision programs like Bharatmala. However, contractors routinely grappled with supply delays, sub-standard zinc coating, and erratic quality from fragmented vendors.`}
              </p>
              <p>
                {founderDesk.paragraph2 || `We established ${organizationName} to eliminate those compromises. By investing in our own modern continuous roll-forming mills, dedicated 14-meter hot-dip galvanizing baths, and strict NABL testing protocols, we ensure that every single W-Beam, octagonal mast, drill rod, and concrete machine leaving our factory meets the highest MoRTH, IS, and AASHTO benchmarks with complete transparency. We treat every client's project schedule with the same urgency as our own.`}
              </p>
            </div>

            {/* Founder's Core Motto */}
            {founderDesk.keyMotto && (
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-900/40 text-xs sm:text-sm text-slate-200 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-lime-400 mt-2 shrink-0 animate-pulse" />
                <div>
                  <span className="text-[11px] font-mono uppercase text-cyan-400 block tracking-wider font-semibold">
                    Our Operational Promise
                  </span>
                  <span className="font-medium text-white italic">
                    "{founderDesk.keyMotto}"
                  </span>
                </div>
              </div>
            )}

            {/* Signature & Actions */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-900">
              <div>
                <div className="text-lg font-bold text-white font-display">
                  {founderDesk.signatureName || founderDesk.name}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {founderDesk.designation} &middot; <span className="text-slate-300 font-semibold">{organizationName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('contact')}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl transition-all shadow-md shadow-cyan-500/20"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Speak with Sales</span>
                  </button>
                )}

                {onOpenDossier && (
                  <button
                    onClick={onOpenDossier}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                  >
                    <span>Company Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
