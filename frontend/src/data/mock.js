// Mock data for The Crypto Room

export const brand = {
  name: 'The Crypto Room',
  short: 'CryptoRoom',
  tagline: 'Smart trading signals & MT5 automation for serious traders',
};

export const navLinks = [
  { label: 'Indicators', href: '/indicators' },
  { label: 'MT5 Integration', href: '/mt5', highlight: true },
  { label: 'Referral', href: '/referral' },
  {
    label: 'Tutorials',
    href: '#tutorials',
    dropdown: [
      { label: 'Setup Guide', href: '#setup' },
      { label: 'How to use', href: '#use' },
      { label: 'Strategies', href: '#strategies' },
    ],
  },
  { label: 'Blogs', href: '#blogs' },
  { label: 'About', href: '#about' },
];

export const features = [
  {
    title: 'Simple & Effective',
    iconName: 'TrendingUp',
    description:
      'Trade using simple BUY & SELL signals, which never repaint or lag, and grow your trading experience with proven consistency.',
  },
  {
    title: 'Early & Accurate',
    iconName: 'Zap',
    description:
      'Unlike fake indicators based on lagging Moving Averages, our algorithms give the earliest and most accurate trading signals.',
  },
  {
    title: 'All Markets & Timeframes',
    iconName: 'Globe',
    description:
      'Tested and proven on every market and every timeframe. Trade stocks, crypto, forex, and everything in between.',
  },
  {
    title: 'Lifetime Access',
    iconName: 'BadgeCheck',
    description:
      'No recurring charges. Get lifetime access today for a one-time fee and never worry about another payment again.',
  },
];

export const trustedLogos = [
  {
    name: 'Stripe',
    src: 'https://gainzalgo.com/cdn/shop/files/stripe_7fea532b-2668-4d5b-bbdf-352de1648127.png?v=1667061904&width=1420',
  },
  {
    name: 'TradingView',
    src: 'https://gainzalgo.com/cdn/shop/files/tradingview.png?v=1667061920&width=1420',
  },
  {
    name: 'Discord',
    src: 'https://gainzalgo.com/cdn/shop/files/discord.png?v=1667061872&width=1420',
  },
];

export const heroChart =
  'https://gainzalgo.com/cdn/shop/files/Layer_10.png?v=1671147914&width=3840';

export const proofImages = [
  'https://gainzalgo.com/cdn/shop/files/img1.png?v=1676409298&width=3840',
  'https://gainzalgo.com/cdn/shop/files/3_1.png?v=1690503064&width=3840',
  'https://gainzalgo.com/cdn/shop/files/img3.png?v=1676409317&width=3840',
];

export const profitImages = [
  'https://gainzalgo.com/cdn/shop/files/p1.png?v=1676408365&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p10.jpg?v=1676408574&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p2.jpg?v=1676408376&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p8.png?v=1676408551&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p12.png?v=1676408593&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p4.jpg?v=1676408452&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p5.png?v=1676408482&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p9.png?v=1676408563&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p6.png?v=1676408530&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p7.jpg?v=1676408542&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p11.png?v=1676408584&width=1420',
  'https://gainzalgo.com/cdn/shop/files/p3_fa2cd928-7543-48ac-8845-44ea9ce167f9.png?v=1676408438&width=1420',
];

// Reusable image pool for indicator detail mocks
const chartImage1 = 'https://gainzalgo.com/cdn/shop/files/1.1.png?v=1690502314&width=1946';
const chartImage2 = 'https://gainzalgo.com/cdn/shop/files/3_1.png?v=1690503064&width=1946';
const chartImage3 = 'https://gainzalgo.com/cdn/shop/files/2.2.png?v=1690503063&width=1946';
const chartImage4 = 'https://gainzalgo.com/cdn/shop/files/img1.png?v=1676409298&width=3840';
const chartImage5 = 'https://gainzalgo.com/cdn/shop/files/img3.png?v=1676409317&width=3840';
const chartImage6 = 'https://gainzalgo.com/cdn/shop/files/Layer_10.png?v=1671147914&width=3840';

