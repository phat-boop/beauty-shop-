import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkle } from 'lucide-react';

export const Categories: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useApp();
  const categories = ['All', 'Skincare', 'Makeup', 'Perfume', 'Hair Care'];

  return (
    <div className="py-10 bg-[#FFF8FA] border-b border-[#1C1C1C]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkle className="w-4 h-4 text-[#D4A5B8]" />
          <h2 className="text-xs font-semibold tracking-[0.3em] text-center text-[#1C1C1C] uppercase">Curated Departments</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-[16px] text-xs font-medium tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#1C1C1C] text-[#FFF8FA] shadow-md'
                  : 'bg-[#F9E8EE] text-[#1C1C1C] hover:bg-[#D4A5B8]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};