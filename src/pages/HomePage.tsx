import React from 'react';
import { PageType } from '../components/Navbar';
import { Product } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { HeroCarousel } from '../components/HeroCarousel';
import { NewsTicker } from '../components/NewsTicker';
import { FeaturedProductsCarousel } from '../components/FeaturedProductsCarousel';
import { FoundersDesk } from '../components/FoundersDesk';
import { CustomerFeedbackCarousel } from '../components/CustomerFeedbackCarousel';
import { StatsSection } from '../components/StatsSection';
import { 
  ArrowRight, 
  Award, 
  Truck, 
  Factory, 
  CheckCircle2, 
  Star, 
  Download,
  PhoneCall
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onSelectProduct: (product: Product) => void;
  onOpenDossier: () => void;
  onEnquireProduct: (productName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onOpenDossier,
  onEnquireProduct
}) => {
  const { companyInfo, downloadCatalogue } = useCms();

  return (
    <div className="pt-16 pb-16">
      {/* 1. Framed Hero Slider with cool transition effects and clean spacious banner */}
      <HeroCarousel
        onNavigate={onNavigate}
        onEnquireProduct={onEnquireProduct}
      />

      {/* 2. Live News Ticker with Marquee Effect */}
      <NewsTicker
        onNavigateToContact={() => onNavigate('contact')}
      />

      {/* 3. Featured Products Sliding Section (Images only, smooth slide, clicks redirect to Products page) */}
      <FeaturedProductsCarousel
        onSelectProduct={onSelectProduct}
        onNavigateToProducts={(product) => {
          if (product) onSelectProduct(product);
          onNavigate('products');
        }}
      />

      {/* 4. Core Manufacturing Divisions Overview */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 text-left">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono mb-1">
              What We Manufacture & Supply
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Core Manufacturing Divisions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Direct factory supply to highway EPC contractors, state PWDs, and mining companies.
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto font-mono"
          >
            <span>View All 16 Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Highway Crash Barriers',
              items: 'W-Beam, Thrie-Beam, C-Posts, Fasteners',
              desc: 'Heavy hot-dip galvanized steel crash barrier systems certified to MoRTH Section 811 and AASHTO M180.',
              image: '/src/assets/images/sanjog_crash_barrier_1791292174622.jpg'
            },
            {
              title: 'Lighting & Road Safety',
              items: 'High Mast Towers, Solar Studs, Road Paint & Machines',
              desc: 'Octagonal 12m-35m lighting towers with motorized winch and active LED solar delineators.',
              image: '/src/assets/images/sanjog_highmast_lighting_1791292229696.jpg'
            },
            {
              title: 'Mining & Rock Drilling',
              items: 'Mining Drill Rods, TCT Drill Rods, Rock Drill Machines',
              desc: 'Induction hardened alloy hollow steel drill rods with tungsten carbide tips for hard granite quarrying.',
              image: '/src/assets/images/sanjog_drilling_mining_1791292188310.jpg'
            },
            {
              title: 'Concrete Construction Machinery',
              items: 'Concrete Mixers, Vibrators & Poker Needles',
              desc: '10/7 CFT hydraulic batch concrete mixers and heavy petrol/electric concrete immersion vibrators.',
              image: '/src/assets/images/sanjog_concrete_machinery_1791292215407.jpg'
            },
            {
              title: 'Infrastructure Pipes & Fencing',
              items: 'uPVC Pipes, MS Angle Y-Type, Interlink Chain Mesh',
              desc: 'Corrosion-proof uPVC drainage pipes and perimeter chain link security fencing for highways.',
              image: '/src/assets/images/sanjog_gallery_factory_1791292902900.jpg'
            },
            {
              title: 'Bitumen Equipment & Tanks',
              items: 'Bitumen Heating Storage Tanks (15T - 50T)',
              desc: 'Thermic fluid and direct heating insulated storage tanks for highway asphalt batching plants.',
              image: '/src/assets/images/sanjog_road_marking_1791292203562.jpg'
            }
          ].map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group text-left"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-xs font-mono text-cyan-300 block">{cat.items}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white font-display mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => onNavigate('products')}
                  className="w-full py-2 px-3 text-xs font-semibold text-cyan-300 bg-slate-950/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Items</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Founder's Desk Section */}
      <FoundersDesk
        onNavigate={onNavigate}
        onOpenDossier={onOpenDossier}
      />

      {/* 6. Why Choose Sanjog */}
      <section className="py-16 bg-slate-950/80 border-t border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-lime-400 font-mono mb-1">
              Why Indian Contractors Prefer Sanjog
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Quality Manufacturing & Factory Direct Pricing
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              We understand project deadlines and strict consultant approval standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                100% MoRTH & IS Approved
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All crash barriers, high masts, and road safety products conform strictly to MoRTH Section 811 & 803, IS 2062, IS 4759, and AASHTO M180 with NABL lab test certificates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Fast Pan-India Site Dispatch
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                With ample inventory and automated roll forming mills, we dispatch materials directly to highway, mining, and railway sites across all Indian states on time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Direct Manufacturer Pricing
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By procuring directly from our fabrication plant, you eliminate middleman markups and get competitive rates for large-scale EPC tender supply contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contractor Reviews (Sliding Carousel controllable from CMS) */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Trusted by Highway & Mining Contractors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Feedback from actual project directors and engineers who use Sanjog materials.
            </p>
          </div>

          {/* Smooth Auto-Sliding Carousel for Customer Reviews */}
          <CustomerFeedbackCarousel onOpenInquiry={() => onNavigate('contact')} />
        </div>
      </section>

      {/* 8. Verified Performance Stats Section (Under Trusted by Contractors, controllable from CMS) */}
      <StatsSection />

      {/* 8. Bottom Call to Action Banner */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-cyan-800/40 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Have an Upcoming Tender or Site Requirement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Send us your required quantities, and our sales team will prepare a formal price quotation with test certifications and dispatch schedules.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              Contact Sales Team
            </button>
            <button
              onClick={downloadCatalogue}
              className="px-5 py-3.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all whitespace-nowrap flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Catalog</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
