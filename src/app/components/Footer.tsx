import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF8FA] border-t border-[#1C1C1C]/5 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#D4A5B8]" />
            <span className="text-sm font-semibold tracking-[0.2em]">AURA</span>
          </div>
          <p className="text-[11px] text-[#717182] leading-relaxed">The ultimate destination for premium cosmetic excellence and elite aesthetic cultivation.</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase mb-4 text-[#1C1C1C]">Collection</h4>
          <ul className="space-y-2 text-[11px] text-[#717182]">
            <li className="hover:text-[#D4A5B8] cursor-pointer">Skincare Elixirs</li>
            <li className="hover:text-[#D4A5B8] cursor-pointer">High-Glam Makeup</li>
            <li className="hover:text-[#D4A5B8] cursor-pointer">Haute Fragrances</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase mb-4 text-[#1C1C1C]">House Rules</h4>
          <ul className="space-y-2 text-[11px] text-[#717182]">
            <li className="hover:text-[#D4A5B8] cursor-pointer">Complimentary Shipping</li>
            <li className="hover:text-[#D4A5B8] cursor-pointer">Elite Returns</li>
            <li className="hover:text-[#D4A5B8] cursor-pointer">Sustainability Commitment</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold tracking-wider uppercase mb-4 text-[#1C1C1C]">Legal</h4>
          <ul className="space-y-2 text-[11px] text-[#717182]">
            <li className="hover:text-[#D4A5B8] cursor-pointer">Privacy Charter</li>
            <li className="hover:text-[#D4A5B8] cursor-pointer">Terms of Majesty</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-[#1C1C1C]/5 pt-6 text-center text-[10px] text-[#717182]">
        &copy; 2026 AURA Beauty Inc. Handcrafted to Perfection.
      </div>
    </footer>
  );
};