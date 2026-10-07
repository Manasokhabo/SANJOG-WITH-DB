import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  GalleryItem, 
  Metric, 
  SANJOG_PRODUCTS as defaultProducts, 
  SANJOG_GALLERY as defaultGallery, 
  SANJOG_METRICS as defaultMetrics,
  COMPANY_DOSSIER as defaultDossier
} from '../data/companyData';

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlightText: string;
  subtitle: string;
  image: string;
  primaryBtnText: string;
  primaryBtnAction: 'products' | 'contact' | 'gallery';
  secondaryBtnText: string;
}

export interface NewsItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  linkText?: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  description: string;
}

export interface CustomerReview {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  projectScope: string;
  rating: number; // 1 to 5
  reviewText: string;
}

export interface InquiryItem {
  id: string;
  ticketId: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  product: string;
  cityState: string;
  quantity: string;
  message: string;
  date: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Completed';
}

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  phone: string;
  salesPhone: string;
  inquiryEmail: string;
  supportEmail: string;
  headquarters: string;
  regionalOffices: string;
  registrationNo: string;
  metricBarriers: string;
  metricHighMasts: string;
  metricClients: string;
  metricStandards: string;
  mapEmbedUrl: string;
  googleMapQuery: string;
}

export interface FounderDeskData {
  name: string;
  designation: string;
  organization?: string;
  badge: string;
  image: string;
  quoteTitle: string;
  paragraph1: string;
  paragraph2: string;
  signatureName: string;
  experienceYears: string;
  keyMotto: string;
}

export interface MapHub {
  id: string;
  name: string;
  state: string;
  type: 'Corporate Office' | 'Regional Depot' | 'Supply Center';
  coordinates: { x: number; y: number };
  capacity: string;
  contact: string;
  description: string;
}

export interface CloudDbConfig {
  provider: 'none' | 'supabase' | 'mongodb';
  supabaseUrl: string;
  supabaseAnonKey: string;
  mongoUri: string;
  lastSyncedAt?: string;
}

interface CmsContextType {
  // Data
  heroSlides: HeroSlide[];
  newsItems: NewsItem[];
  products: Product[];
  gallery: GalleryItem[];
  companyInfo: CompanyInfo;
  founderDesk: FounderDeskData;
  mapHubs: MapHub[];
  inquiries: InquiryItem[];
  stats: StatItem[];
  reviews: CustomerReview[];
  cloudConfig: CloudDbConfig;

  // Website Icon & Catalogue PDF
  websiteIcon: string;
  updateWebsiteIcon: (iconUrl: string) => void;
  cataloguePdfUrl: string | null;
  cataloguePdfName: string;
  uploadCataloguePdf: (pdfDataUrl: string, name: string) => void;
  removeCataloguePdf: () => void;
  downloadCatalogue: () => void;

  // Cloud & Backend
  updateCloudConfig: (cfg: CloudDbConfig) => void;
  syncToBackend: () => Promise<boolean>;

  // Auth State
  isAdminAuthenticated: boolean;
  loginAdmin: (id: string, pass: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => void;

  // Mutations
  updateHeroSlide: (slide: HeroSlide) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (id: string) => void;

  updateNewsItem: (item: NewsItem) => void;
  addNewsItem: (item: Omit<NewsItem, 'id'>) => void;
  deleteNewsItem: (id: string) => void;

  updateStat: (stat: StatItem) => void;
  addStat: (stat: Omit<StatItem, 'id'>) => void;
  deleteStat: (id: string) => void;

  updateReview: (review: CustomerReview) => void;
  addReview: (review: Omit<CustomerReview, 'id'>) => void;
  deleteReview: (id: string) => void;

  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  updateGalleryItem: (item: GalleryItem) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  updateCompanyInfo: (info: CompanyInfo) => void;
  updateFounderDesk: (data: FounderDeskData) => void;
  updateMapHub: (hub: MapHub) => void;
  addMapHub: (hub: MapHub) => void;
  deleteMapHub: (id: string) => void;

  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'ticketId' | 'date' | 'status'>) => string;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => void;
  deleteInquiry: (id: string) => void;

