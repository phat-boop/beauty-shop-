import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Inbox } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, searchQuery, selectedCategory, sortBy, setSortBy } = useApp();

  const processedProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'low-to-high') return a.price - b.price;
      if (sortBy === 'high-to-low') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <section id="shop-section" className="py-16 max-w-7xl mx-auto px-6 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#1C1C1C]/5">
        <div>
          <h2 className="text-2xl font-light text-[#1C1C1C] tracking-wide">
            Discover <span className="font-semibold">Masterpieces</span>
          </h2>
          <p className="text-xs text-[#717182] mt-1">Showing {processedProducts.length} exquisite formulations</p>
        </div>

        <div className="flex items-center gap-3 self-end">
          <SlidersHorizontal className="w-4 h-4 text-[#717182]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-[#1C1C1C]/10 text-xs rounded-[12px] px-3 py-2 text-[#1C1C1C] focus:outline-none focus:ring-1 focus:ring-[#D4A5B8]"
          >
            <option value="featured">Featured Collection</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="rating">Top Rated Elegance</option>
          </select>
        </div>
      </div>

      {processedProducts.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-white rounded-[16px] border border-dashed border-[#1C1C1C]/10">
          <Inbox className="w-10 h-10 text-[#D4A5B8] stroke-[1.2] mb-3" />
          <p className="text-sm font-medium text-[#1C1C1C]">No products match your custom curation.</p>
          <p className="text-xs text-[#717182] mt-1">Try adjusting your filters or expanding your search path.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {processedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};