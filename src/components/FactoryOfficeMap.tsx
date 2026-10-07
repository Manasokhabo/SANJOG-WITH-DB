import React from 'react';
import { useCms } from '../context/CmsContext';
import { MapPin, Navigation, ExternalLink, Phone, Mail, Building } from 'lucide-react';

export const FactoryOfficeMap: React.FC = () => {
  const { companyInfo } = useCms();

  const officeLocation = {
    name: 'Corporate Sales & Commercial Headquarters',
    tag: `${companyInfo.companyName || 'Sanjog'} Registered Corporate Office`,
    address: companyInfo.headquarters,
    mapQuery: 'Sector V, Salt Lake, Kolkata, West Bengal, 700091, India',
    details: 'EPC Tender Liaison, Commercial Contracting & Client Executive Suite'
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl text-left">
      {/* Top Header */}
      <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Corporate Headquarters Location Map</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            {officeLocation.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {officeLocation.address}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeLocation.mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-slate-700 transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Clean Direct Map Frame */}
      <div className="relative w-full h-[380px] sm:h-[430px] bg-slate-950">
        <iframe
          title={`${companyInfo.companyName || 'Sanjog'} Location Map`}
          width="100%"
          height="100%"
          className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[180deg] contrast-125 brightness-95"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(officeLocation.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        />

        {/* Floating Detail Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold inline-block mb-1">
                {officeLocation.tag}
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {officeLocation.address}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                {officeLocation.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