  resetToDefaults: () => void;
}

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'MoRTH Section 811 & AASHTO M180 Certified',
    title: 'Highway Crash Barriers & Safety Systems',
    highlightText: 'Engineered for Maximum Impact Containment',
    subtitle: 'Direct manufacturing of hot-dip galvanized W-Beam and Thrie-Beam crash barriers with ≥ 550 g/m² zinc coating for national expressways and flyovers.',
    image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg',
    primaryBtnText: 'View Crash Barrier Catalog',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Request Factory Pricing'
  },
  {
    id: 'slide-2',
    badge: 'Heavy-Duty 12m to 35m Polygonal Poles',
    title: 'High Mast Lighting Octagonal Towers',
    highlightText: 'With Motorized Raising & Lowering Winch',
    subtitle: 'Continuously tapered octagonal high mast lighting poles engineered for wind speeds up to 180 km/h, illuminating expressway toll plazas, junctions, and yards.',
    image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg',
    primaryBtnText: 'Explore Lighting Towers',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Get Mast Quotation'
  },
  {
    id: 'slide-3',
    badge: 'High-Penetration Quarry & Mining Tooling',
    title: 'Mining Drill Rods & Rock Drill Machines',
    highlightText: 'Carburized Alloy Hollow Steel',
    subtitle: 'Tungsten carbide tipped (TCT) chisel drill rods, hollow alloy mining steels, and pneumatic sinker rock drills designed for rapid blast hole penetration in hard granite.',
    image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg',
    primaryBtnText: 'View Mining Products',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Enquire Bulk Rates'
  },
  {
    id: 'slide-4',
    badge: 'Civil Machinery & Road Safety Delineation',
    title: 'Concrete Mixers, Road Marking & Fencing',
    highlightText: 'Ready Stock for Urgent Site Dispatch',
    subtitle: '10/7 CFT hydraulic batch concrete mixers, flexible needle poker vibrators, solar LED road studs, reflective thermoplastic paint, and heavy perimeter chainlink fencing.',
    image: '/src/assets/images/sanjog_gallery_factory_1791292902900.jpg',
    primaryBtnText: 'See All 16 Products',
    primaryBtnAction: 'products',
    secondaryBtnText: 'Download Full Catalog'
  }
];

const DEFAULT_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    tag: 'TENDER DISPATCH',
    title: 'Over 85 Kilometers of W-Beam Crash Barriers successfully dispatched for National Highway NH-16 Package',
    date: 'Oct 2026'
  },
  {
    id: 'news-2',
    tag: 'PRODUCTION UPDATE',
    title: 'Continuous structural hot-dip galvanizing bath in operation with minimum 550 g/m² zinc coating verification',
    date: 'Oct 2026'
  },
  {
    id: 'news-3',
    tag: 'READY INVENTORY',
    title: 'Immediate stock available: 30m High Mast Lighting Towers, Solar Road Studs (ADC12), and TCT Mining Drill Rods',
    date: 'Oct 2026'
  },
  {
    id: 'news-4',
    tag: 'QUALITY AUDIT',
    title: 'All current batches certified compliant with MoRTH Section 811 & 803 and IS 2062 by accredited NABL testing facility',
    date: 'Oct 2026'
  }
];

