import React from 'react';
import { Link } from 'react-router-dom';
import { Boxes, Twitter, Youtube, MessageCircle, Mail, Send, BarChart3, TrendingUp, Cpu, Zap, Star } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const SOCIAL_ICONS = { Twitter, Youtube, MessageCircle, Mail, Send };
const LOGO_ICONS = { Boxes, BarChart3, TrendingUp, Cpu, Zap, Star };

const Footer = () => {
  const year = new Date().getFullYear();
  const { content } = useSite();
  const f = content?.footer || {};
  const brand = content?.brand || {};
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';
  const Logo = LOGO_ICONS[brand.logoIcon] || Boxes;

  return (
    <footer className="bg-[#08090c] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div
          className="grid grid-cols-1 gap-10"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))` }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Logo className="w-7 h-7" style={{ color: primary }} strokeWidth={2.2} />
                <div className="absolute inset-0 blur-md opacity-40 -z-10" style={{ background: primary }} />
              </div>
              <span className="text-white text-[22px] font-bold tracking-tight">{brand.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{f.description || brand.tagline}</p>
            <div className="flex items-center gap-3 mt-5 flex-wrap">
              {(f.socials || []).map((s, i) => {
                const Icon = SOCIAL_ICONS[s.icon] || Mail;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.icon}
                    className="w-9 h-9 rounded-full bg-white/5 text-white flex items-center justify-center transition-colors"
                    onMouseEnter={(e) => { e.currentTarget.style.background = primary; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {(f.columns || []).map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">{col.title}</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                {(col.links || []).map((ln, j) => (
                  <li key={j}>
                    {ln.href?.startsWith('/') ? (
                      <Link to={ln.href} className="transition-colors" onMouseEnter={(e)=>e.currentTarget.style.color=primary} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}>
                        {ln.label}
                      </Link>
                    ) : (
                      <a href={ln.href} className="transition-colors" onMouseEnter={(e)=>e.currentTarget.style.color=primary} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}>
                        {ln.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© {year} {brand.name}. {f.copyright}</p>
          <p className="text-white/40 text-xs max-w-2xl text-center md:text-right">{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
