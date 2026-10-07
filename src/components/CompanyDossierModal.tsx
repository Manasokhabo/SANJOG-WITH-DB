import React, { useState } from 'react';
import { COMPANY_DOSSIER, SANJOG_METRICS, SANJOG_CERTIFICATIONS, SANJOG_PRODUCTS } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { SanjogLogo } from './SanjogLogo';
import { X, Download, Copy, Check, Printer, FileText, Globe, Building } from 'lucide-react';

interface CompanyDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyDossierModal: React.FC<CompanyDossierModalProps> = ({
  isOpen,
  onClose
}) => {
  const { cataloguePdfUrl, cataloguePdfName, downloadCatalogue } = useCms();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = JSON.stringify(COMPANY_DOSSIER, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDossier = () => {
    const content = `================================================================================
SANJOG INFRASTRUCTURE & SAFETY SOLUTIONS
OFFICIAL CORPORATE DATA DOSSIER & PRODUCT SPECIFICATION REGISTER (2026)
================================================================================

1. GENERAL CORPORATE IDENTITY
--------------------------------------------------------------------------------
Legal Entity Name:        ${COMPANY_DOSSIER.companyName}
Commercial Brand:         ${COMPANY_DOSSIER.tradingName}
Registration Number:      ${COMPANY_DOSSIER.registrationNo}
Established:              ${COMPANY_DOSSIER.foundingYear}
Headquarters & Works:     ${COMPANY_DOSSIER.headquarters}
Regional Offices:         ${COMPANY_DOSSIER.regionalOffices.join(' | ')}
Official Sales Email:     ${COMPANY_DOSSIER.inquiryEmail}
Direct Contact Lines:     ${COMPANY_DOSSIER.phone}

2. CORPORATE CHARTER & SCOPE
--------------------------------------------------------------------------------
${COMPANY_DOSSIER.summary}

3. PRIMARY MANUFACTURING DIVISIONS
--------------------------------------------------------------------------------
${COMPANY_DOSSIER.primaryDomains.map((d, i) => `[${i + 1}] ${d}`).join('\n')}

4. PRODUCTION & SUPPLY BENCHMARKS
--------------------------------------------------------------------------------
- Crash Barrier Supplied:  1,200+ Kilometers (MoRTH Sec 811)
- High Mast Towers:        3,800+ Towers Installed (12m - 35m)
- Quality Compliance:      100% MoRTH, AASHTO M180, IS 2062, IS 4759
- Active EPC Clients:      450+ Contractors & Government Concessionaires

5. FULL 16-PRODUCT SUMMARY
--------------------------------------------------------------------------------
${SANJOG_PRODUCTS.map((p, idx) => `
${idx + 1}. ${p.name} (${p.categoryLabel})
   Tagline: ${p.tagline}
   Material: ${p.materialGrade}
   Standards: ${p.standards.join(', ')}
   Availability: ${p.availability}
`).join('')}

6. REGULATORY ACCREDITATIONS & TESTING
--------------------------------------------------------------------------------
${SANJOG_CERTIFICATIONS.map(c => `Standard: ${c.code} (${c.name})\nAuthority: ${c.authority}\nScope: ${c.scope}\nStatus: ${c.status}\n`).join('\n')}

================================================================================
ISSUED FOR HIGHWAY EPC PROCUREMENT, TENDER VETTING & DUE DILIGENCE AUDIT.
(c) Sanjog Infrastructure & Safety Solutions. All rights reserved.
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sanjog_Corporate_Data_Dossier_2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <SanjogLogo size="sm" showText={true} />
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              &middot; Corporate & Product Dossier
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cataloguePdfUrl && (
              <button
                onClick={downloadCatalogue}
                className="px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-lime-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                title="Download Custom Uploaded Catalog PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Brochure</span>
              </button>
            )}
            <button
              onClick={handleDownloadDossier}
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors text-xs flex items-center gap-1.5"
              title="Download Data Dossier Text Register"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Text Dossier</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-xs text-slate-300">
          {/* Identity Box */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  {COMPANY_DOSSIER.companyName}
                </h3>
                <span className="text-cyan-400 font-mono text-[11px]">
                  Reg ID: {COMPANY_DOSSIER.registrationNo} &middot; Manufacturing Since {COMPANY_DOSSIER.foundingYear}
                </span>
              </div>
              <span className="text-emerald-400 font-mono text-[11px] px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 self-start sm:self-auto">
                MoRTH Approved Supplier
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {COMPANY_DOSSIER.summary}
            </p>
          </div>

          {/* Operational Metrics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 font-mono">
              Manufacturing & Field Benchmarks
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SANJOG_METRICS.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center">
                  <div className="text-lg font-bold font-display text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 16 Products Directory Quick List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              16-Product Manufacturing Scope
            </h4>
            <div className="rounded-xl border border-slate-800 divide-y divide-slate-800 bg-slate-950/60 max-h-56 overflow-y-auto">
              {SANJOG_PRODUCTS.map((p, pIdx) => (
                <div key={p.id} className="p-2.5 flex items-center justify-between">
                  <span className="text-white font-medium">{pIdx + 1}. {p.name}</span>
                  <span className="text-cyan-400 font-mono text-[11px]">{p.categoryLabel}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure & Locations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              Manufacturing Works & Regional Depots
            </h4>
            <div className="rounded-xl border border-slate-800 divide-y divide-slate-800 bg-slate-950/60">
              <div className="p-3">
                <span className="text-slate-400 block text-[11px]">Primary Fabrication Works & Galvanizing Tanks:</span>
                <span className="text-white font-medium">{COMPANY_DOSSIER.headquarters}</span>
              </div>
              <div className="p-3">
                <span className="text-slate-400 block text-[11px]">Regional Distribution Hubs:</span>
                <span className="text-white font-medium">{COMPANY_DOSSIER.regionalOffices.join(' · ')}</span>
              </div>
            </div>
          </div>

          {/* Certified Compliance Standards */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
              Quality & Structural Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SANJOG_CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <span className="font-mono text-cyan-400 font-semibold block">{cert.code}</span>
                  <span className="text-slate-200 block text-[11px] mt-0.5">{cert.name}</span>
                  <span className="text-slate-400 block text-[10px] mt-0.5">{cert.authority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Direct Line */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block">Sales & Factory Inquiries:</span>
              <span className="text-xs font-medium text-white">{COMPANY_DOSSIER.inquiryEmail} &middot; {COMPANY_DOSSIER.phone}</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 text-[11px] text-slate-300 rounded-lg hover:text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Data' : 'Copy JSON'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950">
          <span className="text-[11px] text-slate-400 font-mono">
            Sanjog Infrastructure & Safety Solutions &copy; 2026
          </span>
          <button
            onClick={handleDownloadDossier}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-lg shadow-sm hover:from-cyan-300 hover:to-lime-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Dossier (.txt)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
