import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { withOpacity } from '../theme';

const Hero = () => {
  const { content } = useSite();
  const hero = content?.hero || {};
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';
  const bg = hero.style?.bg || theme.backgroundColor || '#0a0b0f';

  return (
    <section className="relative overflow-hidden" style={{ background: bg }}>
      <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-10 lg:pt-28 lg:pb-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {hero.badgeText && (
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
              style={{ background: withOpacity(primary, 0.1), border: `1px solid ${withOpacity(primary, 0.3)}`, color: primary }}
            >
              <Cpu className="w-3.5 h-3.5" />
              {hero.badgeText}
            </div>
          )}
          <h1 className="text-white font-bold tracking-tight text-4xl sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
            {hero.title}
            {hero.titleAccent && (
              <span className="block mt-2" style={{ color: primary }}>{hero.titleAccent}</span>
            )}
          </h1>
          {hero.subtitle && (
            <p className="text-white/70 text-lg mt-6 max-w-2xl mx-auto">{hero.subtitle}</p>
          )}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {hero.primaryCta?.label && (
              <Link
                to={hero.primaryCta.href || '#'}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/80 text-white text-[15px] font-semibold hover:bg-white hover:text-black transition-colors min-w-[210px]"
                style={{ borderRadius: theme.buttonRadius || '8px' }}
              >
                {hero.primaryCta.label}
              </Link>
            )}
            {hero.secondaryCta?.label && (
              <Link
                to={hero.secondaryCta.href || '#'}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold transition-colors min-w-[210px] shadow-lg"
                style={{ background: primary, color: '#000', borderRadius: theme.buttonRadius || '8px', boxShadow: `0 8px 24px ${withOpacity(primary, 0.2)}` }}
              >
                {hero.secondaryCta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
        {hero.image && (
          <div className="mt-16 lg:mt-20 relative">
            <img src={hero.image} alt="Hero" className="w-full max-w-[1280px] mx-auto rounded-lg" loading="eager" />
            <div className="absolute -inset-2 -z-10 blur-3xl opacity-30" style={{ background: `radial-gradient(circle at 50% 50%, ${primary}, transparent 60%)` }} />
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-50" style={{ background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${withOpacity(primary, 0.15)}, transparent 70%)` }} />
    </section>
  );
};

export default Hero;
