import React from 'react';
import { heroChart } from '../data/mock';

const Hero = () => {
  return (
    <section className="relative bg-[#0a0b0f] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10 lg:pt-28 lg:pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-white font-bold tracking-tight text-4xl sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
            GainzAlgo - The Best Trading Algo
          </h1>
          <p className="text-white/70 text-lg mt-6">
            Learn more about GainzAlgo and its features below
            <span className="ml-2" aria-hidden>👇</span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#gainzalgo"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-md border border-white/80 text-white text-[15px] font-semibold hover:bg-white hover:text-black transition-colors min-w-[210px]"
            >
              Get GainzAlgo
            </a>
            <a
              href="#v2"
              className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#00d34d] text-black text-[15px] font-semibold hover:bg-[#00bf45] transition-colors min-w-[210px] shadow-lg shadow-[#00d34d]/20"
            >
              Get GainzAlgo V2
            </a>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <img
            src={heroChart}
            alt="GainzAlgo trading chart with BUY and SELL signals"
            className="w-full max-w-[1280px] mx-auto rounded-lg"
            loading="eager"
          />
        </div>
      </div>

      {/* subtle radial accent */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,211,77,0.12), transparent 70%)',
        }}
      />
    </section>
  );
};

export default Hero;
