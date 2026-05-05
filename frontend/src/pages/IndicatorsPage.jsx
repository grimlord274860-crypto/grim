import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { indicators } from '../data/mock';

const IndicatorsPage = () => {
  return (
    <div className="bg-[#0a0b0f]">
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(0,212,255,0.15), transparent 70%)' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" /> 6 Premium Indicators
          </div>
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Our <span className="text-[#00d4ff]">Indicators</span>
          </h1>
          <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">
            Pick the indicator that matches your trading style. Every one is no-repaint, no-lag
            and works on TradingView for free.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1400px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((ind) => (
            <Link
              key={ind.id}
              to={`/indicators/${ind.slug}`}
              className="group relative bg-[#13151b] border border-white/10 rounded-xl overflow-hidden hover:border-[#00d4ff]/50 transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1115]">
                <img src={ind.images[0]} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#00d4ff] text-black text-[11px] font-bold tracking-wide">
                  {ind.discount} OFF
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-[#00d4ff] text-xs font-semibold tracking-wider uppercase mb-2">
                  <span>No. {ind.number}</span>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="flex items-center gap-1 text-white/70">
                    <Star className="w-3 h-3 fill-[#00d4ff] text-[#00d4ff]" /> {ind.rating}
                  </span>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{ind.name}</h3>
                <p className="text-white/65 text-sm leading-relaxed line-clamp-2">{ind.tagline}</p>
                <div className="flex items-end justify-between mt-5">
                  <div>
                    <span className="text-white text-2xl font-bold">${ind.price.toFixed(2)}</span>
                    <span className="text-white/40 text-sm line-through ml-2">${ind.originalPrice.toFixed(2)}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[#00d4ff] text-sm font-semibold group-hover:gap-2 transition-all">
                    View <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndicatorsPage;
