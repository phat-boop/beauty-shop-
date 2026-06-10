import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    { name: 'Seraphina Vance', role: 'Verified Connoisseur', text: 'The Rouge Velvet Satin is otherworldly. It stays immaculate through galas and dinners without micro-drying.' },
    { name: 'Elena Rostova', role: 'Elite Skincare Collector', text: 'Their Advanced Hyaluronic Youth Serum restored skin plumpness within exactly four overnights. Unbelievable precision.' }
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev, i) => (
          <div key={i} className="bg-white p-8 rounded-[16px] border border-[#1C1C1C]/5 relative shadow-sm">
            <Quote className="w-8 h-8 text-[#F9E8EE] absolute top-6 right-6" />
            <div className="flex text-amber-400 gap-0.5 mb-4">
              {[...Array(5)].map((_, idx) => <Star key={idx} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-sm italic text-[#1C1C1C]/80 leading-relaxed mb-6">"{rev.text}"</p>
            <div>
              <p className="text-xs font-semibold text-[#1C1C1C]">{rev.name}</p>
              <p className="text-[10px] text-[#717182]">{rev.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};