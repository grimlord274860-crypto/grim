import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu } from 'lucide-react';
import { heroChart, brand } from '../data/mock';

const Hero = () => {
  return (
    <section className="relative bg-[#0a0b0f] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10 lg:pt-28 lg:pb-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-xs font-semibold tracking-wider uppercase mb-6">
            <Cpu className="w-3.5 h-3.5" />
            New — MT5 Auto-Execution
          </div>
          <h1 className="text-white font-bold tracking-tight text-4xl sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
            {brand.name}
            <span className="block text-[#00d4ff] mt-2">Smart Trading Signals</span>
          </h1>
          <p className="text-white/70 text-lg mt-6 max-w-2xl mx-auto">
            Premium indicators, MT5 auto-execution and a VIP signals channel — built for traders
            who don’t want to miss moves.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/indicators"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md border border-white/80 text-white text-[15px] font-semibold hover:bg-white hover:text-black transition-colors min-w-[210px]"
            >
              Browse Indicators
            </Link>
            <Link
              to="/mt5"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-[#00d4ff] text-black text-[15px] font-semibold hover:bg-[#22ddff] transition-colors min-w-[210px] shadow-lg shadow-[#00d4ff]/20"
            >
              MT5 Integration
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={heroChart}
              alt="Trading chart with BUY and SELL signals"
              className="w-full max-w-[1280px] mx-auto rounded-lg"
              loading="eager"
            />
            <div
              className="absolute -inset-2 -z-10 blur-3xl opacity-40"
              style={{ background: 'radial-gradient(circle at 50% 50%, #00d4ff, transparent 60%)' }}
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.15), transparent 70%)',
        }}
      />
    </section>
  );
};

export default Hero;