const sampleReviews = [
  { name: 'Eliza B.', date: 'October 17, 2025', rating: 5, text: "The accuracy and clarity are amazing. The alerts save my time and keep me safe from over trading. It's really time saving and an excellent tool!" },
  { name: 'David', date: 'April 30, 2026', rating: 4, text: 'Adapts well to different timeframes. I use it on the 4H and daily charts for swing trading and the trend detection is incredibly reliable.' },
  { name: 'Uzair', date: 'April 27, 2026', rating: 5, text: 'Pretty solid accuracy on lower timeframes. The alerts have made my life so much easier as I dont have to watch charts 24/7.' },
  { name: 'Terry', date: 'April 23, 2026', rating: 5, text: 'Customer support was friendly and guided everything about the indicator. Now I am using it for my trades — much appreciated.' },
  { name: 'Juan', date: 'February 27, 2025', rating: 5, text: 'After being let down by several other indicator sellers, this one actually delivers. Signals show on open candles, without disappearing later.' },
  { name: 'Alex', date: 'April 28, 2026', rating: 4, text: 'Setup was a bit confusing at first but the docs helped. Signals are a lot more accurate than the one I was using earlier.' },
];

export const indicators = [
  {
    id: 'no-1',
    slug: 'no-1',
    number: 1,
    name: 'Indicator No. 1',
    tagline: 'Real-time BUY & SELL signals — zero repaint, zero lag.',
    description:
      'Our flagship signal indicator built on a unique price-action algorithm. Designed to give the earliest, most accurate entries on every timeframe and every market.',
    longDescription:
      'Indicator No. 1 prints clear BUY and SELL arrows directly on your TradingView chart the moment a high-probability setup forms. It analyses momentum, volume and structure to filter noise and only fire when the conditions align. Works on stocks, crypto and forex.',
    price: 29.95,
    originalPrice: 149.95,
    discount: '80%',
    rating: 4.9,
    reviewCount: 124,
    images: [chartImage1, chartImage2, chartImage3],
    videoId: 'FSS_VBSm-vs',
    features: [
      'Real-time BUY & SELL signals on every candle',
      'Zero repainting — signals never disappear',
      'Customizable sensitivity & alerts',
      'Works on TradingView (free plan supported)',
      'Lifetime access — one-time payment',
    ],
    reviews: sampleReviews.slice(0, 4),
  },
  {
    id: 'no-2',
    slug: 'no-2',
    number: 2,
    name: 'Indicator No. 2',
    tagline: 'Trend detection with multi-timeframe confluence.',
    description:
      'Identify the dominant trend instantly with adaptive moving averages and momentum confluence across multiple timeframes.',
    longDescription:
      'Indicator No. 2 is built for swing traders. It maps higher timeframe trend direction onto your chart, only allowing entries that align with the dominant flow. Reduces overtrading and false breakouts.',
    price: 39.95,
    originalPrice: 199.95,
    discount: '80%',
    rating: 4.8,
    reviewCount: 89,
    images: [chartImage2, chartImage4, chartImage1],
    videoId: '2bP1JpQ9DCk',
    features: [
      'Multi-timeframe trend confluence',
      'Adaptive moving average engine',
      'Smart trend-strength meter',
      'TradingView alerts & webhooks',
      'Lifetime updates included',
    ],
    reviews: sampleReviews.slice(1, 5),
  },
  {
    id: 'no-3',
    slug: 'no-3',
    number: 3,
    name: 'Indicator No. 3',
    tagline: 'Scalping precision on the 1m & 5m charts.',
    description:
      'Built for scalpers. Pinpoint entries on lower timeframes with momentum bursts and exhaustion detection.',
    longDescription:
      'Indicator No. 3 thrives on the 1-minute and 5-minute charts. It detects micro-momentum shifts and prints entries with tight stop-loss zones, perfect for fast-paced crypto and forex sessions.',
    price: 34.95,
    originalPrice: 174.95,
    discount: '80%',
    rating: 4.7,
    reviewCount: 67,
    images: [chartImage3, chartImage5, chartImage2],
    videoId: 'iom_nhYQIYk',
    features: [
      'Optimised for 1m / 5m / 15m timeframes',
      'Built-in stop-loss & take-profit zones',
      'Momentum exhaustion detection',
      'Audible & push alerts',
      'Lifetime access',
    ],
    reviews: sampleReviews.slice(2, 6),
  },
  {
    id: 'no-4',
    slug: 'no-4',
    number: 4,
    name: 'Indicator No. 4',
    tagline: 'Smart Money Concepts — order blocks & liquidity zones.',
    description:
      'Visualise institutional order flow with automatic order block detection, fair value gaps and liquidity sweeps.',
    longDescription:
      'Indicator No. 4 plots key SMC levels in real time — order blocks, breakers, FVGs and liquidity pools — so you can trade with the institutions instead of against them.',
    price: 49.95,
    originalPrice: 249.95,
    discount: '80%',
    rating: 4.9,
    reviewCount: 152,
    images: [chartImage4, chartImage1, chartImage6],
    videoId: 'TfxPCpw1f60',
    features: [
      'Automatic order block detection',
      'Fair Value Gap (FVG) zones',
      'Liquidity sweep alerts',
      'Premium / discount visualisation',
      'Lifetime updates',
    ],
    reviews: sampleReviews.slice(0, 4),
  },
  {
    id: 'no-5',
    slug: 'no-5',
    number: 5,
    name: 'Indicator No. 5',
    tagline: 'Volume profile & VWAP confluence.',
    description:
      'See where the real volume is. Auto-anchored VWAP, session volume profile and high/low volume nodes on every chart.',
    longDescription:
      'Indicator No. 5 fuses volume profile with VWAP to highlight the levels institutions actually defend. Perfect for confirming setups and timing reversals.',
    price: 44.95,
    originalPrice: 224.95,
    discount: '80%',
    rating: 4.8,
    reviewCount: 73,
    images: [chartImage5, chartImage3, chartImage4],
    videoId: '6IUhXLBDTRE',
    features: [
      'Session & visible-range volume profile',
      'Auto-anchored VWAP with bands',
      'High/low volume node detection',
      'Multi-symbol support',
      'Lifetime access',
    ],
    reviews: sampleReviews.slice(1, 5),
  },
  {
    id: 'no-6',
    slug: 'no-6',
    number: 6,
    name: 'Indicator No. 6',
    tagline: 'All-in-one dashboard — every tool in one indicator.',
    description:
      'The complete bundle. Signals, trend, SMC, volume and scalping logic combined into one customisable dashboard.',
    longDescription:
      'Indicator No. 6 is the all-in-one suite — every tool from No. 1 through No. 5 unified into a single dashboard with toggleable modules so you can build your perfect chart.',
    price: 79.95,
    originalPrice: 399.95,
    discount: '80%',
    rating: 5.0,
    reviewCount: 211,
    images: [chartImage6, chartImage1, chartImage5],
    videoId: 'jNQXAC9IVRw',
    features: [
      'Every module from No. 1 – No. 5',
      'Single unified dashboard',
      'Module toggles (signals, SMC, volume, trend)',
      'Priority support & onboarding',
      'Lifetime access — one payment',
    ],
    reviews: sampleReviews,
  },
];

