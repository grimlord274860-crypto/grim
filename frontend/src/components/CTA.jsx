import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mock';

const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#0a0b0f] py-20 lg:py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-white font-bold text-center text-3xl sm:text-4xl mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-[#13151b] border border-white/10 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between text-left px-6 py-5 text-white font-semibold hover:bg-white/5 transition-colors">
                <span>{f.question}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180 text-[#00d4ff]' : 'text-white/60'}`} />
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
  return (
    <>
      <FAQ />
      <section className="bg-[#0a0b0f] py-24 border-t border-white/5 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,212,255,0.15), transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">Ready to upgrade your trading?</h2>
          <p className="text-white/70 text-lg mt-5">Pick an indicator, plug in MT5, or join our VIP signals — it’s all built for you.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/indicators" className="inline-flex items-center justify-center px-8 py-4 rounded-md border border-white/80 text-white text-[15px] font-semibold hover:bg-white hover:text-black transition-colors min-w-[210px]">
              Browse Indicators
            </Link>
            <Link to="/mt5" className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#00d4ff] text-black text-[15px] font-semibold hover:bg-[#22ddff] transition-colors min-w-[210px] shadow-lg shadow-[#00d4ff]/20">
              Get MT5 Integration
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
