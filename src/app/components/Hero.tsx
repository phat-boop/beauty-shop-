import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[75vh] w-full bg-[#F9E8EE] overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80" 
          alt="Premium Luxury Cosmetic Banner" 
          className="w-full h-full object-cover opacity-40 mix-blend-multiply transition-transform duration-1000 scale-105 hover:scale-100"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <span className="text-sm font-semibold tracking-[0.3em] text-[#1C1C1C] block mb-4">
            MAISON DE L'AURA
          </span>
          <h1 className="text-5xl md:text-6xl font-normal tracking-tight text-[#1C1C1C] leading-[1.1] mb-6">
            Define Your <br />
            <span className="font-semibold italic text-[#D4A5B8]">Ethereal Glow</span>
          </h1>
          <p className="text-[#1C1C1C]/80 text-base mb-8 leading-relaxed">
            Immerse yourself in premium dermatological artistry, crafted exquisitely for individuals who demand uncompromising radiant luxury.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#1C1C1C] text-[#FFF8FA] px-8 py-4 rounded-[16px] text-sm font-medium hover:bg-[#D4A5B8] hover:text-[#1C1C1C] transition-all flex items-center gap-2 group shadow-lg shadow-[#1C1C1C]/10"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};