export const mt5Plans = [
  {
    id: 'starter',
    name: 'Starter',
    signalsPerDay: 3,
    price: 99,
    period: 'month',
    description: 'Perfect for new traders getting started with automation.',
    features: [
      '3 high-conviction signals per day',
      'Direct MT5 auto-execution',
      'Risk management controls',
      'Email & Telegram alerts',
      'Standard support',
    ],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    signalsPerDay: 5,
    price: 179,
    period: 'month',
    description: 'Most popular — ideal for active traders.',
    features: [
      '5 high-conviction signals per day',
      'Direct MT5 auto-execution',
      'Advanced risk & trailing-stop logic',
      'Multi-pair support',
      'Priority support',
    ],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    signalsPerDay: 8,
    price: 299,
    period: 'month',
    description: 'For full-time traders who want maximum coverage.',
    features: [
      '8 high-conviction signals per day',
      'Direct MT5 auto-execution',
      'Custom risk profile & lot sizing',
      'Multi-account / Multi-pair support',
      '1-on-1 onboarding & VIP support',
    ],
    popular: false,
  },
];

export const reviews = sampleReviews.concat([
  { name: 'Matt', date: 'April 29, 2026', rating: 5, text: 'No lag or repaint at all. Performance has been a real surprise after only a few days of use.' },
  { name: 'Willem', date: 'October 22, 2025', rating: 5, text: 'Helping a lot in my trades — I know where to enter and where to exit without being greedy. Customer support is just amazing.' },
  { name: 'Richard', date: 'April 22, 2026', rating: 5, text: 'Working as advertised. Very happy with the performance on gold lower timeframes. It even works on TradingView basic accounts.' },
  { name: 'Sara Ricci', date: 'May 19, 2025', rating: 5, text: 'I appreciate that they are open and share live demos on Twitter. The Crypto Room is the only company I feel confident with.' },
]);

export const faqs = [
  {
    question: 'How and when will I receive my indicator?',
    answer: 'After a successful purchase, you will receive instant access on TradingView. Check out our setup tutorial to activate your indicator.',
  },
  {
    question: 'Do I need a special program to use the indicators?',
    answer: "Yes, our indicators run on TradingView, which is completely free of charge. (You don't need a premium TradingView account.)",
  },
  {
    question: 'What can I trade using these indicators?',
    answer: "Anything and everything — stocks, crypto or forex. Our indicators analyse the technical side of markets, which all of them share.",
  },
  {
    question: 'Still have a question?',
    answer: 'If you have any other questions, please do not hesitate to contact us via live chat. We only provide real human support, no bots.',
  },
];
