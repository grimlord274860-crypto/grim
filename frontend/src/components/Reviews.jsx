import React from 'react';
import { Star } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const Stars = ({ rating, color = '#00d4ff' }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="w-4 h-4" style={{ color: i < Math.round(rating) ? color : 'rgba(255,255,255,0.2)', fill: i < Math.round(rating) ? color : 'transparent' }} />
    ))}
  </div>
);

const Reviews = () => {
  const { content } = useSite();
  const data = content?.reviewsSection || { items: [] };
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';

  return (
    <section className="py-20 lg:py-28 border-t border-white/5" style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-3 bg-[#13151b] border border-white/10 px-5 py-3 rounded-full">
            <Stars rating={5} color={primary} />
            <span className="text-white font-semibold">{data.averageRating}</span>
            <span className="text-white/60 text-sm">Based on {data.totalReviews} reviews</span>
          </div>
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mt-6">{data.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {(data.items || []).map((r, i) => (
            <article
              key={i}
              className="bg-[#13151b] border border-white/10 p-6 transition-colors flex flex-col"
              style={{ borderRadius: theme.radius || '12px' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = primary + '66')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold">{r.name}</h4>
                  <p className="text-white/50 text-xs mt-0.5">{r.date}</p>
                </div>
                <Stars rating={r.rating} color={primary} />
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
