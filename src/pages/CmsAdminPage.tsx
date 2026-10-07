import React, { useState, useRef } from 'react';
import { 
  useCms, 
  HeroSlide, 
  NewsItem, 
  CompanyInfo, 
  FounderDeskData, 
  MapHub, 
  InquiryItem,
  StatItem,
  CustomerReview,
  CloudDbConfig
} from '../context/CmsContext';
import { Product, GalleryItem } from '../data/companyData';
import { 
  LayoutDashboard, 
  Sliders, 
  Megaphone, 
  Package, 
  Image as ImageIcon, 
  Building2, 
  Inbox, 
  Plus, 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  RotateCcw, 
  ExternalLink,
  Save,
  Search,
  CheckCircle2,
  AlertCircle,
  Upload,
  UserCheck,
  MapPin,
  Lock,
  LogOut,
  Eye,
  EyeOff,
  Quote,
  FileText,
  Download,
  Star,
  Database,
  TrendingUp,
  Server,
  RefreshCw
} from 'lucide-react';

interface CmsAdminPageProps {
  onBackToSite: () => void;
}

export const CmsAdminPage: React.FC<CmsAdminPageProps> = ({ onBackToSite }) => {
  const {
    heroSlides,
    newsItems,
    products,
    gallery,
    companyInfo,
    founderDesk,
    mapHubs,
    inquiries,
    stats,
    reviews,
    cloudConfig,
    isAdminAuthenticated,
    logoutAdmin,
    updateAdminPassword,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    updateNewsItem,
    addNewsItem,
    deleteNewsItem,
    updateStat,
    addStat,
    deleteStat,
    updateReview,
    addReview,
    deleteReview,
    updateProduct,
    addProduct,
    deleteProduct,
    updateGalleryItem,
    addGalleryItem,
    deleteGalleryItem,
    updateCompanyInfo,
    updateFounderDesk,
    updateMapHub,
    addMapHub,
    deleteMapHub,
    updateInquiryStatus,
    deleteInquiry,
    resetToDefaults,
    websiteIcon,
    updateWebsiteIcon,
    cataloguePdfUrl,
    cataloguePdfName,
    uploadCataloguePdf,
    removeCataloguePdf,
    downloadCatalogue,
    updateCloudConfig,
    syncToBackend
  } = useCms();

  type TabType = 
    | 'overview' 
    | 'slider' 
    | 'news' 
    | 'products' 
    | 'founder' 
    | 'reviews'
    | 'stats'
    | 'branding'
    | 'backend'
    | 'map' 
    | 'gallery' 
    | 'company' 
    | 'inquiries' 
    | 'security';

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Edit states
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isAddingSlide, setIsAddingSlide] = useState(false);

  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);

  const [editingHub, setEditingHub] = useState<MapHub | null>(null);
  const [isAddingHub, setIsAddingHub] = useState(false);

  // Reviews state
  const [editingReview, setEditingReview] = useState<CustomerReview | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);

  // Stats state
  const [editingStat, setEditingStat] = useState<StatItem | null>(null);
  const [isAddingStat, setIsAddingStat] = useState(false);

  // Cloud Database state
  const [cloudForm, setCloudForm] = useState<CloudDbConfig>(cloudConfig);
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [testingMongo, setTestingMongo] = useState(false);
  const [syncingServer, setSyncingServer] = useState(false);
  const [connectionStatusMsg, setConnectionStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [founderForm, setFounderForm] = useState<FounderDeskData>(founderDesk);
  const [companyForm, setCompanyForm] = useState<CompanyInfo>(companyInfo);

  // Keep form states synchronized with context updates
  React.useEffect(() => {
    setCompanyForm(companyInfo);
  }, [companyInfo]);

  React.useEffect(() => {
    setFounderForm(founderDesk);
  }, [founderDesk]);

  React.useEffect(() => {
    setCloudForm(cloudConfig);
  }, [cloudConfig]);

  // Security password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSecPass, setShowSecPass] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to handle local file upload from device
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          callback(event.target.result as string);
          showToast('Image uploaded from device successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
        alert('Please choose a valid PDF file.');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        alert('PDF size exceeds 20MB limit. Please upload an optimized PDF.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          uploadCataloguePdf(event.target.result as string, file.name);
          showToast(`Catalogue PDF "${file.name}" uploaded successfully!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveFounder = (e: React.FormEvent) => {
    e.preventDefault();
    updateFounderDesk(founderForm);
    if (founderForm.organization && founderForm.organization !== companyInfo.companyName) {
      updateCompanyInfo({
        ...companyInfo,
        companyName: founderForm.organization
      });
    }
    syncToBackend();
    showToast("Founder's Desk content & organization name updated successfully!");
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(companyForm);
    if (founderDesk.organization !== companyForm.companyName) {
      updateFounderDesk({
        ...founderDesk,
        organization: companyForm.companyName
      });
    }
    syncToBackend();
    showToast('Company details & contact info updated successfully!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    updateAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    showToast('Admin password changed successfully!');
  };

  return (
    <div className="min-h-screen bg-[#070A11] text-slate-100 pb-20 pt-20">
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono text-sm border border-cyan-500/40">
            CMS
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">
              Sanjog Website CMS Control Panel
            </h1>
            <span className="text-[11px] text-slate-400 font-mono">
              Live Content Management &middot; Real-time Local & Cloud Database Sync
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all website content back to initial factory catalog defaults?')) {
                resetToDefaults();
                showToast('Reset to original website defaults.');
              }
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-lg transition-all shadow-sm"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onBackToSite();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            title="Log out of Admin Panel"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 p-3.5 bg-emerald-950 border border-emerald-500/60 text-emerald-200 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-medium animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* Two-Column Dashboard Layout: Left Sidebar Navigation + Right Content Panel */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* LEFT SIDEBAR: Organized Navigation Options as <ul> and <li> */}
          <aside className="w-full lg:w-72 shrink-0 bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-xl lg:sticky lg:top-24 z-20">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                CMS Navigation
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                14 Modules
              </span>
            </div>

            {/* Organized Category Groups with <ul> and <li> */}
            <nav className="space-y-4 text-left">
              {[
                {
                  group: 'Live Content & Media',
                  items: [
                    { id: 'overview' as TabType, label: 'Overview', icon: LayoutDashboard },
                    { id: 'slider' as TabType, label: 'Hero Slider', count: heroSlides.length, icon: Sliders },
                    { id: 'news' as TabType, label: 'News Ticker', count: newsItems.length, icon: Megaphone },
                    { id: 'reviews' as TabType, label: 'Customer Reviews', count: reviews.length, icon: Star },
                    { id: 'stats' as TabType, label: 'Stats & Numbers (SS)', count: stats.length, icon: TrendingUp },
                  ]
                },
                {
                  group: 'Catalog & Products',
                  items: [
                    { id: 'products' as TabType, label: 'Products Catalog', count: products.length, icon: Package },
                    { id: 'gallery' as TabType, label: 'Project Gallery', count: gallery.length, icon: ImageIcon },
                    { id: 'branding' as TabType, label: 'Website Icon & PDF', icon: FileText },
                  ]
                },
                {
                  group: 'Company & Operations',
                  items: [
                    { id: 'founder' as TabType, label: "Founder's Desk", icon: UserCheck },
                    { id: 'company' as TabType, label: 'Company Info', icon: Building2 },
                    { id: 'map' as TabType, label: 'Map & Supply Hubs', count: mapHubs.length, icon: MapPin },
                    { id: 'inquiries' as TabType, label: 'Inquiries & Leads', count: inquiries.length, icon: Inbox },
                  ]
                },
                {
                  group: 'Database & Security',
                  items: [
                    { id: 'backend' as TabType, label: 'Backend & Cloud DB', icon: Database },
                    { id: 'security' as TabType, label: 'Admin Security', icon: Lock },
                  ]
                }
              ].map((section, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold px-2 block">
                    {section.group}
                  </span>
                  <ul className="space-y-0.5">
                    {section.items.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <li key={tab.id}>
                          <button
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                              isActive
                                ? 'bg-gradient-to-r from-cyan-500/20 to-lime-500/10 text-cyan-300 border border-cyan-500/40 font-semibold shadow-sm'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                              <span className="truncate">{tab.label}</span>
                            </div>
                            {tab.count !== undefined && (
                              <span className={`ml-2 px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                                isActive
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold'
                                  : 'bg-slate-950 text-slate-500'
                              }`}>
                                {tab.count}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Quick Live Sync Indicator */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Storage</span>
              </span>
              <button
                type="button"
                onClick={async () => {
                  const ok = await syncToBackend();
                  if (ok) showToast('Storage synchronized with backend!');
                  else showToast('Saved to local storage.');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] hover:underline"
              >
                Sync Now
              </button>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0 w-full space-y-6">

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-left">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 block">Catalog Products</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{products.length} Items</span>
                <span className="text-[11px] text-slate-400 mt-1 block">{products.filter(p => p.featured).length} Featured in Slider</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-lime-400 block">Hero Banners</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{heroSlides.length} Slides</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Framed & Auto Sliding</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-teal-400 block">Supply Hubs</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{mapHubs.length} Facilities</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Interactive Map & Depots</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs font-mono text-amber-400 block">Customer Inquiries</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">{inquiries.length} Requests</span>
                <span className="text-[11px] text-slate-400 mt-1 block">{inquiries.filter(i => i.status === 'New').length} New Pending</span>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <h3 className="text-base font-bold text-white font-display">
                Welcome to Sanjog CMS Engine
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Every element of your website is fully controllable from this dashboard: upload custom banner photos from your device, update product specs and featured status, edit the Founder's Desk speech & photo, add supply network locations on the interactive map, update ticker news, and review customer quotations.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('slider')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-cyan-300 rounded-xl border border-slate-700 transition-colors"
                >
                  Manage Hero Banners →
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-lime-400 rounded-xl border border-slate-700 transition-colors"
                >
                  Manage Products & Featured Images →
                </button>
                <button
                  onClick={() => setActiveTab('founder')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white rounded-xl border border-slate-700 transition-colors"
                >
                  Edit Founder's Desk →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. HERO SLIDER TAB */}
        {activeTab === 'slider' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Hero Section Carousel Slides
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update banner images, titles, badges, and upload custom photos directly from your phone or PC with instant high visibility.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingSlide({
                    id: `slide-${Date.now()}`,
                    badge: 'Certified Infrastructure Supply',
                    title: 'New High Mast or Barrier System',
                    highlightText: 'Engineered for Highways',
                    subtitle: 'Manufactured with high-tensile steel and heavy hot-dip galvanizing.',
                    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
                    primaryBtnText: 'View Product Details',
                    primaryBtnAction: 'products',
                    secondaryBtnText: 'Get Quote'
                  });
                  setIsAddingSlide(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Slide</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/8] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter brightness-95"
                      />
                      <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                        Slide #{index + 1}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-lime-400 block">{slide.badge}</span>
                      <h4 className="text-base font-bold text-white font-display mt-0.5">
                        {slide.title} <span className="text-cyan-400">{slide.highlightText}</span>
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setEditingSlide({ ...slide });
                        setIsAddingSlide(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Slide</span>
                    </button>
                    {heroSlides.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this hero slide?')) {
                            deleteHeroSlide(slide.id);
                            showToast('Hero slide deleted');
                          }
                        }}
                        className="p-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Edit Modal */}
            {editingSlide && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingSlide ? 'Add New Hero Slide' : 'Edit Hero Slide'}
                    </h3>
                    <button
                      onClick={() => setEditingSlide(null)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Device Image Upload Zone */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">
                      Banner Image (Upload from Device or enter URL)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800 rounded-xl cursor-pointer text-xs font-semibold transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setEditingSlide({ ...editingSlide, image: url }))}
                        />
                      </label>
                      <span className="text-xs text-slate-500">or enter image path / URL:</span>
                    </div>
                    <input
                      type="text"
                      value={editingSlide.image}
                      onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                      placeholder="e.g. /src/assets/images/... or https://..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                    {editingSlide.image && (
                      <div className="aspect-[16/7] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mt-2">
                        <img
                          src={editingSlide.image}
                          alt="Preview"
                          className="w-full h-full object-cover filter brightness-95"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Slide Badge (MoRTH / ISO Tag)
                      </label>
                      <input
                        type="text"
                        value={editingSlide.badge}
                        onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Highlighted Text
                      </label>
                      <input
                        type="text"
                        value={editingSlide.highlightText}
                        onChange={(e) => setEditingSlide({ ...editingSlide, highlightText: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Main Slide Title
                    </label>
                    <input
                      type="text"
                      value={editingSlide.title}
                      onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Subtitle / Product Summary
                    </label>
                    <textarea
                      rows={2}
                      value={editingSlide.subtitle}
                      onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isAddingSlide) {
                          addHeroSlide(editingSlide);
                          showToast('New slide created successfully!');
                        } else {
                          updateHeroSlide(editingSlide);
                          showToast('Slide updated successfully!');
                        }
                        setEditingSlide(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Slide
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. NEWS TICKER TAB */}
        {activeTab === 'news' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Live Marquee News Ticker
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Announcements, factory tender dispatches, and inventory updates scrolling across the website.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingNews({
                    id: `news-${Date.now()}`,
                    tag: 'TENDER UPDATE',
                    title: 'New national highway safety dispatch in progress from West Bengal Plant.',
                    date: 'Oct 2026'
                  });
                  setIsAddingNews(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add News Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
                        {item.tag}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{item.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200">
                      {item.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingNews({ ...item });
                        setIsAddingNews(false);
                      }}
                      className="p-2 text-cyan-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Edit Item"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    {newsItems.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this ticker update?')) {
                            deleteNewsItem(item.id);
                            showToast('News item deleted');
                          }
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* News Edit Modal */}
            {editingNews && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingNews ? 'Add Ticker Item' : 'Edit Ticker Item'}
                    </h3>
                    <button onClick={() => setEditingNews(null)} className="p-1 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Category Tag</label>
                    <input
                      type="text"
                      value={editingNews.tag}
                      onChange={(e) => setEditingNews({ ...editingNews, tag: e.target.value })}
                      placeholder="e.g. DISPATCH UPDATE / NEW STOCK"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Headline Text</label>
                    <textarea
                      rows={3}
                      value={editingNews.title}
                      onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      onClick={() => setEditingNews(null)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isAddingNews) {
                          addNewsItem(editingNews);
                          showToast('News ticker item added!');
                        } else {
                          updateNewsItem(editingNews);
                          showToast('News ticker item updated!');
                        }
                        setEditingNews(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Item
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Product Catalog ({products.length} Items)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toggle "Featured" to choose which items slide in the Homepage Featured Carousel. Upload photos directly from your device.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search product..."
                    className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={() => {
                    setEditingProduct({
                      id: `product-${Date.now()}`,
                      name: 'New Highway or Mining Product',
                      tagline: 'Precision Engineered Industrial Supply',
                      category: 'crash-barriers',
                      categoryLabel: 'Highway Crash Barriers',
                      image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
                      featured: true,
                      description: 'Manufactured with high-tensile steel, conforming to relevant Indian and international standards.',
                      keyFeatures: ['Hot-dip galvanized', 'Accredited NABL test certified', 'Factory direct pricing'],
                      specs: [
                        { label: 'Standard', value: 'MoRTH / IS' },
                        { label: 'Material', value: 'IS 2062 Fe410' }
                      ],
                      standards: ['IS 2062', 'MoRTH Section 811'],
                      certifications: ['ISO 9001:2015', 'NABL Certified'],
                      availability: 'In Production & Stock',
                      dimensions: 'Custom dimensions available',
                      materialGrade: 'High-Tensile Structural Steel'
                    });
                    setIsAddingProduct(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {products
                .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.categoryLabel.toLowerCase().includes(productSearch.toLowerCase()))
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover filter brightness-95"
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                          {product.categoryLabel}
                        </div>
                        <button
                          onClick={() => {
                            updateProduct({ ...product, featured: !product.featured });
                            showToast(product.featured ? 'Removed from featured slider' : 'Added to featured slider!');
                          }}
                          className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-all shadow-md ${
                            product.featured
                              ? 'bg-lime-400 text-slate-950 border border-white'
                              : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-700'
                          }`}
                          title="Click to toggle homepage featured slider"
                        >
                          {product.featured ? '★ Featured in Slider' : '☆ Not in Slider'}
                        </button>
                      </div>

                      <h4 className="text-base font-bold text-white font-display">
                        {product.name}
                      </h4>
                      <p className="text-xs text-lime-400 font-mono mt-0.5">
                        {product.tagline}
                      </p>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        {product.availability}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProduct({ ...product });
                            setIsAddingProduct(false);
                          }}
                          className="p-1.5 text-cyan-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-xs flex items-center gap-1"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product "${product.name}"?`)) {
                              deleteProduct(product.id);
                              showToast('Product deleted');
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingProduct ? 'Add Product to Catalog' : `Edit: ${editingProduct.name}`}
                    </h3>
                    <button onClick={() => setEditingProduct(null)} className="p-1 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Device Photo Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">
                      Product Photo (Upload from Device or enter URL)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800 rounded-xl cursor-pointer text-xs font-semibold">
                        <Upload className="w-4 h-4" />
                        <span>Upload Photo from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(e, (url) => setEditingProduct({ ...editingProduct, image: url }))}
                        />
                      </label>
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        placeholder="Image URL..."
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    {editingProduct.image && (
                      <div className="aspect-[16/9] max-w-xs rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                        <img src={editingProduct.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Product Title</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editingProduct.tagline}
                        onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Category Label</label>
                      <input
                        type="text"
                        value={editingProduct.categoryLabel}
                        onChange={(e) => setEditingProduct({ ...editingProduct, categoryLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Availability Status</label>
                      <select
                        value={editingProduct.availability}
                        onChange={(e) => setEditingProduct({ ...editingProduct, availability: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      >
                        <option value="In Production & Stock">In Production & Stock</option>
                        <option value="Immediate Dispatch">Immediate Dispatch</option>
                        <option value="Custom Fabrication">Custom Fabrication</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <input
                      type="checkbox"
                      id="featCheck"
                      checked={editingProduct.featured}
                      onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-cyan-400"
                    />
                    <label htmlFor="featCheck" className="text-xs text-slate-200 cursor-pointer font-medium">
                      Feature in Homepage Sliding Image Carousel
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Full Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isAddingProduct) {
                          addProduct(editingProduct);
                          showToast('Product added successfully!');
                        } else {
                          updateProduct(editingProduct);
                          showToast('Product updated successfully!');
                        }
                        setEditingProduct(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Product
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. FOUNDER'S DESK TAB */}
        {activeTab === 'founder' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Founder's Desk Content & Photo
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Update the founder's message, inspirational quote, and upload the founder's portrait directly from your device.
              </p>
            </div>

            <form onSubmit={handleSaveFounder} className="space-y-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
              {/* Photo Upload Zone */}
              <div className="space-y-3 pb-4 border-b border-slate-800">
                <label className="text-xs font-medium text-slate-300 block">
                  Founder's Photo
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-28 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0">
                    <img
                      src={founderForm.image || '/src/assets/images/sanjog_founder_portrait_1791294725163.jpg'}
                      alt="Founder"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-800 rounded-xl cursor-pointer text-xs font-semibold">
                      <Upload className="w-4 h-4" />
                      <span>Upload Founder Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => setFounderForm({ ...founderForm, image: url }))}
                      />
                    </label>
                    <input
                      type="text"
                      value={founderForm.image}
                      onChange={(e) => setFounderForm({ ...founderForm, image: e.target.value })}
                      placeholder="Image URL or Path..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Founder's Full Name</label>
                  <input
                    type="text"
                    required
                    value={founderForm.name}
                    onChange={(e) => setFounderForm({ ...founderForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Corporate Designation</label>
                  <input
                    type="text"
                    required
                    value={founderForm.designation}
                    onChange={(e) => setFounderForm({ ...founderForm, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={founderForm.organization || companyInfo.companyName || 'Sanjog'}
                    onChange={(e) => setFounderForm({ ...founderForm, organization: e.target.value })}
                    placeholder="e.g. Sanjog"
                    className="w-full px-3 py-2 bg-slate-950 border border-cyan-500/50 rounded-xl text-xs text-cyan-300 font-bold"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Shown beside designation</span>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Years of Experience</label>
                  <input
                    type="text"
                    value={founderForm.experienceYears}
                    onChange={(e) => setFounderForm({ ...founderForm, experienceYears: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Section Badge</label>
                <input
                  type="text"
                  value={founderForm.badge}
                  onChange={(e) => setFounderForm({ ...founderForm, badge: e.target.value })}
                  placeholder="e.g. From the Founder's Desk"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Founder's Lead Quote / Headline</label>
                <textarea
                  rows={2}
                  required
                  value={founderForm.quoteTitle}
                  onChange={(e) => setFounderForm({ ...founderForm, quoteTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Founder's Words: Paragraph 1</label>
                  <textarea
                    rows={4}
                    value={founderForm.paragraph1}
                    onChange={(e) => setFounderForm({ ...founderForm, paragraph1: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Founder's Words: Paragraph 2</label>
                  <textarea
                    rows={4}
                    value={founderForm.paragraph2}
                    onChange={(e) => setFounderForm({ ...founderForm, paragraph2: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Key Operational Motto</label>
                <input
                  type="text"
                  value={founderForm.keyMotto}
                  onChange={(e) => setFounderForm({ ...founderForm, keyMotto: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white italic"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Founder's Desk Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. CUSTOMER REVIEWS & FEEDBACK TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Customer Reviews & Feedback ({reviews.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage contractor testimonials, star ratings, and project remarks displayed in the homepage carousel.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingReview({
                    id: `rev-${Date.now()}`,
                    clientName: '',
                    designation: '',
                    company: '',
                    projectScope: '',
                    rating: 5,
                    reviewText: ''
                  });
                  setIsAddingReview(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Customer Review</span>
              </button>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (rev.rating || 5)
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-slate-800 text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-amber-400 font-mono ml-1">
                          {rev.rating || 5}.0 Stars
                        </span>
                      </div>

                      {rev.projectScope && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 truncate max-w-[180px]">
                          {rev.projectScope}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                      "{rev.reviewText}"
                    </p>

                    <div className="pt-2 border-t border-slate-800 text-xs">
                      <span className="font-semibold text-white block">{rev.clientName}</span>
                      <span className="text-slate-400">
                        {rev.designation} &middot; <strong className="text-cyan-400">{rev.company}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => {
                        setEditingReview(rev);
                        setIsAddingReview(false);
                      }}
                      className="p-1.5 text-xs text-cyan-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 px-2.5"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete review from ${rev.clientName}?`)) {
                          deleteReview(rev.id);
                          showToast('Review deleted.');
                        }
                      }}
                      className="p-1.5 text-xs text-rose-400 hover:text-white bg-slate-950 hover:bg-rose-950/60 rounded-lg transition-colors flex items-center gap-1 px-2.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Add / Edit Review */}
            {editingReview && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingReview ? 'Add New Customer Feedback' : 'Edit Customer Feedback'}
                    </h3>
                    <button
                      onClick={() => setEditingReview(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Client / Engineer Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingReview.clientName}
                        onChange={(e) => setEditingReview({ ...editingReview, clientName: e.target.value })}
                        placeholder="e.g. R. K. Agarwal"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Designation / Role *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingReview.designation}
                        onChange={(e) => setEditingReview({ ...editingReview, designation: e.target.value })}
                        placeholder="e.g. Chief Project Engineer"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Company / Contractor *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingReview.company}
                        onChange={(e) => setEditingReview({ ...editingReview, company: e.target.value })}
                        placeholder="e.g. National Highway EPC Works"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">
                        Project Scope / Reference
                      </label>
                      <input
                        type="text"
                        value={editingReview.projectScope}
                        onChange={(e) => setEditingReview({ ...editingReview, projectScope: e.target.value })}
                        placeholder="e.g. NH-16 Expressway Stretch (45 km)"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Star Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEditingReview({ ...editingReview, rating: star })}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            editingReview.rating === star
                              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${editingReview.rating >= star ? 'fill-current' : ''}`} />
                          <span>{star} Star{star > 1 ? 's' : ''}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Review Quotation Text *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={editingReview.reviewText}
                      onChange={(e) => setEditingReview({ ...editingReview, reviewText: e.target.value })}
                      placeholder="Write the contractor's feedback on Sanjog materials, delivery speed, or test certificates..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white resize-none"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      onClick={() => setEditingReview(null)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!editingReview.clientName || !editingReview.reviewText) {
                          alert('Please fill in client name and review text.');
                          return;
                        }
                        if (isAddingReview) {
                          addReview(editingReview);
                          showToast('Review added successfully!');
                        } else {
                          updateReview(editingReview);
                          showToast('Review updated successfully!');
                        }
                        setEditingReview(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. STATS & NUMBERS (SS) TAB */}
        {activeTab === 'stats' && (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Stats, Milestones & Performance Numbers ({stats.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update the milestone numbers shown under "Trusted by Highway & Mining Contractors" section.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingStat({
                    id: `stat-${Date.now()}`,
                    number: '500+ KM',
                    label: 'New Project Metric',
                    description: 'Tested and certified MoRTH delivery'
                  });
                  setIsAddingStat(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-md self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Stat Number</span>
              </button>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
                >
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-lime-400 font-display">
                      {stat.number}
                    </div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {stat.label}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => {
                        setEditingStat(stat);
                        setIsAddingStat(false);
                      }}
                      className="p-1.5 text-xs text-cyan-400 hover:text-white bg-slate-950 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 px-2.5"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete stat metric "${stat.label}"?`)) {
                          deleteStat(stat.id);
                          showToast('Stat metric deleted.');
                        }
                      }}
                      className="p-1.5 text-xs text-rose-400 hover:text-white bg-slate-950 hover:bg-rose-950/60 rounded-lg transition-colors flex items-center gap-1 px-2.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Add / Edit Stat */}
            {editingStat && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingStat ? 'Add New Performance Stat' : 'Edit Performance Stat'}
                    </h3>
                    <button
                      onClick={() => setEditingStat(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Display Number / Count (SS) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingStat.number}
                      onChange={(e) => setEditingStat({ ...editingStat, number: e.target.value })}
                      placeholder="e.g. 1,200+ KM or 3,800+ or 100%"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Metric Title / Label *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingStat.label}
                      onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                      placeholder="e.g. Crash Barriers Installed"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Description / Subtext
                    </label>
                    <input
                      type="text"
                      value={editingStat.description}
                      onChange={(e) => setEditingStat({ ...editingStat, description: e.target.value })}
                      placeholder="e.g. MoRTH Section 811 compliant hot-dip galvanized highway supply"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      onClick={() => setEditingStat(null)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!editingStat.number || !editingStat.label) {
                          alert('Please fill in number and label.');
                          return;
                        }
                        if (isAddingStat) {
                          addStat(editingStat);
                          showToast('Stat metric added!');
                        } else {
                          updateStat(editingStat);
                          showToast('Stat metric updated!');
                        }
                        setEditingStat(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Stat
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. BRANDING & PDF CATALOG TAB */}
        {activeTab === 'branding' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Website Icon & PDF Catalog Management
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload your custom website icon (favicon & logo emblem) and your official company brochure PDF for visitors to download.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Website Icon / Favicon (Transparent PNG Supported) */}
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Website Icon & Nav Logo (PNG Transparent)</h3>
                    <p className="text-[11px] text-slate-400">Controls browser tab favicon, header navigation emblem, and footer logo</p>
                  </div>
                </div>

                {/* Transparency Preview Card */}
                <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                  <div 
                    className="w-16 h-16 rounded-2xl overflow-hidden border border-cyan-500/40 p-1 shrink-0 flex items-center justify-center shadow-lg relative"
                    style={{
                      backgroundImage: 'repeating-conic-gradient(#1e293b 0% 25%, #0f172a 0% 50%)',
                      backgroundSize: '12px 12px'
                    }}
                  >
                    <img
                      src={websiteIcon}
                      alt="Sajog Website Icon"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-white block">Active Website Logo / Icon</span>
                    <span className="text-[11px] text-lime-400 font-mono block">Supports Transparent PNG (Without BG)</span>
                    <span className="text-[10px] text-slate-400 font-mono block">Automatically updates browser tab & navigation header</span>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 font-bold rounded-xl cursor-pointer text-xs transition-colors shadow-md">
                    <Upload className="w-4 h-4" />
                    <span>Upload Transparent PNG Icon from Device</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, (url) => {
                        updateWebsiteIcon(url);
                        showToast('Website icon & browser favicon updated with transparent PNG!');
                      })}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      updateWebsiteIcon('/src/assets/images/sanjog_logo_3d_1791291627051.jpg');
                      showToast('Website icon reset to original 3D emblem.');
                    }}
                    className="w-full py-2 text-xs text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
                  >
                    Reset to Default 3D Emblem
                  </button>
                </div>
              </div>

              {/* Card 2: Company PDF Catalog */}
              <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Official PDF Catalogue</h3>
                    <p className="text-[11px] text-slate-400">Visitors download this PDF from footer and buttons</p>
                  </div>
                </div>

                {/* Status Box */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Current PDF Status:</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      cataloguePdfUrl 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {cataloguePdfUrl ? 'Custom PDF Active' : 'Default Catalog Active'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono truncate">
                    File: <strong>{cataloguePdfName || 'Sajog_Product_Catalog.pdf'}</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    When viewers click "Download Catalog" anywhere on the site, this PDF file will be delivered directly to their device.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 font-bold rounded-xl cursor-pointer text-xs transition-colors shadow-md">
                    <Upload className="w-4 h-4" />
                    <span>Upload Catalogue PDF from Device</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handlePdfUpload}
                    />
                  </label>

                  <div className="flex items-center gap-2">
                    {cataloguePdfUrl && (
                      <button
                        type="button"
                        onClick={downloadCatalogue}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-cyan-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Test Download</span>
                      </button>
                    )}

                    {cataloguePdfUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Remove uploaded PDF? The site will fallback to interactive dossier catalog.')) {
                            removeCataloguePdf();
                            showToast('Custom PDF removed.');
                          }
                        }}
                        className="px-3 py-2 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-xl transition-colors"
                      >
                        Remove PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 8. BACKEND & CLOUD DATABASE TAB (Supabase / MongoDB) */}
        {activeTab === 'backend' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Backend & Cloud Database Integration</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect your Sajog website to free cloud platforms like Supabase (Free Postgres) or MongoDB Atlas (Free M0 Cluster) for cloud database persistence.
              </p>
            </div>

            {/* Connection Status Banner */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white font-display block">
                    Express Backend Server Status: Active & Syncing
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Local persistent storage: <code className="text-cyan-400">/api/cms/sync</code> &middot; Disk persistence enabled
                  </span>
                </div>
              </div>

              <button
                disabled={syncingServer}
                onClick={async () => {
                  setSyncingServer(true);
                  const ok = await syncToBackend();
                  setSyncingServer(false);
                  if (ok) {
                    showToast('All website content synced to backend server storage!');
                    setConnectionStatusMsg({
                      type: 'success',
                      text: `Successfully synced to backend at ${new Date().toLocaleTimeString()}`
                    });
                  } else {
                    setConnectionStatusMsg({
                      type: 'error',
                      text: 'Backend sync notice: Changes are saved in local browser storage.'
                    });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md self-start sm:self-auto disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncingServer ? 'animate-spin' : ''}`} />
                <span>{syncingServer ? 'Syncing...' : 'Sync to Backend Now'}</span>
              </button>
            </div>

            {connectionStatusMsg && (
              <div className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
                connectionStatusMsg.type === 'success'
                  ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-950/70 border border-amber-500/50 text-amber-300'
              }`}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{connectionStatusMsg.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Option 1: Supabase (Free Tier PostgreSQL) */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-display">Supabase (Free Tier)</h3>
                      <span className="text-[11px] text-emerald-400 font-mono">Free PostgreSQL & Instant REST API</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                    RECOMMENDED
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Supabase Project URL
                    </label>
                    <input
                      type="url"
                      value={cloudForm.supabaseUrl}
                      onChange={(e) => setCloudForm({ ...cloudForm, supabaseUrl: e.target.value })}
                      placeholder="https://yourproject.supabase.co"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono placeholder-slate-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Supabase Anon / Public API Key
                    </label>
                    <input
                      type="password"
                      value={cloudForm.supabaseAnonKey}
                      onChange={(e) => setCloudForm({ ...cloudForm, supabaseAnonKey: e.target.value })}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono placeholder-slate-600"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      disabled={testingSupabase}
                      onClick={async () => {
                        if (!cloudForm.supabaseUrl || !cloudForm.supabaseAnonKey) {
                          alert('Please enter your Supabase URL and Anon Key first.');
                          return;
                        }
                        setTestingSupabase(true);
                        try {
                          const res = await fetch('/api/cms/test-supabase', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              url: cloudForm.supabaseUrl,
                              anonKey: cloudForm.supabaseAnonKey
                            })
                          });
                          const data = await res.json();
                          if (data.success) {
                            showToast('Supabase connection verified successfully!');
                            updateCloudConfig({
                              ...cloudForm,
                              provider: 'supabase'
                            });
                          } else {
                            alert(`Connection error: ${data.message}`);
                          }
                        } catch (err: any) {
                          alert(`Connection failed: ${err.message}`);
                        } finally {
                          setTestingSupabase(false);
                        }
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {testingSupabase ? 'Testing Connection...' : 'Test Supabase Connection'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateCloudConfig({
                          ...cloudForm,
                          provider: 'supabase'
                        });
                        showToast('Supabase settings saved!');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
                    >
                      Save Supabase Settings
                    </button>
                  </div>

                  {/* Supabase Free Table SQL Helper */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1.5 font-mono text-slate-400">
                    <span className="text-slate-300 font-semibold block">Free Supabase SQL Table Setup:</span>
                    <pre className="text-[10px] text-cyan-300 overflow-x-auto p-2 bg-slate-900 rounded-lg">
{`create table if not exists sajog_cms (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Option 2: MongoDB Atlas (Free M0 Cluster) */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center font-bold">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-display">MongoDB Atlas (Free M0)</h3>
                      <span className="text-[11px] text-green-400 font-mono">Free Cloud Document Database</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                    FREE TIER
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      MongoDB Connection URI
                    </label>
                    <input
                      type="text"
                      value={cloudForm.mongoUri}
                      onChange={(e) => setCloudForm({ ...cloudForm, mongoUri: e.target.value })}
                      placeholder="mongodb+srv://username:password@cluster0.mongodb.net/sajog_cms"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono placeholder-slate-600"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      type="button"
                      disabled={testingMongo}
                      onClick={async () => {
                        if (!cloudForm.mongoUri) {
                          alert('Please enter your MongoDB URI first.');
                          return;
                        }
                        setTestingMongo(true);
                        try {
                          const res = await fetch('/api/cms/test-mongodb', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ uri: cloudForm.mongoUri })
                          });
                          const data = await res.json();
                          if (data.success) {
                            showToast(data.message);
                            updateCloudConfig({
                              ...cloudForm,
                              provider: 'mongodb'
                            });
                          } else {
                            alert(data.message);
                          }
                        } catch (err: any) {
                          alert(`Validation failed: ${err.message}`);
                        } finally {
                          setTestingMongo(false);
                        }
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-green-300 bg-green-950/60 hover:bg-green-900/80 border border-green-800 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {testingMongo ? 'Validating URI...' : 'Validate MongoDB URI'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateCloudConfig({
                          ...cloudForm,
                          provider: 'mongodb'
                        });
                        showToast('MongoDB settings saved!');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-slate-950 bg-green-400 hover:bg-green-300 rounded-xl transition-colors"
                    >
                      Save MongoDB Settings
                    </button>
                  </div>

                  {/* MongoDB Setup Instructions */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                    <span className="text-slate-300 font-semibold block">How to setup Free MongoDB Atlas:</span>
                    <ol className="list-decimal list-inside space-y-0.5 text-[10px]">
                      <li>Sign up free at <strong className="text-white">mongodb.com/atlas</strong>.</li>
                      <li>Deploy a free Shared M0 Cluster (512MB storage forever).</li>
                      <li>Copy the connection string (SRV URI) and paste it above.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete JSON Snapshot Backup Card */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Full Website Data Snapshot & JSON Export
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Download a complete backup of all products, reviews, slides, and settings in one portable JSON file.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const fullBackup = {
                      companyName: 'Sajog',
                      exportedAt: new Date().toISOString(),
                      heroSlides,
                      newsItems,
                      products,
                      gallery,
                      companyInfo,
                      founderDesk,
                      mapHubs,
                      stats,
                      reviews,
                      websiteIcon
                    };
                    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Sajog_Website_Backup_${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    showToast('Full backup downloaded!');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 9. MAP & HUBS TAB */}
        {activeTab === 'map' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Interactive Map Locations & Supply Hubs
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pins displayed on the Interactive Pan-India Map in Contact Us and Home Page.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingHub({
                    id: `hub-${Date.now()}`,
                    name: 'New Regional Highway Supply Depot',
                    state: 'West Bengal',
                    type: 'Regional Depot',
                    coordinates: { x: 70, y: 50 },
                    capacity: 'Ready stock of W-Beam barriers & fasteners',
                    contact: '+91 98300-12345',
                    description: 'Direct site trailer dispatch within 24 hours.'
                  });
                  setIsAddingHub(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Supply Hub</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mapHubs.map((hub) => (
                <div
                  key={hub.id}
                  className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {hub.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Coordinates: ({hub.coordinates.x}%, {hub.coordinates.y}%)
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-display">
                      {hub.name}
                    </h4>
                    <p className="text-xs text-lime-400 font-mono">
                      State: {hub.state} &middot; Contact: {hub.contact}
                    </p>
                    <p className="text-xs text-slate-300">
                      {hub.description}
                    </p>
                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Capacity: <span className="text-white">{hub.capacity}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingHub({ ...hub });
                        setIsAddingHub(false);
                      }}
                      className="px-3 py-1.5 text-xs text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Hub</span>
                    </button>
                    {mapHubs.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete hub "${hub.name}"?`)) {
                            deleteMapHub(hub.id);
                            showToast('Map hub deleted');
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Hub Edit Modal */}
            {editingHub && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingHub ? 'Add Map Hub' : 'Edit Map Hub'}
                    </h3>
                    <button onClick={() => setEditingHub(null)} className="p-1 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Facility Name</label>
                    <input
                      type="text"
                      value={editingHub.name}
                      onChange={(e) => setEditingHub({ ...editingHub, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">State</label>
                      <input
                        type="text"
                        value={editingHub.state}
                        onChange={(e) => setEditingHub({ ...editingHub, state: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Type</label>
                      <select
                        value={editingHub.type}
                        onChange={(e) => setEditingHub({ ...editingHub, type: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      >
                        <option value="Factory & Galvanizing">Factory & Galvanizing</option>
                        <option value="Corporate Office">Corporate Office</option>
                        <option value="Supply Depot">Supply Depot</option>
                        <option value="Major Corridor">Major Corridor</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Map Position X % (0-100)</label>
                      <input
                        type="number"
                        min="10"
                        max="90"
                        value={editingHub.coordinates.x}
                        onChange={(e) => setEditingHub({
                          ...editingHub,
                          coordinates: { ...editingHub.coordinates, x: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Map Position Y % (0-100)</label>
                      <input
                        type="number"
                        min="10"
                        max="90"
                        value={editingHub.coordinates.y}
                        onChange={(e) => setEditingHub({
                          ...editingHub,
                          coordinates: { ...editingHub.coordinates, y: Number(e.target.value) }
                        })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Monthly Capacity & Features</label>
                    <input
                      type="text"
                      value={editingHub.capacity}
                      onChange={(e) => setEditingHub({ ...editingHub, capacity: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Contact Phone / Email</label>
                    <input
                      type="text"
                      value={editingHub.contact}
                      onChange={(e) => setEditingHub({ ...editingHub, contact: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button onClick={() => setEditingHub(null)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isAddingHub) {
                          addMapHub(editingHub);
                          showToast('Map hub added!');
                        } else {
                          updateMapHub(editingHub);
                          showToast('Map hub updated!');
                        }
                        setEditingHub(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Hub
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Project & Plant Photo Gallery
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload factory manufacturing and national highway installation site photos.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingGallery({
                    id: `gal-${Date.now()}`,
                    title: 'W-Beam Installation Along Expressway Stretch',
                    category: 'barriers',
                    categoryLabel: 'Highway Crash Barriers',
                    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
                    location: 'National Highway Corridor',
                    description: 'Finished installation with C-posts and spacer blocks conforming to MoRTH Section 811.'
                  });
                  setIsAddingGallery(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Gallery Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 mb-3">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-slate-950/85 px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                        {item.categoryLabel}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-white font-display">{item.title}</h4>
                    <p className="text-xs text-lime-400 font-mono mt-0.5">{item.location}</p>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingGallery({ ...item });
                        setIsAddingGallery(false);
                      }}
                      className="px-3 py-1.5 text-xs text-cyan-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete photo?')) {
                          deleteGalleryItem(item.id);
                          showToast('Photo removed');
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Edit Modal */}
            {editingGallery && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h3 className="text-lg font-bold text-white font-display">
                      {isAddingGallery ? 'Add Gallery Item' : 'Edit Gallery Item'}
                    </h3>
                    <button onClick={() => setEditingGallery(null)} className="p-1 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300 block">Photo (Upload from device or enter URL)</label>
                    <label className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-950/80 text-cyan-300 border border-cyan-800 rounded-xl cursor-pointer text-xs font-semibold">
                      <Upload className="w-4 h-4" />
                      <span>Upload Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, (url) => setEditingGallery({ ...editingGallery, image: url }))}
                      />
                    </label>
                    <input
                      type="text"
                      value={editingGallery.image}
                      onChange={(e) => setEditingGallery({ ...editingGallery, image: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Title</label>
                    <input
                      type="text"
                      value={editingGallery.title}
                      onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Location</label>
                      <input
                        type="text"
                        value={editingGallery.location}
                        onChange={(e) => setEditingGallery({ ...editingGallery, location: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Category</label>
                      <input
                        type="text"
                        value={editingGallery.categoryLabel}
                        onChange={(e) => setEditingGallery({ ...editingGallery, categoryLabel: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-3 border-t border-slate-800">
                    <button onClick={() => setEditingGallery(null)} className="px-4 py-2 text-xs text-slate-400 hover:text-white">
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isAddingGallery) {
                          addGalleryItem(editingGallery);
                          showToast('Gallery photo added!');
                        } else {
                          updateGalleryItem(editingGallery);
                          showToast('Gallery photo updated!');
                        }
                        setEditingGallery(null);
                      }}
                      className="px-5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl"
                    >
                      Save Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. COMPANY INFO TAB */}
        {activeTab === 'company' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Company & Contact Information
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Official company details, telephone numbers, emails, addresses, and registration metrics.
              </p>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    value={companyForm.companyName}
                    onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Company Tagline</label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Primary Phone Number(s)</label>
                  <input
                    type="text"
                    value={companyForm.phone}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Sales & WhatsApp Helpline</label>
                  <input
                    type="text"
                    value={companyForm.salesPhone}
                    onChange={(e) => setCompanyForm({ ...companyForm, salesPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Inquiry / Sales Email</label>
                  <input
                    type="email"
                    value={companyForm.inquiryEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, inquiryEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Support / Dispatch Email</label>
                  <input
                    type="email"
                    value={companyForm.supportEmail}
                    onChange={(e) => setCompanyForm({ ...companyForm, supportEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Headquarters Address</label>
                <input
                  type="text"
                  value={companyForm.headquarters}
                  onChange={(e) => setCompanyForm({ ...companyForm, headquarters: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Crash Barriers Metric</label>
                  <input
                    type="text"
                    value={companyForm.metricBarriers}
                    onChange={(e) => setCompanyForm({ ...companyForm, metricBarriers: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-lime-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">High Masts Metric</label>
                  <input
                    type="text"
                    value={companyForm.metricHighMasts}
                    onChange={(e) => setCompanyForm({ ...companyForm, metricHighMasts: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Clients Metric</label>
                  <input
                    type="text"
                    value={companyForm.metricClients}
                    onChange={(e) => setCompanyForm({ ...companyForm, metricClients: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Standards</label>
                  <input
                    type="text"
                    value={companyForm.metricStandards}
                    onChange={(e) => setCompanyForm({ ...companyForm, metricStandards: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Company Information</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 9. INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 text-left">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Client Quotation Requests ({inquiries.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Incoming leads from Contact Us and Product Inquiry submissions.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-2">
                <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">No quotation inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-950 text-cyan-300 border border-slate-800 font-semibold">
                          Ticket: {inq.ticketId}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{inq.date}</span>
                        <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-semibold ${
                          inq.status === 'New'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : inq.status === 'Quoted'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {inq.status}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white">
                        {inq.name} &middot; <span className="text-slate-400 font-normal">{inq.company}</span>
                      </h4>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300 font-mono">
                        <span>Product: <strong className="text-lime-400">{inq.product}</strong></span>
                        <span>Phone: <strong className="text-white">{inq.phone}</strong></span>
                        <span>Email: <strong className="text-white">{inq.email}</strong></span>
                        {inq.cityState && <span>Location: <strong>{inq.cityState}</strong></span>}
                      </div>

                      {inq.message && (
                        <p className="text-xs text-slate-400 pt-1 italic">
                          "{inq.message}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={inq.status}
                        onChange={(e) => {
                          updateInquiryStatus(inq.id, e.target.value as any);
                          showToast('Inquiry status updated');
                        }}
                        className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value="New">Status: New</option>
                        <option value="In Progress">Status: In Progress</option>
                        <option value="Quoted">Status: Quoted</option>
                        <option value="Completed">Status: Completed</option>
                      </select>

                      <button
                        onClick={() => {
                          if (window.confirm('Delete this inquiry?')) {
                            deleteInquiry(inq.id);
                            showToast('Inquiry deleted');
                          }
                        }}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 10. SECURITY & PASSWORD TAB */}
        {activeTab === 'security' && (
          <div className="space-y-6 text-left max-w-xl">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Admin Authentication & Password
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The CMS admin panel is accessed only by clicking the hidden &copy; symbol in the footer. You can update your secret password here.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7">
              <div className="p-3.5 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-cyan-200 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Current Default ID is <strong>admin</strong>. To secure your CMS, enter a new secret password below.
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  New Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showSecPass ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecPass(!showSecPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showSecPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showSecPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-xl shadow-md"
                >
                  Update Secret Password
                </button>
              </div>
            </form>
          </div>
        )}

          </main>
        </div>
      </div>
    </div>
  );
};
