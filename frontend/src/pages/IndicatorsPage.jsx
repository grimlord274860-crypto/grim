import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { withOpacity } from '../theme';

const IndicatorsPage = () => {
  const { content } = useSite();
  const page = content?.indicatorsPage || {};
  const indicators = content?.indicators || [];
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';

  return (
    <div style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(ellipse 50% 50% at 50% 0%, ${withOpacity(primary, 0.15)}, transparent 70%)` }} />
        <div className="relative max-w-[1400px] mx-auto px-6 pt-20 pb-12 text-center">
          {page.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6" style={{ background: withOpacity(primary, 0.1), border: `1px solid ${withOpacity(primary, 0.3)}`, color: primary }}>
              <Sparkles className="w-3.5 h-3.5" /> {page.badge}
            </div>
          )}
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            {page.title?.replace(page.titleAccent, '').trim() || 'Our'} <span style={{ color: primary }}>{page.titleAccent || 'Indicators'}</span>
          </h1>
          {page.subtitle && <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">{page.subtitle}</p>}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indicators.map((ind) => {
            const s = ind.style || {};
            return (
              <Link
                key={ind.id || ind.slug}
                to={`/indicators/${ind.slug}`}
                className="group relative overflow-hidden transition-all hover:-translate-y-1"
                style={{ background: s.bg || theme.surfaceColor || '#13151b', border: `1px solid ${s.border || theme.borderColor || '#ffffff1a'}`, borderRadius: s.radius || theme.radius || '12px' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = withOpacity(s.accent || primary, 0.5))}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = s.border || theme.borderColor || '#ffffff1a')}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1115]">
                  {ind.images?.[0] && <img src={ind.images[0]} alt={ind.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                  {ind.discount && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded text-[11px] font-bold tracking-wide" style={{ background: s.accent || primary, color: '#000' }}>
                      {ind.discount} OFF
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: s.accent || primary }}>
                    <span>No. {ind.number}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="flex items-center gap-1 text-white/70">
                      <Star className="w-3 h-3" style={{ color: s.accent || primary, fill: s.accent || primary }} /> {ind.rating}
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{ind.name}</h3>
                  <p className="text-white/65 text-sm leading-relaxed line-clamp-2">{ind.tagline}</p>
                  <div className="flex items-end justify-between mt-5">
                    <div>
                      <span className="text-white text-2xl font-bold">${Number(ind.price).toFixed(2)}</span>
                      {ind.originalPrice && <span className="text-white/40 text-sm line-through ml-2">${Number(ind.originalPrice).toFixed(2)}</span>}
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: s.accent || primary }}>
                      View <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default IndicatorsPage;
