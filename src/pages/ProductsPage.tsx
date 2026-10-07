import React, { useState, useMemo } from 'react';
import { Product } from '../data/companyData';
import { useCms } from '../context/CmsContext';
import { Search, FileText, ArrowUpRight, Check, SlidersHorizontal, PackageCheck } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  onEnquireProduct: (productName: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  onEnquireProduct
}) => {
  const { products } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: `All Products (${products.length})` },
    { id: 'crash-barriers', label: 'Highway Crash Barriers' },
    { id: 'road-safety', label: 'Lighting & Road Safety' },
    { id: 'mining-drilling', label: 'Mining & Rock Drilling' },
    { id: 'concrete-machinery', label: 'Concrete Machinery' },
    { id: 'fencing-pipes', label: 'Pipes & Security Fencing' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.standards.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.materialGrade.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono mb-3">
          <PackageCheck className="w-3.5 h-3.5" />
          <span>Full Product Catalog & Specifications</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display">
          Our Products
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
          Explore our complete range of certified highway safety systems, high mast lighting towers, mining drilling tools, concrete construction machines, and perimeter fencing.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-lime-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product, standard, grade..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Product Count Status */}
      <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-6">
        <span>Showing {filteredProducts.length} verified products</span>
        <span className="text-emerald-400">All products available for direct supply</span>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-950/20 group"
          >
            <div>
              {/* Product Photo */}
              <div className="relative aspect-[16/11] overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-cyan-400">
                  {product.categoryLabel}
                </div>

                <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800 text-[10px] font-mono text-slate-300">
                  {product.availability}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors mb-1">
                  {product.name}
                </h3>

                <p className="text-xs font-semibold text-lime-400 mb-2.5 font-mono">
                  {product.tagline}
                </p>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>

                {/* Key Spec Snippet */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/70 text-xs font-mono space-y-1 mb-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Grade / Build:</span>
                    <span className="text-slate-200 truncate ml-2 max-w-[60%]">{product.materialGrade}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Standard:</span>
                    <span className="text-cyan-300 truncate ml-2 max-w-[60%]">{product.standards[0] || 'IS Standard'}</span>
                  </div>
                </div>

                {/* Standard Tags */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono flex-wrap">
                  <span>Testing:</span>
                  {product.certifications.map((cert, cIdx) => (
                    <span key={cIdx} className="text-slate-300">
                      {cert}{cIdx < product.certifications.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-2.5">
              <button
                onClick={() => onSelectProduct(product)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-cyan-300 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Tech Specs</span>
              </button>

              <button
                onClick={() => onEnquireProduct(product.name)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-lime-400 hover:from-cyan-300 hover:to-lime-300 rounded-lg shadow-sm transition-all"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 mt-6">
          <p className="text-slate-400 text-sm">No products found matching "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-3 text-xs text-cyan-400 hover:underline"
          >
            Clear Filters & Show All
          </button>
        </div>
      )}
    </div>
  );
};
