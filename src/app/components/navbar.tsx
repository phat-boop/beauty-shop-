import React from 'react';
import { Search, Heart, ShoppingBag, User, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { cart, wishlist, searchQuery, setSearchQuery, setCartOpen, setWishlistOpen } = useApp();
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-[#FFF8FA]/80 backdrop-blur-md border-b border-[#1C1C1C]/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Luxury Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Sparkles className="w-5 h-5 text-[#D4A5B8]" />
          <span className="text-2xl font-semibold tracking-[0.2em] text-[#1C1C1C]">AURA</span>
        </div>

        {/* Search Engine Center */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Search for flawless radiance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F9E8EE] text-[#1C1C1C] pl-10 pr-4 py-2 rounded-[16px] text-sm focus:outline-none focus:ring-1 focus:ring-[#D4A5B8] placeholder-[#717182] transition-all"
          />
          <Search className="w-4 h-4 text-[#717182] absolute left-3 top-2.5" />
        </div>

        {/* Utility Icon Controls */}
        <div className="flex items-center gap-6">
          <button className="text-[#1C1C1C] hover:text-[#D4A5B8] transition-colors relative">
            <User className="w-5 h-5 stroke-[1.5]" />
          </button>
          
          <button 
            onClick={() => setWishlistOpen(true)}
            className="text-[#1C1C1C] hover:text-[#D4A5B8] transition-colors relative"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4A5B8] text-[#1C1C1C] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <button 
            onClick={() => setCartOpen(true)}
            className="text-[#1C1C1C] hover:text-[#D4A5B8] transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1C1C1C] text-[#FFF8FA] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};