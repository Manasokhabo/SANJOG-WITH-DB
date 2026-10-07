import React, { useState } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar, PageType } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { CmsAdminPage } from './pages/CmsAdminPage';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CompanyDossierModal } from './components/CompanyDossierModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Product } from './data/companyData';

function AppContent() {
  const { isAdminAuthenticated } = useCms();
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [inquiryProduct, setInquiryProduct] = useState<string>('');

  const handleNavigate = (page: PageType) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquireProduct = (productName: string) => {
    setInquiryProduct(productName);
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user requests CMS, require authentication
  if (activePage === 'cms') {
    if (!isAdminAuthenticated) {
      // Show login modal if not logged in
      return (
        <div className="min-h-screen bg-[#080C14] text-slate-100 flex items-center justify-center p-4">
          <AdminLoginModal
            isOpen={true}
            onClose={() => setActivePage('home')}
            onLoginSuccess={() => setActivePage('cms')}
          />
        </div>
      );
    }
    return (
      <CmsAdminPage onBackToSite={() => handleNavigate('home')} />
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      {/* Top Navbar with exact 5 public pages (Home, Products, Gallery, About Us, Contact Us) */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              handleNavigate('products');
            }}
            onOpenDossier={() => setIsDossierOpen(true)}
            onEnquireProduct={handleEnquireProduct}
          />
        )}

        {activePage === 'products' && (
          <ProductsPage
            onSelectProduct={(product) => setSelectedProduct(product)}
            onEnquireProduct={handleEnquireProduct}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            onEnquireProduct={handleEnquireProduct}
          />
        )}

        {activePage === 'about' && (
          <AboutUsPage
            onOpenDossier={() => setIsDossierOpen(true)}
            onNavigateToContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'contact' && (
          <ContactUsPage
            initialProduct={inquiryProduct}
          />
        )}
      </main>

      {/* Footer with Hidden Admin Access on the Copyright (c) Symbol */}
      <Footer
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenInquiry={() => handleNavigate('contact')}
        onNavigate={handleNavigate}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={(productName) => handleEnquireProduct(productName)}
      />

      {/* Company Dossier & Catalog Modal */}
      <CompanyDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Admin Login Modal (Triggered by Copyright (c) in Footer) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setActivePage('cms');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
