import React, { useState } from 'react';
import { Check, Cpu, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { mt5Plans } from '../data/mock';

const MT5Page = () => {
  const [billing, setBilling] = useState('monthly'); // monthly | yearly (mock)

  const handleSelect = (plan) => {
    alert(`Selected ${plan.name} plan — $${plan.price}/${plan.period} (mock checkout)`);
  };

  const howItWorks = [
    { icon: Cpu, title: 'Connect your MT5', text: 'Link your MetaTrader 5 account in under 2 minutes via our secure bridge.' },
    { icon: Zap, title: 'Receive auto-signals', text: 'Our algo scans markets 24/7 and pushes high-conviction trades straight to MT5.' },
    { icon: Shield, title: 'Stay in control', text: 'Risk limits, lot sizing and a kill-switch — you set the rules, the bot follows.' },
  ];

  return (
    <div className="bg-[#0a0b0f]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.18), transparent 70%)' }} />
        <div className="relative max-w-[1200px] mx-auto px-6 pt-20 pb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Direct MT5 Auto-Execution
          </div>
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Trade on autopilot with <span className="text-[#00d4ff]">MT5 Integration</span>
          </h1>
          <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">
            Connect your MetaTrader 5 account directly to our signal engine. Get high-conviction
            trades executed automatically — no manual entries, no missed moves.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative bg-[#13151b] border border-white/10 rounded-xl p-6 hover:border-[#00d4ff]/40 transition-colors">
                <span className="absolute -top-3 left-6 px-2.5 py-0.5 text-[10px] font-bold rounded bg-[#00d4ff] text-black tracking-wider">STEP {i + 1}</span>
                <div className="w-11 h-11 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#00d4ff]" />
                </div>
                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                <p className="text-white/65 text-sm mt-2 leading-relaxed">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-white font-bold text-3xl sm:text-4xl">Pick your plan</h2>
          <p className="text-white/65 mt-3">More signals per day = more opportunities. Cancel anytime.</p>
          <div className="inline-flex items-center mt-6 bg-[#13151b] border border-white/10 rounded-full p-1">
            {['monthly', 'yearly'].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-5 py-2 text-sm font-semibold rounded-full capitalize transition-colors ${
                  billing === b ? 'bg-[#00d4ff] text-black' : 'text-white/70 hover:text-white'
                }`}
              >
                {b}{b === 'yearly' && <span className="ml-1.5 text-[10px] opacity-80">-20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {mt5Plans.map((plan) => {
            const displayPrice =
              billing === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price;
            const displayPeriod = billing === 'yearly' ? 'year' : 'month';
            return (
              <div
                key={plan.id}
                className={`relative bg-[#13151b] rounded-2xl p-7 border transition-colors flex flex-col ${
                  plan.popular
                    ? 'border-[#00d4ff] shadow-2xl shadow-[#00d4ff]/10'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00d4ff] text-black text-[11px] font-bold tracking-wider">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-white font-bold text-2xl">{plan.name}</h3>
                <p className="text-white/60 text-sm mt-1">{plan.description}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-white text-5xl font-bold">${displayPrice}</span>
                  <span className="text-white/50 text-sm pb-2">/ {displayPeriod}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-[#00d4ff] text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  {plan.signalsPerDay} signals / day
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-white/85 text-sm">
                      <Check className="w-4 h-4 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelect(plan)}
                  className={`mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-[#00d4ff] hover:bg-[#22ddff] text-black shadow-lg shadow-[#00d4ff]/20'
                      : 'border border-white/30 hover:border-[#00d4ff] hover:text-[#00d4ff] text-white'
                  }`}
                >
                  Get {plan.name} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust strip */}
      <section className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-[#13151b] to-[#0f1115] border border-white/10 p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-[#00d4ff] text-3xl font-bold">99.9%</p>
              <p className="text-white/65 text-sm mt-1">Execution uptime</p>
            </div>
            <div>
              <p className="text-[#00d4ff] text-3xl font-bold">&lt; 100ms</p>
              <p className="text-white/65 text-sm mt-1">Signal-to-fill latency</p>
            </div>
            <div>
              <p className="text-[#00d4ff] text-3xl font-bold">2,400+</p>
              <p className="text-white/65 text-sm mt-1">Active MT5 accounts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MT5Page;
