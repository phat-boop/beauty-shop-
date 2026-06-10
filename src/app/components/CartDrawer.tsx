import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />

          <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: 0 }}
            exit={{ translateX: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            <div className="p-5 border-b border-[#1C1C1C]/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#1C1C1C]" />
                <h3 className="font-semibold text-base text-[#1C1C1C]">Your Velvet Bag</h3>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1 rounded-full hover:bg-[#F9E8EE] transition-colors">
                <X className="w-5 h-5 text-[#1C1C1C]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60 py-12">
                  <ShoppingBag className="w-8 h-8 text-[#D4A5B8] stroke-[1.2] mb-2" />
                  <p className="text-sm font-medium">Your shopping bag is currently empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 bg-[#FFF8FA] p-3 rounded-[12px] border border-[#1C1C1C]/5">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-[8px] bg-white shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="text-xs font-semibold text-[#1C1C1C] line-clamp-1">{item.product.name}</h4>
                          <p className="text-[10px] text-[#717182]">{item.product.brand}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-[#717182] hover:text-red-500 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#1C1C1C]/10 rounded-[8px] bg-white">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-[#D4A5B8]"><Minus className="w-3 h-3" /></button>
                          <span className="px-2 text-xs font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-[#D4A5B8]"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-xs font-semibold text-[#1C1C1C]">${item.product.price * item.quantity}.00</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-[#1C1C1C]/5 bg-[#FFF8FA]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-[#717182]">Subtotal Order</span>
                  <span className="text-base font-bold text-[#1C1C1C]">${subtotal}.00</span>
                </div>
                <button className="w-full bg-[#1C1C1C] text-[#FFF8FA] py-3.5 rounded-[16px] text-xs font-semibold tracking-wider hover:bg-[#D4A5B8] hover:text-[#1C1C1C] transition-all shadow-xl shadow-[#1C1C1C]/10">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};