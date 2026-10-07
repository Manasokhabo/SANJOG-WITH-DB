import React from 'react';
import { SanjogLogo } from './SanjogLogo';
import { useCms } from '../context/CmsContext';
import { PageType } from './Navbar';
import { ArrowUp, Mail, Phone, FileText, Lock } from 'lucide-react';

interface FooterProps {
  onOpenDossier: () => void;
  onOpenInquiry: () => void;
  onNavigate?: (page: PageType) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenDossier, 
  onOpenInquiry, 
  onNavigate,
  onOpenAdminLogin
}) => {
  const { companyInfo, cataloguePdfUrl, downloadCatalogue } = useCms();

  const handleCatalogDownload = () => {
    if (cataloguePdfUrl) {
      downloadCatalogue();
    } else {
      onOpenDossier();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLink = (page: PageType) => {
    if (onNavigate) {
      onNavigate(page);
    }
    scrollToTop();
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand info (Span 2 cols) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <button
              onClick={() => handleLink('home')}
              className="inline-block focus:outline-none text-left"
            >
              <SanjogLogo size="md" showText={true} />
            </button>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sanjog Infrastructure & Safety Solutions is a premier manufacturer and supplier of highway crash barriers, octagonal high mast lighting towers, mining drill rods, concrete machinery, and perimeter fencing.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-mono">
              Reg: {companyInfo.registrationNo} &middot; MoRTH & ISO 9001:2015 Certified
            </div>
          </div>

          {/* Quick Pages */}
          <div className="text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Website Pages
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleLink('home')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Products (16 Items)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('gallery')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Project & Factory Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  About Us & Plant
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Key Product Categories */}
          <div className="text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Products
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  W-Beam & Thrie-Beam Barriers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  High Mast Lighting Towers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Mining & TCT Drill Rods
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Concrete Mixers & Vibrators
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('products')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  uPVC Pipes & Interlink Chain
                </button>
              </li>
              <li>
                <button
                  onClick={handleCatalogDownload}
                  className="hover:text-cyan-400 transition-colors text-left flex items-center gap-1.5 text-slate-300 pt-1"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Catalog {cataloguePdfUrl ? '(PDF)' : ''}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Sales & Contact */}
          <div className="text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Sales Office
            </div>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${companyInfo.inquiryEmail}`}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-cyan-400" />
                  <span className="truncate">{companyInfo.inquiryEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone.split('/')[0].trim()}`}
                  className="hover:text-lime-400 transition-colors flex items-center gap-1.5 font-mono"
                >
                  <Phone className="w-3 h-3 text-lime-400" />
                  <span>{companyInfo.phone.split('/')[0].trim()}</span>
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenInquiry}
                  className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-cyan-400 text-xs text-white rounded-lg transition-colors font-medium"
                >
                  Request Supply Quote
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row with Hidden Admin Access via Copyright Symbol (c) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            {/* The (c) copyright symbol is the secret admin access gateway */}
            <button
              onClick={onOpenAdminLogin}
              className="inline-flex items-center justify-center text-slate-400 hover:text-cyan-400 focus:outline-none transition-colors cursor-pointer group"
              title="Admin Panel Login"
              aria-label="Admin Access"
            >
              <span className="font-semibold text-xs tracking-tight group-hover:scale-110 transition-transform">
                &copy;
              </span>
            </button>
            <span>
              {new Date().getFullYear()} {companyInfo.companyName || 'Sanjog'}. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            <span className="hover:text-slate-300">MoRTH Section 811 & 803 Compliant</span>
            <span aria-hidden="true">&middot;</span>
            <span className="hover:text-slate-300">IS 2062 & IS 4759 Certified</span>
            <span aria-hidden="true">&middot;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
