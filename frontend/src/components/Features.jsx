import React from 'react';
import { TrendingUp, Zap, Globe, BadgeCheck, ShieldCheck, Cpu, Star, Gift, Users, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { withOpacity } from '../theme';

const ICONS = { TrendingUp, Zap, Globe, BadgeCheck, ShieldCheck, Cpu, Star, Gift, Users, Sparkles };

const Features = () => {
  const { content } = useSite();
  const data = content?.features || { items: [] };
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';

  return (
    <section className="py-20 lg:py-28" style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-white font-bold text-center text-3xl sm:text-4xl lg:text-5xl mb-16">{data.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {(data.items || []).map((feat, i) => {
            const Icon = ICONS[feat.icon] || TrendingUp;
            const s = feat.style || {};
            return (
              <div
                key={i}
                className="group relative p-8 transition-colors"
                style={{
                  background: s.bg || theme.surfaceColor || '#13151b',
                  color: s.text || '#fff',
                  border: `1px solid ${s.border || theme.borderColor || '#ffffff1a'}`,
                  borderRadius: s.radius || theme.radius || '12px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = withOpacity(s.accent || primary, 0.4))}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = s.border || theme.borderColor || '#ffffff1a')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: withOpacity(s.accent || primary, 0.1) }}>
                    <Icon className="w-6 h-6" style={{ color: s.accent || primary }} strokeWidth={2.2} />
                  </div>
                  <h3 className="font-bold text-xl lg:text-2xl" style={{ color: s.text || '#fff' }}>{feat.title}</h3>
                </div>
                <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
