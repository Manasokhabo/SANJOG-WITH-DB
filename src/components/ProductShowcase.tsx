import React, { useState, useMemo } from 'react';
import { SANJOG_PRODUCTS, Product } from '../data/companyData';
import { 
  ShieldAlert, 
  Lightbulb, 
  Pickaxe, 
  Construction, 
  Fence, 
  ArrowUpRight, 
  Search, 
  FileText,
  SlidersHorizontal
} from 'lucide-react';

interface ProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onRequestQuote: (productName: string) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onSelectProduct,
  onRequestQuote
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Products (16)' },
    { id: 'crash-barriers', label: 'Highway Crash Barriers' },
    { id: 'road-safety', label: 'Lighting & Road Safety' },
    { id: 'mining-drilling', label: 'Mining & Rock Drilling' },
    { id: 'concrete-machinery', label: 'Concrete Machinery' },
    { id: 'fencing-pipes', label: 'Pipes & Security Fencing' }
  ];

  const filteredProducts = useMemo(() => {
    return SANJOG_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.standards.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.materialGrade.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-20 relative bg-slate-950/70 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 font-mono">
              Complete Highway, Mining & Construction Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Sanjog Product Lineup
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Precision manufactured to MoRTH, AASHTO, IS, and international safety specifications for major EPC highway projects and industrial operations.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search barrier, drill rod, mixer, pipe..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Category Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/80">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-lime-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline-block font-mono">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Tag Replacement: clean subtle badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-cyan-400">
                    {product.categoryLabel}
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800 text-[10px] font-mono text-slate-300">
                    {product.availability}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors mb-1">
                    {product.name}
                  </h3>

                  <p className="text-xs font-semibold text-lime-400 mb-2 font-mono">
                    {product.tagline}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Clean Spec Points */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/70 text-xs mb-4 font-mono space-y-1">
                    <div className="text-slate-400 flex justify-between">
                      <span className="truncate">Grade:</span>
                      <span className="text-slate-200 truncate ml-2 max-w-[65%]">{product.materialGrade}</span>
                    </div>
                    <div className="text-slate-400 flex justify-between">
                      <span className="truncate">Standard:</span>
                      <span className="text-cyan-300 truncate ml-2 max-w-[65%]">{product.standards[0] || 'IS Standard'}</span>
                    </div>
                  </div>

                  {/* Standards Text Metadata */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 flex-wrap font-mono">
                    <span>Approved:</span>
                    {product.certifications.slice(0, 2).map((cert, cIdx) => (
                      <React.Fragment key={cIdx}>
                        <span className="text-slate-300">{cert}</span>
                        {cIdx < product.certifications.length - 1 && cIdx < 1 && (
                          <span className="text-slate-500" aria-hidden="true">&middot;</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-2.5">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-cyan-300 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Tech Specs</span>
                </button>

                <button
                  onClick={() => onRequestQuote(product.name)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-lg shadow-sm transition-all"
                >
                  <span>Get Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No products matched "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
