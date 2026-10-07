import React, { useState } from 'react';
import { 
  COMPANY_DOSSIER, 
  SANJOG_METRICS, 
  SANJOG_MILESTONES, 
  SANJOG_CERTIFICATIONS, 
  SANJOG_LEADERSHIP 
} from '../data/companyData';
import { 
  Building2, 
  Factory, 
  Award, 
  Users, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  Clock
} from 'lucide-react';

interface AboutUsPageProps {
  onOpenDossier: () => void;
  onNavigateToContact: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onOpenDossier,
  onNavigateToContact
}) => {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const triggerDownload = (type: string) => {
    let filename = 'Sanjog_Corporate_Profile_2026.txt';
    let content = `======================================================================
SANJOG - CORPORATE PROFILE (2026)
======================================================================
Entity: ${COMPANY_DOSSIER.companyName} (${COMPANY_DOSSIER.tradingName})
Registration Number: ${COMPANY_DOSSIER.registrationNo}
Founded: ${COMPANY_DOSSIER.foundingYear}
Headquarters: ${COMPANY_DOSSIER.headquarters}
Regional Sales: ${COMPANY_DOSSIER.regionalOffices.join(' | ')}
Official Sales: ${COMPANY_DOSSIER.inquiryEmail} | Tel: ${COMPANY_DOSSIER.phone}

OVERVIEW:
${COMPANY_DOSSIER.summary}

MANUFACTURING PLANT SPECIFICATIONS:
- High-Speed Cold Roll Forming: Up to 3,500 MT/month
- Hot-Dip Galvanizing: 14-Meter Structural Bath (≥ 550 g/m² zinc as per IS 4759)
- Octagonal High Mast Press Brakes: Towers from 12m to 35m height
- Heat Treatment: Carburized induction hardened drill steel

KEY STANDARDS & CERTIFICATIONS:
${SANJOG_CERTIFICATIONS.map(c => `- ${c.code}: ${c.name} (${c.authority})`).join('\n')}

MANAGEMENT:
${SANJOG_LEADERSHIP.map(l => `- ${l.name} (${l.role}): ${l.focus}`).join('\n')}

======================================================================
(c) Sanjog. All Rights Reserved.
======================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice('Company profile document downloaded successfully.');
    setTimeout(() => setDownloadNotice(null), 3000);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>Manufacturer Profile & Infrastructure</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
          About Sanjog
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Building stronger highways, safer expressways, and high-performance mining operations with certified Indian engineering.
        </p>
      </div>

      {/* Main Company Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-lime-400 font-mono">
            Our Journey & Mission
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            A Trusted Name in Highway Safety & Construction Materials
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Established in 2021, <strong>Sanjog</strong> was founded with a clear mission: to manufacture and supply high-quality, government-specification compliant highway crash barriers, lighting towers, mining tools, and construction machinery directly to contractors and government project developers without intermediaries.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            From our primary fabrication and roll-forming plant in West Bengal and regional stock depots, we deliver certified steel crash barriers conforming strictly to <strong>MoRTH Section 811</strong> and <strong>AASHTO M180</strong>, continuously tapered octagonal high mast lighting poles up to 35 meters, alloy mining drill rods, concrete machinery, and perimeter chain link fencing.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => triggerDownload('profile')}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl hover:from-cyan-300 hover:to-lime-300 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Company Profile (.txt)</span>
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all"
            >
              Contact Our Sales Office
            </button>
          </div>

          {downloadNotice && (
            <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{downloadNotice}</span>
            </div>
          )}
        </div>

        {/* Manufacturing Highlights Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Plant Capacity at a Glance
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Modern Fabrication Setup</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-slate-400 block text-[11px]">Cold Roll-Forming Mill:</span>
              <span className="text-white font-medium">3,500 Metric Tons / Month for W-Beam & Thrie-Beam</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-slate-400 block text-[11px]">Hot-Dip Galvanizing Bath:</span>
              <span className="text-lime-400 font-medium font-mono">14-Meter Structural Tank (≥ 550 g/m² zinc coating)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-slate-400 block text-[11px]">Octagonal Mast Bending:</span>
              <span className="text-white font-medium">High mast lighting poles up to 35m height with winch gear</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-slate-400 block text-[11px]">Mining Tool Heat Treatment:</span>
              <span className="text-white font-medium">Carburized induction hardening & tungsten carbide brazing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Standards & Testing Accreditations */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-1">
            Testing & Compliance
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Certified to National & Global Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every batch is checked and certified through accredited laboratories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SANJOG_CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-semibold">
                  {cert.code}
                </span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{cert.status}</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-display">
                {cert.name}
              </h4>
              <p className="text-xs text-slate-400">
                Audited By: <span className="text-slate-300 font-medium">{cert.authority}</span>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {cert.scope}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Company Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            How Sanjog scaled its manufacturing and pan-India project supply.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-6">
          {SANJOG_MILESTONES.map((item, idx) => (
            <div key={idx} className="relative group">
              <span className="hidden sm:block absolute -left-36 top-0 text-sm font-bold font-mono text-cyan-400">
                {item.year}
              </span>

              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:border-lime-400 transition-colors" />

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
                <span className="sm:hidden text-xs font-bold font-mono text-cyan-400 block mb-1">
                  {item.year}
                </span>
                <h4 className="text-base font-bold text-white font-display mb-1">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2.5">
                  {item.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-lime-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{item.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Management Team */}
      <section className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Key Management & Leadership
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Experienced engineers and managers leading Sanjog operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SANJOG_LEADERSHIP.map((leader, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    {leader.name}
                  </h4>
                  <p className="text-xs font-semibold text-cyan-400 font-mono">
                    {leader.role}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 font-mono">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {leader.background}
              </p>

              <div className="pt-2 text-xs font-mono text-slate-400 border-t border-slate-800/80">
                <span className="text-slate-400">Responsibility: </span>
                <span className="text-lime-400">{leader.focus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
