import React from 'react';
import { ShieldCheck, Truck, Award, CheckCircle2, Factory } from 'lucide-react';

export const ClientProof: React.FC = () => {
  const caseStudies = [
    {
      sector: 'National Expressway Infrastructure EPC',
      client: 'Golden Quadrilateral & Bharatmala Expressway Stretch',
      challenge: 'Requirement for 180 km of hot-dip galvanized W-Beam crash barrier and 45 octagonal high mast lighting towers with strict 45-day dispatch deadline and third-party NABL mechanical testing.',
      solution: 'Sanjog deployed parallel cold roll-forming lines and automated hot-dip galvanizing baths, delivering 47,200 panels, posts, and complete fastener sets 6 days ahead of schedule.',
      metrics: [
        { label: 'Total Supplied', value: '180 km' },
        { label: 'Zinc Coating', value: '≥ 550 g/m²' },
        { label: 'NABL Pass Rate', value: '100%' }
      ]
    },
    {
      sector: 'Hard Rock Quarrying & Deep Blast Hole Mining',
      client: 'Eastern Mineral & Granite Extraction Consortium',
      challenge: 'Excessive rod snapping and premature carbide detachment in extreme quartz granite rock using imported drilling consumables.',
      solution: 'Standardized operations onto Sanjog TCT drill rods and heavy-duty hollow mining rods with induction-brazed YG11C tungsten carbide tips.',
      metrics: [
        { label: 'Tool Life Increase', value: '+45%' },
        { label: 'Drill Rod Breakage', value: '< 0.2%' },
        { label: 'Penetration Rate', value: '1.2 m/min' }
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Sanjog delivered over 65 kilometers of MoRTH Section 811 crash barrier panels for our expressway package without a single rejection during our consultant's metallurgical inspection. Their galvanizing quality is impeccable.",
      author: "Rajinder M. Khurana",
      role: "Project Director, Highway Construction",
      org: "National Infrastructure Builders Ltd"
    },
    {
      quote: "We switched to Sanjog's pneumatic rock drill machines and TCT drill rods across our 4 quarry sites. The penetration speed in dense granite and wear life of the carbide tips reduced our consumables budget by 30%.",
      author: "Subrata Roy",
      role: "Chief Mining Engineer",
      org: "Apex Granite & Minerals Corp"
    }
  ];

  return (
    <section className="py-20 relative bg-slate-950/90 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2 font-mono">
            Proven Industrial Field Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Verified Project Deployments
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Real field delivery records from major national expressway concessionaires, mining operators, and commercial EPC contractors.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1">
                  {study.sector}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-4">
                  {study.client}
                </h3>

                <div className="space-y-3 mb-6 text-xs text-slate-300 leading-relaxed">
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">Project Scope:</span>
                    <span>{study.challenge}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block mb-0.5">Sanjog Supply Delivery:</span>
                    <span>{study.solution}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="pt-4 border-t border-slate-800">
                <div className="grid grid-cols-3 gap-2">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center">
                      <div className="text-base sm:text-lg font-bold font-display text-white tabular-nums">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tight mt-0.5 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-950 border border-slate-800/90 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 font-mono">
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {t.role} &middot; <span className="text-slate-300">{t.org}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
