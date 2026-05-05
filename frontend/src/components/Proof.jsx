import React from 'react';
import { proofImages } from '../data/mock';

const Proof = () => {
  return (
    <section className="bg-[#0a0b0f] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
            We show real proof
          </h2>
          <p className="text-white/70 text-lg mt-5">
            Unlike our competitors, we don't try to make our indicator's signals look amazing -
            they are amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {proofImages.map((src, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#0f1115]"
            >
              <img
                src={src}
                alt={`Trading proof chart ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center max-w-4xl mx-auto">
          <p className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
            To succeed in trading, you need the right tools. We empower you to capitalize on
            market opportunities and join the ranks of successful traders.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Proof;
