import React from 'react';
import { useSite } from '../context/SiteContext';

const Proof = () => {
  const { content } = useSite();
  const data = content?.proof || {};
  const theme = content?.theme || {};
  if (!data.images || data.images.length === 0) return null;
  return (
    <section className="py-20 lg:py-28" style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">{data.title}</h2>
          {data.subtitle && <p className="text-white/70 text-lg mt-5">{data.subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.images.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#0f1115]">
              <img src={src} alt={`Proof ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
            </div>
          ))}
        </div>
        {data.highlight && (
          <div className="mt-20 text-center max-w-4xl mx-auto">
            <p className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">{data.highlight}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Proof;
