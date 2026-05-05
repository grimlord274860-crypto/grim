import React from 'react';
import { TrendingUp, Zap, Globe, BadgeCheck } from 'lucide-react';
import { features } from '../data/mock';

const iconMap = {
  TrendingUp: TrendingUp,
  Zap: Zap,
  Globe: Globe,
  BadgeCheck: BadgeCheck,
};

const Features = () => {
  return (
    <section className="bg-[#0a0b0f] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-white font-bold text-center text-3xl sm:text-4xl lg:text-5xl mb-16">
          Reasons to choose GainzAlgo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feat) => {
            const Icon = iconMap[feat.iconName];
            return (
              <div
                key={feat.title}
                className="group relative bg-[#13151b] border border-white/10 rounded-xl p-8 hover:border-[#00d34d]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-[#00d34d]/10 flex items-center justify-center">
                    {Icon && <Icon className="w-6 h-6 text-[#00d34d]" strokeWidth={2.2} />}
                  </div>
                  <h3 className="text-white font-bold text-xl lg:text-2xl">{feat.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
