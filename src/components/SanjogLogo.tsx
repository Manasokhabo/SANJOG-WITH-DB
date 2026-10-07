import React from 'react';
import { useCms } from '../context/CmsContext';

interface SanjogLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
  animated?: boolean;
  use3DEmblem?: boolean;
  className?: string;
}

export const SanjogLogo: React.FC<SanjogLogoProps> = ({
  size = 'md',
  showText = true,
  animated = true,
  use3DEmblem = false,
  className = ''
}) => {
  let websiteIcon = '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
  try {
    const cms = useCms();
    if (cms && cms.websiteIcon) {
      websiteIcon = cms.websiteIcon;
    }
  } catch {}

  const dimensions = {
    sm: { icon: 34, text: 'text-xl' },
    md: { icon: 46, text: 'text-2xl sm:text-3xl' },
    lg: { icon: 68, text: 'text-4xl' },
    hero: { icon: 110, text: 'text-5xl sm:text-6xl' }
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon / Emblem (Supports transparent PNG without background) */}
      <div 
        className={`relative flex items-center justify-center shrink-0 ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        {use3DEmblem || websiteIcon ? (
          <div className="relative w-full h-full flex items-center justify-center bg-transparent">
            <img 
              src={websiteIcon} 
              alt="Sanjog Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(6,182,212,0.35)]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
              }}
            />
          </div>
        ) : (
          <svg
            viewBox="0 0 140 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.3)]"
          >
            <defs>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#00B4D8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A3E635" />
                <stop offset="50%" stopColor="#84CC16" />
                <stop offset="100%" stopColor="#4D7C0F" />
              </linearGradient>
              <radialGradient id="sphereHighlight" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="35%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="black" stopOpacity="0.4" />
              </radialGradient>
            </defs>

            <line x1="70" y1="70" x2="70" y2="20" stroke="url(#cyanGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="105" y2="35" stroke="url(#cyanGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="120" y2="70" stroke="url(#cyanGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="105" y2="105" stroke="url(#limeGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="70" y2="120" stroke="url(#limeGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="35" y2="105" stroke="url(#limeGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="20" y2="70" stroke="url(#cyanGrad)" strokeWidth="8" strokeLinecap="round" />
            <line x1="70" y1="70" x2="35" y2="35" stroke="url(#cyanGrad)" strokeWidth="8" strokeLinecap="round" />

            <circle cx="70" cy="18" r="13" fill="url(#cyanGrad)" />
            <circle cx="70" cy="18" r="13" fill="url(#sphereHighlight)" />
            <circle cx="107" cy="33" r="13" fill="url(#cyanGrad)" />
            <circle cx="107" cy="33" r="13" fill="url(#sphereHighlight)" />
            <circle cx="122" cy="70" r="13" fill="url(#cyanGrad)" />
            <circle cx="122" cy="70" r="13" fill="url(#sphereHighlight)" />
            <circle cx="107" cy="107" r="13" fill="url(#limeGrad)" />
            <circle cx="107" cy="107" r="13" fill="url(#sphereHighlight)" />
            <circle cx="70" cy="122" r="13" fill="url(#limeGrad)" />
            <circle cx="70" cy="122" r="13" fill="url(#sphereHighlight)" />
            <circle cx="33" cy="107" r="13" fill="url(#limeGrad)" />
            <circle cx="33" cy="107" r="13" fill="url(#sphereHighlight)" />
            <circle cx="18" cy="70" r="13" fill="url(#cyanGrad)" />
            <circle cx="18" cy="70" r="13" fill="url(#sphereHighlight)" />
            <circle cx="33" cy="33" r="13" fill="url(#cyanGrad)" />
            <circle cx="33" cy="33" r="13" fill="url(#sphereHighlight)" />

            <circle cx="70" cy="70" r="28" fill="#0A1120" stroke="#38BDF8" strokeWidth="6" />
            <circle cx="70" cy="70" r="18" fill="#0369A1" />
          </svg>
        )}
      </div>

      {/* Brand Typographic Wordmark - SANJOG */}
      {showText && (
        <div className="flex items-center text-left">
          <div className={`font-black tracking-wider leading-none font-display ${dimensions.text} flex items-center drop-shadow-sm`}>
            <span className="text-cyan-400">SAN</span>
            <span className="text-lime-400">JOG</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const SajogLogo = SanjogLogo;