const DEFAULT_STATS: StatItem[] = [
  {
    id: 'stat-1',
    number: '1,200+ KM',
    label: 'Crash Barriers Installed',
    description: 'MoRTH Section 811 compliant hot-dip galvanized highway supply'
  },
  {
    id: 'stat-2',
    number: '3,800+',
    label: 'High Mast Lighting Towers',
    description: 'Continuously tapered octagonal masts with motorized winch systems'
  },
  {
    id: 'stat-3',
    number: '450+',
    label: 'Contractors & EPC Clients',
    description: 'Direct supply to NHAI expressways, flyovers & mining quarries'
  },
  {
    id: 'stat-4',
    number: '100%',
    label: 'MoRTH & NABL Certified',
    description: 'Uniform zinc coating and tensile strength tested in accredited lab'
  },
  {
    id: 'stat-5',
    number: '18+ Years',
    label: 'Industry Engineering Record',
    description: 'Proven track record delivering large-scale civil tenders on schedule'
  }
];

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    clientName: 'R. K. Agarwal',
    designation: 'Chief Project Engineer',
    company: 'National Highway EPC Works',
    projectScope: 'NH-16 Six-Lane Expressway Package (45 km)',
    rating: 5,
    reviewText: 'We procured over 45 kilometers of W-Beam crash barriers with C-posts from Sanjog for our NHAI expressway stretch. The hot-dip galvanizing was uniform and easily passed the independent consultant inspection without any delays.'
  },
  {
    id: 'rev-2',
    clientName: 'S. Mukherjee',
    designation: 'Quarry Operations Manager',
    company: 'Eastern Mining Consortium',
    projectScope: 'Granite Quarry Blast Drilling',
    rating: 5,
    reviewText: 'Their TCT drill rods and rock drill machines gave us excellent drilling speed in hard blue granite quarrying. Carbide tip wear life is much better than local market rods, which saved our drill tooling cost significantly.'
  },
  {
    id: 'rev-3',
    clientName: 'Vikramaditya Roy',
    designation: 'Senior Vice President (Projects)',
    company: 'Infrastructure Concessions Ltd',
    projectScope: 'Expressway Interchange High Mast Lighting',
    rating: 5,
    reviewText: 'The 30-meter high mast lighting towers delivered by Sanjog for our toll junction package were fabricated with high precision. Motorized winch operation is smooth, and wind load engineering passed all safety audits.'
  },
  {
    id: 'rev-4',
    clientName: 'Praveen Sharma',
    designation: 'Project Site In-Charge',
    company: 'Northern Expressway Joint Venture',
    projectScope: 'Bridge Approaches & Thrie-Beam Barriers',
    rating: 5,
    reviewText: 'Prompt trailer dispatch right when our project deadline was critical. Zero material rejection on arrival at site. Sanjog has become our primary highway safety supplier for all upcoming packages.'
  }
];

const DEFAULT_COMPANY_INFO: CompanyInfo = {
  companyName: 'Sanjog',
  tagline: defaultDossier.tagline,
  phone: '+91 98300-12345 / +91 (033) 2450-8900',
  salesPhone: '+91 98300-12345 (Direct WhatsApp / Calls)',
  inquiryEmail: defaultDossier.inquiryEmail,
  supportEmail: defaultDossier.supportEmail,
  headquarters: 'Sector V, Salt Lake, Kolkata, West Bengal - 700091',
  regionalOffices: 'Kolkata, Bhubaneswar, Ranchi & Regional Stock Points',
  registrationNo: defaultDossier.registrationNo,
  metricBarriers: '1,200+ km',
  metricHighMasts: '3,800+',
  metricClients: '450+',
  metricStandards: '100% MoRTH & IS',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Sector+V+Salt+Lake+Kolkata+West+Bengal+India&t=&z=13&ie=UTF8&iwloc=&output=embed',
  googleMapQuery: 'Sector V Salt Lake Kolkata West Bengal India'
};

const DEFAULT_FOUNDER_DESK: FounderDeskData = {
  name: 'Suman Sen',
  designation: 'Managing Director & Founder',
  organization: 'Sanjog',
  badge: "Message from Founder's Desk",
  image: '/src/assets/images/sanjog_founder_portrait_1791294725163.jpg',
  quoteTitle: '“Every kilometer of highway crash barrier we manufacture represents human lives protected and India\'s infrastructure advancing forward.”',
  paragraph1: 'When we laid the foundation of Sanjog in 2021, India was entering an unprecedented golden era of expressway, bridge, and high-speed corridor construction under national vision programs like Bharatmala. However, contractors routinely grappled with supply delays, sub-standard zinc coating, and erratic quality from fragmented vendors.',
  paragraph2: 'We established Sanjog to eliminate those compromises. By investing in modern continuous roll-forming mills, dedicated hot-dip galvanizing facilities, and strict NABL testing protocols, we ensure that every single W-Beam, octagonal mast, drill rod, and concrete machine leaving our factory meets the highest MoRTH, IS, and AASHTO benchmarks with complete transparency. We treat every client\'s project schedule with the same urgency as our own.',
  signatureName: 'Suman Sen',
  experienceYears: '18+ Years',
  keyMotto: 'Uncompromising Quality & Pan-India On-Time Site Delivery'
};

