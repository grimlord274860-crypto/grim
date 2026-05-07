import React, { useState } from 'react';
import { Check, Cpu, Zap, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { withOpacity } from '../theme';
import { toast } from '../components/Toaster';

const ICONS = { Cpu, Zap, Shield, Sparkles };

const MT5Page = () => {
  const { content } = useSite();
  const page = content?.mt5Page || {};
  const plans = content?.mt5Plans || [];
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';
  const [billing, setBilling] = useState('monthly');
  const { requireAuth } = useCustomerAuth();

  const handleSelect = (plan) => {
    requireAuth(() => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ id: plan.id, name: `${plan.name} plan`, price: plan.price });
      localStorage.setItem('cart', JSON.stringify(cart));
      toast(`${plan.name} plan added — $${plan.price}/${plan.period}`);
    }, 'login');
  };

  return (
    <div style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${withOpacity(primary, 0.18)}, transparent 70%)` }} />
        <div className="relative max-w-[1200px] mx-auto px-6 pt-20 pb-10 text-center">
          {page.badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6" style={{ background: withOpacity(primary, 0.1), border: `1px solid ${withOpacity(primary, 0.3)}`, color: primary }}>
              <Sparkles className="w-3.5 h-3.5" /> {page.badge}
            </div>
          )}
          <h1 className="text-white font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            {page.title?.replace(page.titleAccent, '').trim()} <span style={{ color: primary }}>{page.titleAccent}</span>
          </h1>
          {page.subtitle && <p className="text-white/70 text-lg mt-5 max-w-2xl mx-auto">{page.subtitle}</p>}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(page.howItWorks || []).map((step, i) => {
            const Icon = ICONS[step.icon] || Cpu;
            return (
              <div key={i} className="relative bg-[#13151b] border border-white/10 rounded-xl p-6 transition-colors" onMouseEnter={(e)=>e.currentTarget.style.borderColor = withOpacity(primary,0.4)} onMouseLeave={(e)=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'}>
                <span className="absolute -top-3 left-6 px-2.5 py-0.5 text-[10px] font-bold rounded tracking-wider" style={{ background: primary, color: '#000' }}>STEP {i + 1}</span>
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4" style={{ background: withOpacity(primary, 0.1) }}>
                  <Icon className="w-5 h-5" style={{ color: primary }} />
                </div>
                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                <p className="text-white/65 text-sm mt-2 leading-relaxed">{step.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-white font-bold text-3xl sm:text-4xl">Pick your plan</h2>
          <p className="text-white/65 mt-3">More signals per day = more opportunities. Cancel anytime.</p>
          <div className="inline-flex items-center mt-6 bg-[#13151b] border border-white/10 rounded-full p-1">
            {['monthly', 'yearly'].map((b) => (
              <button key={b} onClick={() => setBilling(b)} className="px-5 py-2 text-sm font-semibold rounded-full capitalize transition-colors" style={billing === b ? { background: primary, color: '#000' } : { color: 'rgba(255,255,255,0.7)' }}>
                {b}{b === 'yearly' && <span className="ml-1.5 text-[10px] opacity-80">-20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const s = plan.style || {};
            const accent = s.accent || primary;
            const displayPrice = billing === 'yearly' ? Math.round(plan.price * 12 * 0.8) : plan.price;
            const displayPeriod = billing === 'yearly' ? 'year' : (plan.period || 'month');
            return (
              <div key={plan.id || plan.name} className="relative p-7 transition-colors flex flex-col" style={{ background: s.bg || theme.surfaceColor || '#13151b', border: `1px solid ${plan.popular ? accent : (s.border || theme.borderColor || '#ffffff1a')}`, borderRadius: s.radius || theme.radius || '16px', boxShadow: plan.popular ? `0 16px 64px ${withOpacity(accent, 0.1)}` : 'none' }}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider" style={{ background: accent, color: '#000' }}>MOST POPULAR</span>
                )}
                <h3 className="text-white font-bold text-2xl">{plan.name}</h3>
                <p className="text-white/60 text-sm mt-1">{plan.description}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="text-white text-5xl font-bold">${displayPrice}</span>
                  <span className="text-white/50 text-sm pb-2">/ {displayPeriod}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: accent }}>
                  <Zap className="w-4 h-4" />
                  {plan.signalsPerDay} signals / day
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {(plan.features || []).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-white/85 text-sm">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleSelect(plan)} className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold transition-colors" style={plan.popular ? { background: accent, color: '#000', borderRadius: theme.buttonRadius || '8px', boxShadow: `0 8px 24px ${withOpacity(accent, 0.2)}` } : { border: '1px solid rgba(255,255,255,0.3)', color: '#fff', borderRadius: theme.buttonRadius || '8px' }}>
                  Get {plan.name} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {(page.stats?.length > 0) && (
        <section className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="rounded-2xl bg-gradient-to-br from-[#13151b] to-[#0f1115] border border-white/10 p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {page.stats.map((st, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold" style={{ color: primary }}>{st.value}</p>
                  <p className="text-white/65 text-sm mt-1">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MT5Page;
