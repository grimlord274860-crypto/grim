import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Check, ShoppingCart, Play, Zap } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { Stars } from '../components/Reviews';
import { withOpacity } from '../theme';
import { toast } from '../components/Toaster';

const IndicatorDetailPage = () => {
  const { slug } = useParams();
  const { content } = useSite();
  const indicator = (content?.indicators || []).find((i) => i.slug === slug);
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';
  const [activeImg, setActiveImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const { requireAuth } = useCustomerAuth();

  if (!content) return null;
  if (!indicator) return <Navigate to="/indicators" replace />;

  const s = indicator.style || {};
  const accent = s.accent || primary;

  const performAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: indicator.id, name: indicator.name, price: indicator.price });
    localStorage.setItem('cart', JSON.stringify(cart));
    toast(`${indicator.name} added to cart`);
  };

  const handleAddToCart = () => {
    requireAuth(performAddToCart, 'login');
  };

  return (
    <div style={{ background: theme.backgroundColor || '#0a0b0f' }}>
      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <Link to="/indicators" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm transition-colors" onMouseEnter={(e)=>e.currentTarget.style.color=accent} onMouseLeave={(e)=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}>
          <ChevronLeft className="w-4 h-4" /> Back to Indicators
        </Link>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="relative overflow-hidden border bg-[#0f1115] aspect-[16/10]" style={{ borderColor: s.border || theme.borderColor || '#ffffff1a', borderRadius: s.radius || theme.radius || '12px' }}>
              {showVideo && indicator.videoId ? (
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${indicator.videoId}?autoplay=1`} title={`${indicator.name} demo`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
              ) : (
                <>
                  {indicator.images?.[activeImg] && <img src={indicator.images[activeImg]} alt={indicator.name} className="w-full h-full object-cover" />}
                  {indicator.videoId && (
                    <button onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center group" aria-label="Play demo">
                      <span className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform" style={{ background: accent, color: '#000', boxShadow: `0 8px 32px ${withOpacity(accent, 0.4)}` }}>
                        <Play className="w-7 h-7 ml-1" fill="currentColor" />
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
            {indicator.images?.length > 1 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {indicator.images.map((src, i) => (
                  <button key={i} onClick={() => { setShowVideo(false); setActiveImg(i); }} className="rounded-lg overflow-hidden border transition-colors aspect-[16/10]" style={{ borderColor: activeImg === i && !showVideo ? accent : 'rgba(255,255,255,0.1)' }}>
                    <img src={src} alt={`${indicator.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: accent }}>
              <Zap className="w-3.5 h-3.5" /> Indicator No. {indicator.number}
            </div>
            <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">{indicator.name}</h1>
            {indicator.tagline && <p className="text-white/70 text-lg mt-3">{indicator.tagline}</p>}

            <div className="flex items-center gap-3 mt-5">
              <Stars rating={indicator.rating} color={accent} />
              <span className="text-white font-semibold">{indicator.rating}</span>
              <span className="text-white/50 text-sm">({indicator.reviewCount} reviews)</span>
            </div>

            <div className="mt-6 flex items-end gap-3 flex-wrap">
              <span className="text-white text-4xl font-bold">${Number(indicator.price).toFixed(2)}</span>
              {indicator.originalPrice && <span className="text-white/40 text-lg line-through">${Number(indicator.originalPrice).toFixed(2)}</span>}
              {indicator.discount && <span className="px-2 py-1 rounded text-xs font-bold" style={{ background: accent, color: '#000' }}>{indicator.discount} OFF</span>}
            </div>

            {indicator.longDescription && <p className="text-white/70 mt-6 leading-relaxed">{indicator.longDescription}</p>}

            {indicator.features?.length > 0 && (
              <ul className="mt-6 space-y-2.5">
                {indicator.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/85">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} className="inline-flex items-center justify-center gap-2 px-7 py-4 font-semibold transition-colors shadow-lg" style={{ background: accent, color: '#000', borderRadius: theme.buttonRadius || '8px', boxShadow: `0 8px 24px ${withOpacity(accent, 0.2)}` }}>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button onClick={handleAddToCart} className="inline-flex items-center justify-center px-7 py-4 border border-white/80 text-white font-semibold hover:bg-white hover:text-black transition-colors" style={{ borderRadius: theme.buttonRadius || '8px' }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {indicator.reviews?.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 pb-24">
          <h2 className="text-white font-bold text-2xl sm:text-3xl mb-8">Customer reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {indicator.reviews.map((r, i) => (
              <article key={i} className="bg-[#13151b] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{r.name}</h4>
                    <p className="text-white/50 text-xs mt-0.5">{r.date}</p>
                  </div>
                  <Stars rating={r.rating} color={accent} />
                </div>
                <p className="text-white/75 text-sm leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default IndicatorDetailPage;
