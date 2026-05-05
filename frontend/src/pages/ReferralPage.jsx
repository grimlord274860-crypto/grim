import React, { useState, useMemo } from 'react';
import { Send, Copy, Check, Users, Gift, Star, MessageCircle } from 'lucide-react';

const genCode = () =>
  'CR-' +
  Math.random().toString(36).substring(2, 6).toUpperCase() +
  Math.random().toString(36).substring(2, 6).toUpperCase();

const ReferralPage = () => {
  // generate or load existing code from localStorage
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

  const perks = [
    { icon: Gift, title: 'Free VIP Signals', text: 'Every successful sign-up via your link unlocks free signals from our VIP Telegram channel.' },
    { icon: Users, title: 'Earn Together', text: 'Your friends save money on indicators — you earn rewards. Win-win.' },
    { icon: Star, title: 'Priority Access', text: 'Active referrers get early access to new indicators and beta features.' },
  ];

  return (
    <div className="bg-[#0a0b0f]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(0,212,255,0.18), transparent 70%)' }} />
        <div className="relative max-w-[1100px] mx-auto px-6 pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-xs font-semibold tracking-wider uppercase mb-6">
            <Gift className="w-3.5 h-3.5" /> Referral Program
          </div>
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Refer & earn <span className="text-[#00d4ff]">free VIP signals</span>
          </h1>
          <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">
            Share your unique referral link — when a friend signs up through it, you both unlock
            access to our VIP Telegram channel with daily premium signals.
          </p>
        </div>
      </section>

      {/* Card */}
      <section className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="relative rounded-2xl bg-[#13151b] border border-[#00d4ff]/30 p-8 lg:p-10 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#00d4ff]/15 blur-3xl pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-white text-2xl font-bold">Your referral code</h2>
              <p className="text-white/60 text-sm mt-1">Share this code or link with friends.</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 bg-[#0a0b0f] border border-white/15 rounded-lg px-4 py-3 font-mono text-[#00d4ff] text-lg tracking-widest text-center">
                  {code}
                </div>
                <button onClick={() => copy(code)} className="px-4 py-3 rounded-lg bg-[#00d4ff] hover:bg-[#22ddff] text-black font-semibold transition-colors flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <button onClick={regen} className="mt-3 text-white/50 text-xs hover:text-[#00d4ff] transition-colors">
                Generate new code
              </button>
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold">Your referral link</h2>
              <p className="text-white/60 text-sm mt-1">Direct shareable link — click to copy.</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 bg-[#0a0b0f] border border-white/15 rounded-lg px-4 py-3 text-white/85 text-sm truncate">
                  {link}
                </div>
                <button onClick={() => copy(link)} className="px-4 py-3 rounded-lg border border-white/30 hover:border-[#00d4ff] hover:text-[#00d4ff] text-white font-semibold transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <a
                href="https://t.me/share/url"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#229ED9] hover:bg-[#1d8ec4] text-white font-semibold transition-colors"
              >
                <Send className="w-4 h-4" /> Share on Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <h2 className="text-white font-bold text-2xl sm:text-3xl text-center mb-10">What you get</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-[#13151b] border border-white/10 rounded-xl p-6 hover:border-[#00d4ff]/40 transition-colors">
                <div className="w-11 h-11 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <h3 className="text-white font-bold text-lg">{p.title}</h3>
                <p className="text-white/65 text-sm mt-2 leading-relaxed">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Telegram */}
      <section className="max-w-[1100px] mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-gradient-to-br from-[#13151b] to-[#0f1115] border border-white/10 p-8 lg:p-12 text-center">
          <MessageCircle className="w-10 h-10 text-[#00d4ff] mx-auto" />
          <h2 className="text-white font-bold text-2xl sm:text-3xl mt-4">Already referred someone?</h2>
          <p className="text-white/70 mt-3 max-w-xl mx-auto">
            Send us proof of sign-up and we’ll add you to our VIP Telegram channel with free daily signals.
          </p>
          <a
            href="https://t.me/thecryptoroom"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-7 py-4 rounded-md bg-[#00d4ff] hover:bg-[#22ddff] text-black font-semibold transition-colors shadow-lg shadow-[#00d4ff]/20"
          >
            <Send className="w-4 h-4" /> Join VIP Telegram
          </a>
        </div>
      </section>
    </div>
  );
};

export default ReferralPage;
