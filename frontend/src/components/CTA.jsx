import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { withOpacity } from '../theme';

const FAQ = ({ faqs, primary }) => {
  const [open, setOpen] = useState(0);
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="bg-[#0a0b0f] py-20 lg:py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-white font-bold text-center text-3xl sm:text-4xl mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-[#13151b] border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between text-left px-6 py-5 text-white font-semibold hover:bg-white/5 transition-colors">
                <span>{f.question}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180' : 'text-white/60'}`} style={open === i ? { color: primary } : {}} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-60' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-white/70 leading-relaxed">{f.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const { content } = useSite();
  const cta = content?.cta || {};
  const faqs = content?.faqs || [];
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';

  return (
    <>
      <FAQ faqs={faqs} primary={primary} />
      <section className="bg-[#0a0b0f] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: `radial-gradient(ellipse 50% 60% at 50% 50%, ${withOpacity(primary, 0.15)}, transparent 70%)` }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">{cta.title}</h2>
          {cta.subtitle && <p className="text-white/70 text-lg mt-5">{cta.subtitle}</p>}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {cta.primaryCta?.label && (
              <Link to={cta.primaryCta.href || '#'} className="inline-flex items-center justify-center px-8 py-4 border border-white/80 text-white text-[15px] font-semibold hover:bg-white hover:text-black transition-colors min-w-[210px]" style={{ borderRadius: theme.buttonRadius || '8px' }}>
                {cta.primaryCta.label}
              </Link>
            )}
            {cta.secondaryCta?.label && (
              <Link to={cta.secondaryCta.href || '#'} className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-semibold transition-colors min-w-[210px] shadow-lg" style={{ background: primary, color: '#000', borderRadius: theme.buttonRadius || '8px', boxShadow: `0 8px 24px ${withOpacity(primary, 0.2)}` }}>
                {cta.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
