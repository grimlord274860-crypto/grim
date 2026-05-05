import React from 'react';
import { Star } from 'lucide-react';
import { reviews } from '../data/mock';

const Stars = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(rating) ? 'text-[#ffb400] fill-[#ffb400]' : 'text-white/20'
        }`}
      />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="bg-[#0a0b0f] py-20 lg:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 bg-[#13151b] border border-white/10 px-5 py-3 rounded-full">
            <Stars rating={5} />
            <span className="text-white font-semibold">4.8</span>
            <span className="text-white/60 text-sm">Based on 46 reviews</span>
          </div>
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mt-6">
            What our customers say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="bg-[#13151b] border border-white/10 rounded-xl p-6 hover:border-[#00d34d]/40 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{r.name}</h4>
                  <p className="text-white/50 text-xs mt-0.5">{r.date}</p>
                </div>
                <Stars rating={r.rating} />
              </div>
              <p className="text-white/75 text-sm leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
