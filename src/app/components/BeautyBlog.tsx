import React from 'react';
import { MOCK_BLOGS } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

export const BeautyBlog: React.FC = () => {
  return (
    <section className="bg-[#F9E8EE]/40 py-16 border-t border-b border-[#1C1C1C]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-[#D4A5B8] uppercase block mb-2">AURA Editorial</span>
          <h2 className="text-3xl font-light text-[#1C1C1C]">The Beauty <span className="font-semibold italic">Chronicles</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_BLOGS.map((blog) => (
            <div key={blog.id} className="group cursor-pointer bg-white rounded-[16px] overflow-hidden border border-[#1C1C1C]/5 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-semibold tracking-wider text-[#D4A5B8] uppercase">{blog.category}</span>
                <div className="flex items-start justify-between gap-4 mt-2 mb-3">
                  <h3 className="text-lg font-medium text-[#1C1C1C] group-hover:text-[#D4A5B8] transition-colors line-clamp-1">{blog.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-[#1C1C1C] shrink-0" />
                </div>
                <p className="text-xs text-[#717182] line-clamp-2 mb-4 font-light leading-relaxed">{blog.excerpt}</p>
                <span className="text-[10px] text-[#717182]">{blog.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};