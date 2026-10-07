import React, { useState, useEffect } from 'react';
import { SanjogLogo } from './SanjogLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export type PageType = 'home' | 'products' | 'gallery' | 'about' | 'contact' | 'cms';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenDossier?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: PageType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId: PageType) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-2.5 sm:py-3'
          : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/50 py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Zone */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group text-left focus:outline-none"
            aria-label="Sanjog Home"
          >
            <SanjogLogo size="sm" showText={true} />
          </button>

          {/* Center Navigation Links (Exact 5 pages requested) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 lg:gap-3 text-xs lg:text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activePage === item.id
                    ? 'text-cyan-300 bg-slate-900 border border-cyan-500/30 font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Get Quotation */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40 whitespace-nowrap"
            >
              <span>Get Quotation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-md"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl rounded-2xl px-4 shadow-2xl">
            <nav className="flex flex-col gap-1.5 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                    activePage === item.id
                      ? 'bg-slate-900 text-cyan-300 font-semibold border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {activePage === item.id && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </button>
              ))}

              <div className="pt-2 mt-1 border-t border-slate-800">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                >
                  <span>Request Supply Quotation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
