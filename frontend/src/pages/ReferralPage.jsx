import React, { useState, useMemo } from 'react';
import { Send, Copy, Check, Users, Gift, Star, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { withOpacity } from '../theme';

const ICONS = { Gift, Users, Star, Send, MessageCircle };

const genCode = () =>
  'CR-' + Math.random().toString(36).substring(2, 6).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();

const ReferralPage = () => {
  const { content } = useSite();
  const page = content?.referralPage || {};
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';

  const initial = useMemo(() => {
    const saved = localStorage.getItem('referral_code');
    if (saved) return saved;
    const c = genCode();
    localStorage.setItem('referral_code', c);
    return c;
  }, []);
  const [code, setCode] = useState(initial);
  const [copied, setCopied] = useState(false);

  const link = `${window.location.origin}/?ref=${code}`;

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const regen = () => {
    const c = genCode();
    localStorage.setItem('referral_code', c);
    setCode(c);
  };

  return (
    <div style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse 50% 60% at 50% 0%, ${withOpacity(primary, 0.18)}, transparent 70%)` }} />
        <div className="relative max-w-[1100px] mx-auto px-6 pt-20 pb-12 text-center">
          {page.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6" style={{ background: withOpacity(primary, 0.1), border: `1px solid ${withOpacity(primary, 0.3)}`, color: primary }}>
              <Gift className="w-3.5 h-3.5" /> {page.badge}
            </div>
          )}
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            {page.title?.replace(page.titleAccent, '').trim()} <span style={{ color: primary }}>{page.titleAccent}</span>
          </h1>
          {page.subtitle && <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">{page.subtitle}</p>}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="relative rounded-2xl bg-[#13151b] p-8 lg:p-10 overflow-hidden" style={{ border: `1px solid ${withOpacity(primary, 0.3)}` }}>
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: withOpacity(primary, 0.15) }} />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-white text-2xl font-bold">Your referral code</h2>
              <p className="text-white/60 text-sm mt-1">Share this code or link with friends.</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 bg-[#0a0b0f] border border-white/15 rounded-lg px-4 py-3 font-mono text-lg tracking-widest text-center" style={{ color: primary }}>{code}</div>
                <button onClick={() => copy(code)} className="px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2" style={{ background: primary, color: '#000' }}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <button onClick={regen} className="mt-3 text-white/50 text-xs transition-colors" onMouseEnter={(e)=>e.currentTarget.style.color=primary} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
                Generate new code
              </button>
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold">Your referral link</h2>
              <p className="text-white/60 text-sm mt-1">Direct shareable link.</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 bg-[#0a0b0f] border border-white/15 rounded-lg px-4 py-3 text-white/85 text-sm truncate">{link}</div>
                <button onClick={() => copy(link)} className="px-4 py-3 rounded-lg border border-white/30 text-white font-semibold transition-colors" onMouseEnter={(e)=>{e.currentTarget.style.borderColor=primary;e.currentTarget.style.color=primary;}} onMouseLeave={(e)=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.3)';e.currentTarget.style.color='#fff';}}>
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {page.telegramShareUrl && (
                <a href={page.telegramShareUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#229ED9] hover:bg-[#1d8ec4] text-white font-semibold transition-colors">
                  <Send className="w-4 h-4" /> Share on Telegram
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {page.perks?.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-6 pb-16">
          <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-10">What you get</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {page.perks.map((p, i) => {
              const Icon = ICONS[p.icon] || Gift;
              return (
                <div key={i} className="bg-[#13151b] border border-white/10 rounded-xl p-6 transition-colors" onMouseEnter={(e)=>e.currentTarget.style.borderColor=withOpacity(primary,0.4)} onMouseLeave={(e)=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}>
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: withOpacity(primary, 0.1) }}>
                    <Icon className="w-5 h-5" style={{ color: primary }} />
                  </div>
                  <h3 className="text-white font-bold text-lg">{p.title}</h3>
                  <p className="text-white/65 text-sm mt-2 leading-relaxed">{p.text}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {page.telegramUrl && (
        <section className="max-w-[1100px] mx-auto px-6 pb-24">
          <div className="rounded-2xl bg-gradient-to-br from-[#13151b] to-[#0f1115] border border-white/10 p-8 lg:p-12 text-center">
            <MessageCircle className="w-10 h-10 mx-auto" style={{ color: primary }} />
            <h2 className="text-white font-bold text-2xl sm:text-3xl mt-4">Already referred someone?</h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">Send us proof of sign-up and we’ll add you to our VIP Telegram channel with free daily signals.</p>
            <a href={page.telegramUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 px-7 py-4 font-semibold transition-colors shadow-lg" style={{ background: primary, color: '#000', borderRadius: theme.buttonRadius || '8px', boxShadow: `0 8px 24px ${withOpacity(primary, 0.2)}` }}>
              <Send className="w-4 h-4" /> Join VIP Telegram
            </a>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReferralPage;
