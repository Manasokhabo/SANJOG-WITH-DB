import React, { useState } from 'react';
import { 
  SANJOG_MILESTONES, 
  SANJOG_CERTIFICATIONS, 
  SANJOG_LEADERSHIP, 
  COMPANY_DOSSIER,
  SANJOG_METRICS
} from '../data/companyData';
import { 
  Building2, 
  Award, 
  Users, 
  Clock, 
  Download, 
  CheckCircle, 
  FileSpreadsheet, 
  FileText, 
  Shield, 
  Factory,
  HardHat,
  Truck
} from 'lucide-react';

interface CompanyDataCenterProps {
  onOpenDossierModal: () => void;
}

export const CompanyDataCenter: React.FC<CompanyDataCenterProps> = ({ onOpenDossierModal }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'leadership' | 'compliance'>('overview');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const triggerDownload = (type: 'profile' | 'compliance' | 'matrix') => {
    let filename = '';
    let content = '';

    if (type === 'profile') {
      filename = 'Sanjog_Corporate_Profile_2026.txt';
      content = `======================================================================
SANJOG INFRASTRUCTURE & SAFETY SOLUTIONS - CORPORATE PROFILE (2026)
======================================================================
Company Legal Name:   ${COMPANY_DOSSIER.companyName}
Commercial Brand:     ${COMPANY_DOSSIER.tradingName}
Registration Number:  ${COMPANY_DOSSIER.registrationNo}
Founded:              ${COMPANY_DOSSIER.foundingYear}
Headquarters & Works: ${COMPANY_DOSSIER.headquarters}
Regional Offices:     ${COMPANY_DOSSIER.regionalOffices.join(', ')}

OVERVIEW & MANDATE:
${COMPANY_DOSSIER.summary}

MANUFACTURING COMPETENCIES & PRODUCT DIVISIONS:
${COMPANY_DOSSIER.primaryDomains.map((d, i) => `${i + 1}. ${d}`).join('\n')}

FACILITY CAPACITY:
- Continuous Cold Roll Forming: 3,500 Metric Tons / Month
- Hot-Dip Galvanizing Bath: 14-Meter Structural Tank (≥ 550 g/m² zinc)
- Octagonal Mast Press Brake: Up to 35m High Mast Lighting Towers
- Induction Drill Tool Heat Treatment: 25,000 Rods / Month

ACCREDITED STANDARDS:
- MoRTH Specifications for Road & Bridge Works Section 811 & 803
- AASHTO M180 Class A / B
- IS 2062 (Steel), IS 4759 (Galvanizing), IS 4985 (uPVC Pipes), IS 2721 (Chainlink)
- ISO 9001:2015 Quality Management System

CONTACT:
- Sales & Tenders: ${COMPANY_DOSSIER.inquiryEmail}
- Support: ${COMPANY_DOSSIER.supportEmail}
- Tel: ${COMPANY_DOSSIER.phone}
======================================================================`;
    } else if (type === 'compliance') {
      filename = 'Sanjog_Quality_Compliance_Declarations.txt';
      content = `======================================================================
SANJOG INFRASTRUCTURE & SAFETY - COMPLIANCE & QUALITY AUDIT REPORT
======================================================================
${SANJOG_CERTIFICATIONS.map(c => `
STANDARD: ${c.code} (${c.name})
Auditing Body / Agency: ${c.authority}
Scope: ${c.scope}
Status: ${c.status}
`).join('\n----------------------------------------------------------------------\n')}
======================================================================`;
    } else {
      filename = 'Sanjog_Complete_16_Product_Catalog.txt';
      content = `======================================================================
SANJOG INFRASTRUCTURE & SAFETY - COMPLETE 16-PRODUCT CATALOG
======================================================================

1. HIGHWAY CRASH BARRIER DIVISION:
- W - Beam Crash Barrier (MoRTH Sec 811, 4318x312x83mm, 3.0mm, Fe410)
- Thrie Beam Crash Barrier (Heavy-duty triple wave 508mm profile)

2. MINING & ROCK DRILLING DIVISION:
- Mining Drill Rod (Hollow alloy chrome-moly, R25-T51 carburized threads)
- TCT Drill Rod (Tungsten carbide tipped integral & tapered chisel rods)
- Rock Drill Machine (Pneumatic jackhammer & air-leg rock drilling machines)

3. ROAD SAFETY & LIGHTING DIVISION:
- High Mast Lighting Octagonal Tower (12m - 35m continuously tapered)
- Solar Road Studs (Die-cast aluminium ADC12, >25T load, IP68, 6 LEDs)
- Road Marking Machine (Thermoplastic screed striper with pre-heater)
- Road Paint (100% solid thermoplastic compound with intermix glass beads)
- Bitumen Heating Tank (15,000L - 50,000L thermic fluid & direct burner)

4. CONCRETE MACHINERY DIVISION:
- Concrete Mixer Machine (10/7 CFT hydraulic tilting drum batch mixer)
- Concrete Vibrator (5.0 HP petrol engine & 3-phase electric drive units)
- Vibrating Needle (25mm to 60mm high-frequency flexible poker needles)

5. PIPES & SECURITY FENCING DIVISION:
- Unplasticized PVC Pipes (IS 4985, Dia 20mm - 315mm, Class 1 to 4)
- MS Angle Y Type (50x50x5mm Y-post for security barbed & concertina wire)
- Interlink Chain (Galvanized & PVC coated chain link diamond mesh fence)

======================================================================
All products available for direct factory dispatch across India.
Sales & Procurement: sales@sanjoginfra.com
======================================================================`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded ${filename}`);
    setTimeout(() => setDownloadNotice(null), 3500);
  };

  return (
    <section id="company-data" className="py-20 relative bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-lime-400 mb-2 font-mono">
              Transparent Manufacturing & Company Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Company Data & Operations Center
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Access verifiable manufacturing statistics, plant capacities, quality certifications, leadership credentials, and downloadable product catalogs.
            </p>
          </div>

          {/* Quick Dossier Modal Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDossierModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-semibold text-white rounded-xl transition-all shadow-md"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Full Interactive Dossier</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/80 rounded-xl border border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Factory className="w-3.5 h-3.5 text-cyan-400" />
            <span>Manufacturing Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'timeline'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-lime-400" />
            <span>Milestones & Timeline</span>
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'compliance'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span>Standards & Testing</span>
          </button>
          <button
            onClick={() => setActiveTab('leadership')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'leadership'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Management & Engineering</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Core Entity Facts */}
            <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  {COMPANY_DOSSIER.companyName}
                </h3>
                <p className="text-xs text-lime-400 font-mono">
                  Registration: {COMPANY_DOSSIER.registrationNo} &middot; Established {COMPANY_DOSSIER.foundingYear}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {COMPANY_DOSSIER.summary}
              </p>

              {/* Data points table */}
              <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 bg-slate-950/60 p-4 gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Works & Manufacturing Hubs
                    </span>
                    <span className="text-slate-200 font-medium">
                      {COMPANY_DOSSIER.headquarters}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-1">
                      Regional Distribution Depots
                    </span>
                    <span className="text-slate-200 font-medium">
                      {COMPANY_DOSSIER.regionalOffices.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Manufacturing Divisions */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3 font-mono">
                  Key Production Lines
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {COMPANY_DOSSIER.primaryDomains.map((domain, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{domain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instant Data Downloads Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-900/40 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    Instant Document & Data Center
                  </h4>
                  <p className="text-xs text-slate-400">
                    Official publications & technical manuals
                  </p>
                </div>
              </div>

              {downloadNotice && (
                <div className="p-3 bg-emerald-950/70 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{downloadNotice}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => triggerDownload('profile')}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        Official Company Profile (2026)
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Company registration, factory capacities, and supply footprint
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-cyan-400" />
                </button>

                <button
                  onClick={() => triggerDownload('matrix')}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-lime-500/50 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-4 h-4 text-lime-400" />
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-lime-300">
                        Complete 16-Product Catalog
                      </div>
                      <div className="text-[11px] text-slate-400">
                        W-Beam, Thrie-Beam, High Mast, Drill Rods, Mixers & Pipes
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-lime-400" />
                </button>

                <button
                  onClick={() => triggerDownload('compliance')}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/50 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-teal-400" />
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-teal-300">
                        MoRTH & IS Quality Audit Report
                      </div>
                      <div className="text-[11px] text-slate-400">
                        IS 2062, IS 4759, IS 4985, and AASHTO M180 declarations
                      </div>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-teal-400" />
                </button>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                Official documents generated in clear-text format for procurement vetting, tenders, and client review.
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Timeline */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-32 pl-6 sm:pl-8 space-y-8">
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
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-lime-400 bg-lime-950/40 border border-lime-800/40 px-2.5 py-1 rounded">
                      <span>Production Benchmark:</span>
                      <span className="font-semibold text-white">{item.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Standards */}
        {activeTab === 'compliance' && (
          <div id="certifications" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SANJOG_CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-400 font-semibold">
                      {cert.code}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {cert.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white font-display mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium mb-3">
                    Regulatory Authority: <span className="text-slate-300">{cert.authority}</span>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cert.scope}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Regular batch testing at NABL facilities</span>
                  <button
                    onClick={() => triggerDownload('compliance')}
                    className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <span>Download Declaration</span>
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Leadership */}
        {activeTab === 'leadership' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SANJOG_LEADERSHIP.map((leader, idx) => (
              <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-white font-display">
                      {leader.name}
                    </h4>
                    <p className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">
                      {leader.role}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 font-mono text-xs font-bold">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {leader.background}
                </p>

                <div className="pt-2 text-xs font-mono text-slate-400 border-t border-slate-800">
                  <span className="text-slate-400">Operational Focus: </span>
                  <span className="text-lime-400">{leader.focus}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
