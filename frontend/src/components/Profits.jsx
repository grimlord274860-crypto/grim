import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { profitImages } from '../data/mock';

const Profits = () => {
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);
  const visiblePerPage = 3;
  const totalPages = Math.ceil(profitImages.length / visiblePerPage);

  const scrollToPage = (p) => {
    if (!trackRef.current) return;
    const w = trackRef.current.clientWidth;
    trackRef.current.scrollTo({ left: w * p, behavior: 'smooth' });
    setPage(p);
  };

  const handlePrev = () => scrollToPage((page - 1 + totalPages) % totalPages);
  const handleNext = () => scrollToPage((page + 1) % totalPages);

  useEffect(() => {
    const id = setInterval(() => {
      setPage((p) => {
        const next = (p + 1) % totalPages;
        if (trackRef.current) {
          const w = trackRef.current.clientWidth;
          trackRef.current.scrollTo({ left: w * next, behavior: 'smooth' });
        }
        return next;
      });
    }, 4500);
    return () => clearInterval(id);
  }, [totalPages]);

  return (
    <section className="bg-[#0a0b0f] py-20 lg:py-28 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-white font-bold text-center text-3xl sm:text-4xl lg:text-5xl mb-14">
          Profits made by our traders
        </h2>
        <div className="relative">
          <div
            ref={trackRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-5"
            style={{ scrollbarWidth: 'none' }}
          >
            {Array.from({ length: totalPages }).map((_, pIdx) => (
              <div
                key={pIdx}
                className="flex-shrink-0 w-full snap-start grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {profitImages
                  .slice(pIdx * visiblePerPage, pIdx * visiblePerPage + visiblePerPage)
                  .map((src, i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border border-white/10 bg-[#0f1115] aspect-[4/3]"
                    >
                      <img src={src} alt={`Trader profit ${pIdx * visiblePerPage + i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  ))}
              </div>
            ))}
          </div>
          <button onClick={handlePrev} aria-label="Previous" className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#13151b] hover:bg-[#00d4ff] hover:text-black border border-white/20 text-white rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} aria-label="Next" className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-[#13151b] hover:bg-[#00d4ff] hover:text-black border border-white/20 text-white rounded-full flex items-center justify-center transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPage(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === page ? 'w-8 bg-[#00d4ff]' : 'w-2 bg-white/25 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profits;
