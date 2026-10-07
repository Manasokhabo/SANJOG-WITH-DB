import React, { useState } from 'react';
import { Product } from '../data/companyData';
import { 
  X, 
  Download, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  HardHat, 
  Truck, 
  FileSpreadsheet
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!product) return null;

  const handleDownloadDatasheet = () => {
    const content = `======================================================================
SANJOG INFRASTRUCTURE & SAFETY SOLUTIONS - TECHNICAL SPECIFICATION
Product: ${product.name}
Tagline: ${product.tagline}
Category: ${product.categoryLabel}
Availability: ${product.availability}
======================================================================

OVERVIEW:
${product.description}

MATERIAL & DIMENSIONS:
- Material Grade: ${product.materialGrade}
- Standard Dimensions: ${product.dimensions}

TECHNICAL SPECIFICATIONS:
${product.specs.map(s => `- ${s.label}: ${s.value}`).join('\n')}

COMPLIANCE STANDARDS:
${product.standards.join(', ')}

CERTIFICATIONS & TESTING:
${product.certifications.join(', ')}

KEY ENGINEERING HIGHLIGHTS:
${product.keyFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}

======================================================================
For supply quotation, tender estimates, or custom fabrication:
Sales: sales@sanjoginfra.com | Direct: +91 (033) 2450-8900
(c) Sanjog Infrastructure & Safety Solutions. All Rights Reserved.
======================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sanjog_${product.id}_Specification_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded">
              {product.categoryLabel}
            </span>
            <span className="text-xs text-slate-400">
              {product.availability}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Top Grid: Image & Core Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Product Image */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover object-center"
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-900/90 text-[11px] font-mono text-slate-300 rounded border border-slate-700">
                {product.dimensions}
              </div>
            </div>

            {/* Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-display">
                  {product.name}
                </h2>
                <p className="text-sm font-medium text-cyan-400 mt-1">
                  {product.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5 text-xs font-mono">
                <div>
                  <span className="text-slate-400">Material Grade: </span>
                  <span className="text-lime-400 font-medium">{product.materialGrade}</span>
                </div>
                <div>
                  <span className="text-slate-400">Compliance: </span>
                  <span className="text-cyan-400">{product.standards.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Engineering Highlights */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Manufacturing & Field Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Specifications Table */}
          <div className="pt-2 border-t border-slate-800">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 font-mono">
              Technical Specification Matrix
            </h3>
            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-800">
                  {product.specs.map((s, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-900/40'}>
                      <td className="px-4 py-2.5 font-medium text-slate-400 w-1/3">
                        {s.label}
                      </td>
                      <td className="px-4 py-2.5 text-slate-200 font-mono">
                        {s.value}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-950/40">
                    <td className="px-4 py-2.5 font-medium text-slate-400">Dimensions</td>
                    <td className="px-4 py-2.5 text-slate-200 font-mono">{product.dimensions}</td>
                  </tr>
                  <tr className="bg-slate-900/40">
                    <td className="px-4 py-2.5 font-medium text-slate-400">Testing & Certifications</td>
                    <td className="px-4 py-2.5 text-emerald-400 font-mono">{product.certifications.join(' · ')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={handleDownloadDatasheet}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Datasheet Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Spec Sheet (.txt)</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product.name);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-lg shadow-md transition-all"
            >
              <span>Request Factory Quotation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