const DEFAULT_MAP_HUBS: MapHub[] = [
  {
    id: 'hub-1',
    name: 'Sanjog Kolkata Headquarters & Commercial Center',
    state: 'West Bengal',
    type: 'Corporate Office',
    coordinates: { x: 76, y: 54 },
    capacity: 'Tender Execution, Project Engineering, Client Billing',
    contact: '+91 98300-12345',
    description: 'Central commercial office handling NHAI contracts, state PWD tenders, and nationwide contractor liaison.'
  }
];

const DEFAULT_CLOUD_CONFIG: CloudDbConfig = {
  provider: 'none',
  supabaseUrl: '',
  supabaseAnonKey: '',
  mongoUri: '',
  lastSyncedAt: undefined
};

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('sanjog_cms_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminCredentials, setAdminCredentials] = useState<{ id: string; pass: string }>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_credentials');
      return saved ? JSON.parse(saved) : { id: 'admin', pass: 'sanjog@2026' };
    } catch {
      return { id: 'admin', pass: 'sanjog@2026' };
    }
  });

  const loginAdmin = (id: string, pass: string): boolean => {
    if (id.trim() === adminCredentials.id && pass === adminCredentials.pass) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('sanjog_cms_auth', 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('sanjog_cms_auth');
    } catch {}
  };

  const updateAdminPassword = (newPass: string) => {
    const updated = { ...adminCredentials, pass: newPass };
    setAdminCredentials(updated);
    localStorage.setItem('sanjog_cms_credentials', JSON.stringify(updated));
  };

  // Website Icon / Favicon
  const [websiteIcon, setWebsiteIcon] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('sanjog_website_icon');
      return saved || '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
    } catch {
      return '/src/assets/images/sanjog_logo_3d_1791291627051.jpg';
    }
  });

  const updateWebsiteIcon = (iconUrl: string) => {
    setWebsiteIcon(iconUrl);
    try {
      localStorage.setItem('sanjog_website_icon', iconUrl);
    } catch {}
  };

  // Dynamically update favicon in document head
  useEffect(() => {
    if (websiteIcon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = websiteIcon;
    }
  }, [websiteIcon]);

  // Catalogue PDF
  const [cataloguePdfUrl, setCataloguePdfUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sanjog_catalogue_pdf');
    } catch {
      return null;
    }
  });

  const [cataloguePdfName, setCataloguePdfName] = useState<string>(() => {
    try {
      return localStorage.getItem('sanjog_catalogue_pdf_name') || 'Sanjog_Product_Catalog.pdf';
    } catch {
      return 'Sanjog_Product_Catalog.pdf';
    }
  });

  const uploadCataloguePdf = (pdfDataUrl: string, name: string) => {
    setCataloguePdfUrl(pdfDataUrl);
    setCataloguePdfName(name);
    try {
      localStorage.setItem('sanjog_catalogue_pdf', pdfDataUrl);
      localStorage.setItem('sanjog_catalogue_pdf_name', name);
    } catch {}
  };

  const removeCataloguePdf = () => {
    setCataloguePdfUrl(null);
    setCataloguePdfName('Sanjog_Product_Catalog.pdf');
    try {
      localStorage.removeItem('sanjog_catalogue_pdf');
      localStorage.removeItem('sanjog_catalogue_pdf_name');
    } catch {}
  };

  const downloadCatalogue = () => {
    if (cataloguePdfUrl) {
      const link = document.createElement('a');
      link.href = cataloguePdfUrl;
      link.download = cataloguePdfName || 'Sanjog_Product_Catalog.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.print();
    }
  };

  // Cloud Config (Supabase / MongoDB)
  const [cloudConfig, setCloudConfig] = useState<CloudDbConfig>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cloud_config');
      return saved ? JSON.parse(saved) : DEFAULT_CLOUD_CONFIG;
    } catch {
      return DEFAULT_CLOUD_CONFIG;
    }
  });

  const updateCloudConfig = (cfg: CloudDbConfig) => {
    setCloudConfig(cfg);
    try {
      localStorage.setItem('sanjog_cloud_config', JSON.stringify(cfg));
    } catch {}
  };

  // Hero slides
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_hero_slides');
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  // News ticker items
  const [newsItems, setNewsItems] = useState<NewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_news');
      return saved ? JSON.parse(saved) : DEFAULT_NEWS_ITEMS;
    } catch {
      return DEFAULT_NEWS_ITEMS;
    }
  });

  // Performance Stats
  const [stats, setStats] = useState<StatItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_stats');
      return saved ? JSON.parse(saved) : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  // Customer Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_reviews');
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  // Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_gallery');
      return saved ? JSON.parse(saved) : defaultGallery;
    } catch {
      return defaultGallery;
    }
  });

  // Company info
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_company');
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_INFO;
    } catch {
      return DEFAULT_COMPANY_INFO;
    }
  });

  // Founder's desk data
  const [founderDesk, setFounderDesk] = useState<FounderDeskData>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_founder');
      return saved ? JSON.parse(saved) : DEFAULT_FOUNDER_DESK;
    } catch {
      return DEFAULT_FOUNDER_DESK;
    }
  });

  // Interactive map hubs
  const [mapHubs, setMapHubs] = useState<MapHub[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_map_hubs');
      return saved ? JSON.parse(saved) : DEFAULT_MAP_HUBS;
    } catch {
      return DEFAULT_MAP_HUBS;
    }
  });

  // Inquiries / Leads
  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanjog_cms_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sanjog_cms_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_news', JSON.stringify(newsItems));
  }, [newsItems]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_company', JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_founder', JSON.stringify(founderDesk));
  }, [founderDesk]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_map_hubs', JSON.stringify(mapHubs));
  }, [mapHubs]);

  useEffect(() => {
    localStorage.setItem('sanjog_cms_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Auto sync to backend storage whenever any CMS state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const payload = {
          heroSlides,
          newsItems,
          stats,
          reviews,
          products,
          gallery,
          companyInfo,
          founderDesk,
          mapHubs,
          inquiries,
          websiteIcon,
          cataloguePdfName,
          cloudConfig
        };
        fetch('/api/cms/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch {}
    }, 800);
    return () => clearTimeout(timer);
  }, [heroSlides, newsItems, stats, reviews, products, gallery, companyInfo, founderDesk, mapHubs, inquiries, websiteIcon, cataloguePdfName, cloudConfig]);

  // Sync to backend Express server / Supabase
  const syncToBackend = async (): Promise<boolean> => {
    try {
      const payload = {
        heroSlides,
        newsItems,
        stats,
        reviews,
        products,
        gallery,
        companyInfo,
        founderDesk,
        mapHubs,
        inquiries,
        websiteIcon,
        cataloguePdfName,
        cloudConfig
      };

      // Call internal Express API
      const response = await fetch('/api/cms/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setCloudConfig(prev => ({
          ...prev,
          lastSyncedAt: new Date().toLocaleTimeString()
        }));
        return true;
      }
      return false;
    } catch {
      // Offline or local fallback
      return false;
    }
  };

  // Load from backend API if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const res = await fetch('/api/cms/data');
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json;
          if (data && typeof data === 'object') {
            if (Array.isArray(data.products) && data.products.length > 0) {
              setProducts(data.products);
            }
            if (Array.isArray(data.reviews) && data.reviews.length > 0) {
              setReviews(data.reviews);
            }
            if (Array.isArray(data.stats) && data.stats.length > 0) {
              setStats(data.stats);
            }
            if (Array.isArray(data.heroSlides) && data.heroSlides.length > 0) {
              setHeroSlides(data.heroSlides);
            }
            if (Array.isArray(data.newsItems) && data.newsItems.length > 0) {
              setNewsItems(data.newsItems);
            }
            if (Array.isArray(data.gallery) && data.gallery.length > 0) {
              setGallery(data.gallery);
            }
            if (data.companyInfo && data.companyInfo.companyName) {
              setCompanyInfo(data.companyInfo);
            }
            if (data.founderDesk && data.founderDesk.name) {
              setFounderDesk(data.founderDesk);
            }
            if (Array.isArray(data.mapHubs) && data.mapHubs.length > 0) {
              setMapHubs(data.mapHubs);
            }
            if (data.websiteIcon) {
              setWebsiteIcon(data.websiteIcon);
            }
            if (data.cataloguePdfName) {
              setCataloguePdfName(data.cataloguePdfName);
            }
          }
        }
      } catch {}
    };
    fetchBackendData();
  }, []);

  // Hero mutations
  const updateHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => prev.map(s => s.id === slide.id ? slide : s));
  };

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    const newSlide: HeroSlide = {
      ...slideData,
      id: `slide-${Date.now()}`
    };
    setHeroSlides(prev => [...prev, newSlide]);
  };

  const deleteHeroSlide = (id: string) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  // News ticker mutations
  const updateNewsItem = (item: NewsItem) => {
    setNewsItems(prev => prev.map(n => n.id === item.id ? item : n));
  };

  const addNewsItem = (itemData: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...itemData,
      id: `news-${Date.now()}`
    };
    setNewsItems(prev => [...prev, newItem]);
  };

  const deleteNewsItem = (id: string) => {
    setNewsItems(prev => prev.filter(n => n.id !== id));
  };

  // Stats mutations
  const updateStat = (stat: StatItem) => {
    setStats(prev => prev.map(s => s.id === stat.id ? stat : s));
  };

  const addStat = (statData: Omit<StatItem, 'id'>) => {
    const newStat: StatItem = {
      ...statData,
      id: `stat-${Date.now()}`
    };
    setStats(prev => [...prev, newStat]);
  };

  const deleteStat = (id: string) => {
    setStats(prev => prev.filter(s => s.id !== id));
  };

  // Reviews mutations
  const updateReview = (review: CustomerReview) => {
    setReviews(prev => prev.map(r => r.id === review.id ? review : r));
  };

  const addReview = (reviewData: Omit<CustomerReview, 'id'>) => {
    const newReview: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}`
    };
    setReviews(prev => [...prev, newReview]);
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // Products mutations
  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Gallery mutations
  const updateGalleryItem = (item: GalleryItem) => {
    setGallery(prev => prev.map(g => g.id === item.id ? item : g));
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery(prev => [...prev, item]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const updateCompanyInfo = (info: CompanyInfo) => {
    setCompanyInfo(info);
  };

  const updateFounderDesk = (data: FounderDeskData) => {
    setFounderDesk(data);
  };

  const updateMapHub = (hub: MapHub) => {
    setMapHubs(prev => prev.map(h => h.id === hub.id ? hub : h));
  };

  const addMapHub = (hub: MapHub) => {
    setMapHubs(prev => [...prev, hub]);
  };

  const deleteMapHub = (id: string) => {
    setMapHubs(prev => prev.filter(h => h.id !== id));
  };

  const addInquiry = (inquiryData: Omit<InquiryItem, 'id' | 'ticketId' | 'date' | 'status'>): string => {
    const ticketId = `SNJ-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry: InquiryItem = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      ticketId,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);

    // Send to backend API asynchronously
    try {
      fetch('/api/cms/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInquiry)
      }).catch(() => {});
    } catch {}

    return ticketId;
  };

  const updateInquiryStatus = (id: string, status: InquiryItem['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  const resetToDefaults = () => {
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setNewsItems(DEFAULT_NEWS_ITEMS);
    setStats(DEFAULT_STATS);
    setReviews(DEFAULT_REVIEWS);
    setProducts(defaultProducts);
    setGallery(defaultGallery);
    setCompanyInfo(DEFAULT_COMPANY_INFO);
    setFounderDesk(DEFAULT_FOUNDER_DESK);
    setMapHubs(DEFAULT_MAP_HUBS);
    removeCataloguePdf();
    localStorage.removeItem('sanjog_cms_hero_slides');
    localStorage.removeItem('sanjog_cms_news');
    localStorage.removeItem('sanjog_cms_stats');
    localStorage.removeItem('sanjog_cms_reviews');
    localStorage.removeItem('sanjog_cms_products');
    localStorage.removeItem('sanjog_cms_gallery');
    localStorage.removeItem('sanjog_cms_company');
    localStorage.removeItem('sanjog_cms_founder');
    localStorage.removeItem('sanjog_cms_map_hubs');
    localStorage.removeItem('sanjog_website_icon');
  };

  return (
    <CmsContext.Provider
      value={{
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
        websiteIcon,
        updateWebsiteIcon,
        cataloguePdfUrl,
        cataloguePdfName,
        uploadCataloguePdf,
        removeCataloguePdf,
        downloadCatalogue,
        updateCloudConfig,
        syncToBackend,
        isAdminAuthenticated,
        loginAdmin,
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
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
