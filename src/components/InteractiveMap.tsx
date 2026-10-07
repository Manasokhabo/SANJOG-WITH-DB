import React, { useState } from 'react';
import { useCms, MapHub } from '../context/CmsContext';
import { 
  MapPin, 
  Building2, 
  Truck, 
  Compass, 
  ExternalLink, 
  Phone, 
  CheckCircle2, 
  Layers, 
  Navigation,
  Globe2,
  Share2
} from 'lucide-react';

interface InteractiveMapProps {
  className?: string;
  onEnquireHub?: (hubName: string) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ className = '', onEnquireHub }) => {
  const { mapHubs, companyInfo } = useCms();
  const [selectedHub, setSelectedHub] = useState<MapHub>(mapHubs[0] || null);
  const [filterType, setFilterType] = useState<string>('all');
  const [mapMode, setMapMode] = useState<'network' | 'google'>('network');

  const hubTypes = [
    { id: 'all', label: 'All Supply Facilities' },
    { id: 'Factory & Galvanizing', label: 'Manufacturing & Galvanizing Works' },
    { id: 'Corporate Office', label: 'Corporate & Sales Offices' },
    { id: 'Supply Depot', label: 'Regional Supply Depots' },
    { id: 'Major Corridor', label: 'Active Supply Corridors' }
  ];

  const filteredHubs = filterType === 'all' 
    ? mapHubs 
    : mapHubs.filter(h => h.type === filterType);

  return (
    <div className={`w-full bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl ${className}`}>
      {/* Top Map Header & View Switcher */}
      <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Supply Network & Plant Locations</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            Sanjog Manufacturing Plant & Pan-India Dispatch Hubs
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Click on any manufacturing works or regional depot on the interactive map below to view dispatch capacity and contact info.
          </p>
        </div>

        {/* View Mode Toggle: Interactive Network Map vs Live Google Map */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setMapMode('network')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mapMode === 'network'
                ? 'bg-slate-800 text-cyan-300 shadow-sm border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Hubs Map</span>
          </button>

          <button
            onClick={() => setMapMode('google')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mapMode === 'google'
                ? 'bg-slate-800 text-lime-400 shadow-sm border border-lime-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Live Google Map</span>
          </button>
        </div>
      </div>

      {/* Filter Chips for Hub Types */}
      <div className="px-5 sm:px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-mono text-slate-400 whitespace-nowrap">Filter:</span>
        {hubTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilterType(type.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              filterType === type.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Map Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[460px]">
        {/* Main Interactive Map Canvas */}
        <div className="lg:col-span-8 relative bg-[#060A13] flex items-center justify-center min-h-[380px] sm:min-h-[440px] overflow-hidden p-4 select-none">
          {mapMode === 'network' ? (
            <div className="relative w-full max-w-2xl aspect-[16/11] flex items-center justify-center">
              {/* Stylized India & Eastern Highway Corridor Base Vector Illustration */}
              <svg
                viewBox="0 0 800 650"
                className="w-full h-full text-slate-800/40 drop-shadow-lg"
                fill="none"
                stroke="currentColor"
              >
                <defs>
                  <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#84cc16" stopOpacity="0.05" />
                  </linearGradient>
                  <pattern id="dotPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.4" />
                  </pattern>
                </defs>

                {/* Background dot matrix grid */}
                <rect width="800" height="650" fill="url(#dotPattern)" />

                {/* Highway corridor connector paths */}
                <path
                  d="M 590 350 L 610 370 L 560 410 L 530 330 L 440 260"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  strokeOpacity="0.5"
                  fill="none"
                />
                <path
                  d="M 610 370 L 670 420 L 560 410"
                  stroke="#84cc16"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeOpacity="0.4"
                  fill="none"
                />
                <path
                  d="M 440 260 L 320 220 L 260 300"
                  stroke="#64748b"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.3"
                  fill="none"
                />

                {/* Abstract India boundary outline approximation */}
                <path
                  d="M 320 120 C 350 140, 390 130, 420 180 C 450 210, 520 230, 560 250 C 600 270, 680 260, 720 290 C 740 320, 710 360, 660 360 C 630 365, 620 400, 610 430 C 590 480, 560 530, 520 570 C 470 590, 440 550, 420 500 C 390 460, 360 400, 340 360 C 310 330, 260 320, 240 280 C 220 240, 260 190, 290 160 Z"
                  fill="url(#gridGrad)"
                  stroke="#1e293b"
                  strokeWidth="1.5"
                />

                {/* State boundaries / Regional highlights */}
                <circle cx="610" cy="370" r="80" fill="#0891b2" fillOpacity="0.05" />
                <circle cx="560" cy="410" r="60" fill="#84cc16" fillOpacity="0.04" />
                <circle cx="530" cy="330" r="50" fill="#0891b2" fillOpacity="0.04" />

                {/* Labels on SVG */}
                <text x="635" y="360" fill="#94a3b8" fontSize="12" fontFamily="monospace" fontWeight="600">West Bengal</text>
                <text x="560" y="445" fill="#94a3b8" fontSize="11" fontFamily="monospace">Odisha</text>
                <text x="510" y="315" fill="#94a3b8" fontSize="11" fontFamily="monospace">Jharkhand</text>
                <text x="390" y="270" fill="#94a3b8" fontSize="11" fontFamily="monospace">UP & Bihar</text>
              </svg>

              {/* Dynamic Interactive Marker Pins for Each Hub */}
              {filteredHubs.map((hub) => {
                const isSelected = selectedHub?.id === hub.id;
                const isOffice = hub.type === 'Corporate Office';

                return (
                  <div
                    key={hub.id}
                    style={{
                      left: `${hub.coordinates.x}%`,
                      top: `${hub.coordinates.y}%`
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    onClick={() => setSelectedHub(hub)}
                  >
                    {/* Pulsing ring */}
                    <div
                      className={`absolute -inset-3 rounded-full animate-ping opacity-60 ${
                        isOffice ? 'bg-lime-400' : 'bg-cyan-400'
                      }`}
                    />

                    {/* Marker icon button */}
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-xl ${
                        isSelected
                          ? 'scale-125 bg-white text-slate-950 border-cyan-400 ring-4 ring-cyan-500/40 shadow-cyan-500/50'
                          : isOffice
                          ? 'bg-lime-400 text-slate-950 border-white hover:scale-115'
                          : 'bg-slate-900 text-cyan-300 border-slate-700 hover:border-cyan-400 hover:scale-115'
                      }`}
                    >
                      {isOffice ? (
                        <Building2 className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                    </div>

                    {/* Permanent clean label tag */}
                    <div
                      className={`absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold transition-all shadow-md pointer-events-none ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 border border-white'
                          : 'bg-slate-950/90 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {hub.name.split(' ')[0]} {hub.state}
                    </div>
                  </div>
                );
              })}

              {/* Map Legend */}
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md border border-slate-800/80 rounded-xl p-2.5 text-[10px] font-mono text-slate-300 space-y-1 hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>Manufacturing & 14m Zinc Bath</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                  <span>Corporate Office / Sales HQ</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <span>Regional Supply Depot</span>
                </div>
              </div>
            </div>
          ) : (
            /* Live Google Maps Iframe View */
            <div className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden relative">
              <iframe
                title="Sanjog Google Map Location"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[420px] border-0 rounded-2xl filter invert-[0.9] hue-rotate-[180deg] contrast-125"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  selectedHub ? `${selectedHub.name}, ${selectedHub.state}` : 'Sector V Salt Lake Kolkata West Bengal India'
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-lime-400" />
                <span>Showing: {selectedHub?.name || 'Kolkata Facility'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Info Details Panel for Selected Hub */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-950/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between space-y-5">
          {selectedHub ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {selectedHub.type}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  State: <strong className="text-white">{selectedHub.state}</strong>
                </span>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white font-display">
                  {selectedHub.name}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {selectedHub.description}
                </p>
              </div>

              {/* Monthly Capacity & Specs */}
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                    Dispatch Capacity & Machinery
                  </span>
                  <span className="text-xs font-semibold text-lime-400 font-mono block mt-0.5">
                    {selectedHub.capacity}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                    Contact Liaison
                  </span>
                  <span className="text-xs font-semibold text-white font-mono block mt-0.5">
                    {selectedHub.contact}
                  </span>
                </div>
              </div>

              {/* Standards Verified */}
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MoRTH & ISO 9001:2015 Approved Dispatch Point</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-400">
              Select a location pin on the map to view facility details.
            </div>
          )}

          {/* Action buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {onEnquireHub && selectedHub && (
              <button
                onClick={() => onEnquireHub(selectedHub.name)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Request Dispatch from This Hub</span>
              </button>
            )}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedHub ? `${selectedHub.name}, ${selectedHub.state}` : 'Sanjog Infrastructure Kolkata'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
