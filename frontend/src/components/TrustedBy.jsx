import React from 'react';
import { trustedLogos } from '../data/mock';

const TrustedBy = () => {
  // duplicate logos to simulate carousel marquee feel
  const loop = [...trustedLogos, ...trustedLogos, ...trustedLogos];
  return (
    <section className="bg-[#0a0b0f] py-12 border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <p className="text-center text-white/60 text-xs tracking-[0.25em] font-semibold uppercase mb-8">
          Trusted by thousands of traders
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
            {loop.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 h-10 flex items-center opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 lg:h-9 object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
