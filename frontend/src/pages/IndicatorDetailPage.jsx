import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, ChevronLeft, Check, ShoppingCart, Play, Zap } from 'lucide-react';
import { indicators } from '../data/mock';
import { Stars } from '../components/Reviews';

const IndicatorDetailPage = () => {
  const { slug } = useParams();
  const indicator = indicators.find((i) => i.slug === slug);
  const [activeImg, setActiveImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  if (!indicator) return <Navigate to="/indicators" replace />;

  const handleAddToCart = () => {
    // mock add-to-cart — stored in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id: indicator.id, name: indicator.name, price: indicator.price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${indicator.name} added to cart (mock).`);
  };

  return (
    <div className="bg-[#0a0b0f]">
      <div className="max-w-[1400px] mx-auto px-6 pt-8">
        <Link to="/indicators" className="inline-flex items-center gap-1 text-white/60 hover:text-[#00d4ff] text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to Indicators
        </Link>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0f1115] aspect-[16/10]">
              {showVideo ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${indicator.videoId}?autoplay=1`}
                  title={`${indicator.name} demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <img src={indicator.images[activeImg]} alt={indicator.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                    aria-label="Play demo video"
                  >
                    <span className="w-16 h-16 rounded-full bg-[#00d4ff] text-black flex items-center justify-center shadow-lg shadow-[#00d4ff]/40 group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 ml-1" fill="currentColor" />
                    </span>
                  </button>
                  <span className="absolute bottom-3 right-3 text-xs bg-black/60 backdrop-blur px-2 py-1 rounded text-white/90">
                    Watch demo
                  </span>
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {indicator.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => { setShowVideo(false); setActiveImg(i); }}
                  className={`rounded-lg overflow-hidden border ${activeImg === i && !showVideo ? 'border-[#00d4ff]' : 'border-white/10 hover:border-white/30'} transition-colors aspect-[16/10]`}
                >
                  <img src={src} alt={`${indicator.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 text-[#00d4ff] text-xs font-semibold tracking-wider uppercase mb-3">
              <Zap className="w-3.5 h-3.5" /> Indicator No. {indicator.number}
            </div>
            <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
              {indicator.name}
            </h1>
            <p className="text-white/70 text-lg mt-3">{indicator.tagline}</p>

            <div className="flex items-center gap-3 mt-5">
              <Stars rating={indicator.rating} />
              <span className="text-white font-semibold">{indicator.rating}</span>
              <span className="text-white/50 text-sm">({indicator.reviewCount} reviews)</span>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-white text-4xl font-bold">${indicator.price.toFixed(2)}</span>
              <span className="text-white/40 text-lg line-through">${indicator.originalPrice.toFixed(2)}</span>
              <span className="px-2 py-1 rounded bg-[#00d4ff] text-black text-xs font-bold">{indicator.discount} OFF</span>
            </div>

            <p className="text-white/70 mt-6 leading-relaxed">{indicator.longDescription}</p>

            <ul className="mt-6 space-y-2.5">
              {indicator.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-white/85">
                  <Check className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-[#00d4ff] text-black font-semibold hover:bg-[#22ddff] transition-colors shadow-lg shadow-[#00d4ff]/20"
              >
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center px-7 py-4 rounded-md border border-white/80 text-white font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
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
                <Stars rating={r.rating} />
              </div>
              <p className="text-white/75 text-sm leading-relaxed">{r.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IndicatorDetailPage;
