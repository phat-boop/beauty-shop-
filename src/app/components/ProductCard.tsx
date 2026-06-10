import React from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-[16px] border border-[#1C1C1C]/5 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-square overflow-hidden bg-[#FFF8FA]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#1C1C1C] text-[#FFF8FA] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10">
            {product.tag}
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md border border-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-white transition-all shadow-sm z-10"
        >
          <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#D4A5B8] text-[#D4A5B8]' : 'text-[#1C1C1C]'}`} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/40 to-transparent flex justify-center">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white text-[#1C1C1C] py-3 rounded-[12px] text-xs font-semibold tracking-wider hover:bg-[#1C1C1C] hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add To Bag
          </button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <p className="text-[11px] font-medium tracking-widest text-[#717182] uppercase mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium text-[#1C1C1C] line-clamp-1 group-hover:text-[#D4A5B8] transition-colors">{product.name}</h3>
          <p className="text-xs text-[#717182] line-clamp-2 mt-1 mb-3 font-light leading-relaxed">{product.description}</p>
        </div>

        <div>
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[11px] font-semibold text-[#1C1C1C]">{product.rating}</span>
            <span className="text-[10px] text-[#717182]">({product.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1C1C1C]">${product.price}.00</span>
            {product.originalPrice && (
              <span className="text-xs text-[#717182] line-through">${product.originalPrice}.00</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};