import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setWishlistOpen, addToCart, toggleWishlist } = useApp();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setWishlistOpen(false)} className="fixed inset-0 bg-black z-50" />
          <motion.div
            initial={{ translateX: '100%' }} animate={{ translateX: 0 }} exit={{ translateX: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b border-[#1C1C1C]/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D4A5B8] fill-[#D4A5B8]" />
                <h3 className="font-semibold text-base text-[#1C1C1C]">Your Curated Desires</h3>
              </div>
              <button onClick={() => setWishlistOpen(false)} className="p-1 rounded-full hover:bg-[#F9E8EE] transition-colors">
                <X className="w-5 h-5 text-[#1C1C1C]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-12">
                  <Heart className="w-8 h-8 text-[#D4A5B8] stroke-[1.2] mb-2" />
                  <p className="text-sm font-medium">Your curation vault is empty.</p>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="flex gap-4 bg-[#FFF8FA] p-3 rounded-[12px] border border-[#1C1C1C]/5 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded-[8px] bg-white shrink-0" />
                      <div>
                        <h4 className="text-xs font-semibold text-[#1C1C1C] line-clamp-1">{product.name}</h4>
                        <p className="text-[10px] text-[#717182]">${product.price}.00</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => addToCart(product)} className="p-2 bg-white rounded-full border border-[#1C1C1C]/5 text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toggleWishlist(product)} className="text-red-400 p-2">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};