"""Initial seed content for the CryptoRoom CMS.
This is loaded into MongoDB the first time the backend starts.
Every field here can be edited from the admin panel.
Every item also supports a `style` block that overrides default colors / radius.
"""

# Default style applied if a per-item override is not present.
DEFAULT_STYLE = {
    "bg": "#13151b",
    "text": "#ffffff",
    "accent": "#00d4ff",
    "border": "#ffffff1a",
    "radius": "12px",
}

INITIAL_CONTENT = {
    "theme": {
        "primaryColor": "#00d4ff",
        "backgroundColor": "#0a0b0f",
        "surfaceColor": "#13151b",
        "textColor": "#ffffff",
        "mutedTextColor": "#ffffffb3",
        "borderColor": "#ffffff1a",
        "radius": "12px",
        "buttonRadius": "8px",
        "font": "Inter",
    },
    "brand": {
        "name": "The Crypto Room",
        "tagline": "Smart trading signals & MT5 automation for serious traders",
        "logoIcon": "Boxes",
    },
    "header": {
        "promoText": "Ending soon: Get our indicators for 80% off",
        "promoBg": "#00d4ff",
        "promoTextColor": "#000000",
        "navLinks": [
            {"label": "Indicators", "href": "/indicators"},
            {"label": "MT5 Integration", "href": "/mt5"},
            {"label": "Referral", "href": "/referral"},
            {"label": "Tutorials", "href": "#tutorials"},
            {"label": "Blogs", "href": "#blogs"},
            {"label": "About", "href": "#about"},
        ],
    },
    "hero": {
        "badgeText": "New \u2014 MT5 Auto-Execution",
        "title": "The Crypto Room",
        "titleAccent": "Smart Trading Signals",
        "subtitle": "Premium indicators, MT5 auto-execution and a VIP signals channel \u2014 built for traders who don\u2019t want to miss moves.",
        "primaryCta": {"label": "Browse Indicators", "href": "/indicators"},
        "secondaryCta": {"label": "MT5 Integration", "href": "/mt5"},
        "image": "https://gainzalgo.com/cdn/shop/files/Layer_10.png?v=1671147914&width=3840",
        "style": {**DEFAULT_STYLE, "bg": "#0a0b0f"},
    },
    "features": {
        "title": "Why traders choose us",
        "items": [
            {"title": "Simple & Effective", "icon": "TrendingUp", "description": "Trade using simple BUY & SELL signals, which never repaint or lag, and grow your trading experience with proven consistency.", "style": DEFAULT_STYLE},
            {"title": "Early & Accurate", "icon": "Zap", "description": "Unlike fake indicators based on lagging Moving Averages, our algorithms give the earliest and most accurate trading signals.", "style": DEFAULT_STYLE},
            {"title": "All Markets & Timeframes", "icon": "Globe", "description": "Tested and proven on every market and every timeframe. Trade stocks, crypto, forex, and everything in between.", "style": DEFAULT_STYLE},
            {"title": "Lifetime Access", "icon": "BadgeCheck", "description": "No recurring charges. Get lifetime access today for a one-time fee and never worry about another payment again.", "style": DEFAULT_STYLE},
        ],
    },
    "trustedLogos": {
        "title": "Trusted by thousands of traders",
        "items": [
            {"name": "Stripe", "src": "https://gainzalgo.com/cdn/shop/files/stripe_7fea532b-2668-4d5b-bbdf-352de1648127.png?v=1667061904&width=1420"},
            {"name": "TradingView", "src": "https://gainzalgo.com/cdn/shop/files/tradingview.png?v=1667061920&width=1420"},
            {"name": "Discord", "src": "https://gainzalgo.com/cdn/shop/files/discord.png?v=1667061872&width=1420"},
        ],
    },
    "proof": {
        "title": "We show real proof",
        "subtitle": "Unlike our competitors, we don't try to make our indicator's signals look amazing - they are amazing.",
        "highlight": "To succeed in trading, you need the right tools. We empower you to capitalize on market opportunities and join the ranks of successful traders.",
        "images": [
            "https://gainzalgo.com/cdn/shop/files/img1.png?v=1676409298&width=3840",
            "https://gainzalgo.com/cdn/shop/files/3_1.png?v=1690503064&width=3840",
            "https://gainzalgo.com/cdn/shop/files/img3.png?v=1676409317&width=3840",
        ],
    },
    "profits": {
        "title": "Profits made by our traders",
        "images": [
            "https://gainzalgo.com/cdn/shop/files/p1.png?v=1676408365&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p10.jpg?v=1676408574&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p2.jpg?v=1676408376&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p8.png?v=1676408551&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p12.png?v=1676408593&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p4.jpg?v=1676408452&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p5.png?v=1676408482&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p9.png?v=1676408563&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p6.png?v=1676408530&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p7.jpg?v=1676408542&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p11.png?v=1676408584&width=1420",
            "https://gainzalgo.com/cdn/shop/files/p3_fa2cd928-7543-48ac-8845-44ea9ce167f9.png?v=1676408438&width=1420",
        ],
    },
    "reviewsSection": {
        "title": "What our customers say",
        "averageRating": 4.8,
        "totalReviews": 46,
        "items": [
            {"name": "Eliza B.", "date": "October 17, 2025", "rating": 5, "text": "The accuracy and clarity are amazing. The alerts save my time and keep me safe from over trading. It's really time saving and an excellent tool!"},
            {"name": "David", "date": "April 30, 2026", "rating": 4, "text": "Adapts well to different timeframes. I use it on the 4H and daily charts for swing trading and the trend detection is incredibly reliable."},
            {"name": "Uzair", "date": "April 27, 2026", "rating": 5, "text": "Pretty solid accuracy on lower timeframes. The alerts have made my life so much easier as I dont have to watch charts 24/7."},
            {"name": "Terry", "date": "April 23, 2026", "rating": 5, "text": "Customer support was friendly and guided everything about the indicator. Now I am using it for my trades \u2014 much appreciated."},
            {"name": "Juan", "date": "February 27, 2025", "rating": 5, "text": "After being let down by several other indicator sellers, this one actually delivers. Signals show on open candles, without disappearing later."},
            {"name": "Alex", "date": "April 28, 2026", "rating": 4, "text": "Setup was a bit confusing at first but the docs helped. Signals are a lot more accurate than the one I was using earlier."},
            {"name": "Matt", "date": "April 29, 2026", "rating": 5, "text": "No lag or repaint at all. Performance has been a real surprise after only a few days of use."},
            {"name": "Willem", "date": "October 22, 2025", "rating": 5, "text": "Helping a lot in my trades. Customer support is just amazing."},
            {"name": "Sara Ricci", "date": "May 19, 2025", "rating": 5, "text": "I appreciate that they are open and share live demos on Twitter. The Crypto Room is the only company I feel confident with."},
        ],
    },
    "faqs": [
        {"question": "How and when will I receive my indicator?", "answer": "After a successful purchase, you will receive instant access on TradingView. Check out our setup tutorial to activate your indicator."},
        {"question": "Do I need a special program to use the indicators?", "answer": "Yes, our indicators run on TradingView, which is completely free of charge. (You don't need a premium TradingView account.)"},
        {"question": "What can I trade using these indicators?", "answer": "Anything and everything \u2014 stocks, crypto or forex. Our indicators analyse the technical side of markets, which all of them share."},
        {"question": "Still have a question?", "answer": "If you have any other questions, please do not hesitate to contact us via live chat. We only provide real human support, no bots."},
    ],
    "cta": {
        "title": "Ready to upgrade your trading?",
        "subtitle": "Pick an indicator, plug in MT5, or join our VIP signals \u2014 it\u2019s all built for you.",
        "primaryCta": {"label": "Browse Indicators", "href": "/indicators"},
        "secondaryCta": {"label": "Get MT5 Integration", "href": "/mt5"},
    },
    "indicatorsPage": {
        "badge": "Premium Indicators",
        "title": "Our Indicators",
        "titleAccent": "Indicators",
        "subtitle": "Pick the indicator that matches your trading style. Every one is no-repaint, no-lag and works on TradingView for free.",
    },
    "indicators": [],  # populated below
    "mt5Page": {
        "badge": "Direct MT5 Auto-Execution",
        "title": "Trade on autopilot with MT5 Integration",
        "titleAccent": "MT5 Integration",
        "subtitle": "Connect your MetaTrader 5 account directly to our signal engine. Get high-conviction trades executed automatically \u2014 no manual entries, no missed moves.",
        "howItWorks": [
            {"icon": "Cpu", "title": "Connect your MT5", "text": "Link your MetaTrader 5 account in under 2 minutes via our secure bridge."},
            {"icon": "Zap", "title": "Receive auto-signals", "text": "Our algo scans markets 24/7 and pushes high-conviction trades straight to MT5."},
            {"icon": "Shield", "title": "Stay in control", "text": "Risk limits, lot sizing and a kill-switch \u2014 you set the rules, the bot follows."},
        ],
        "stats": [
            {"value": "99.9%", "label": "Execution uptime"},
            {"value": "< 100ms", "label": "Signal-to-fill latency"},
            {"value": "2,400+", "label": "Active MT5 accounts"},
        ],
    },
    "mt5Plans": [
        {"id": "starter", "name": "Starter", "signalsPerDay": 3, "price": 99, "period": "month", "description": "Perfect for new traders getting started with automation.", "features": ["3 high-conviction signals per day", "Direct MT5 auto-execution", "Risk management controls", "Email & Telegram alerts", "Standard support"], "popular": False, "style": DEFAULT_STYLE},
        {"id": "pro", "name": "Pro", "signalsPerDay": 5, "price": 179, "period": "month", "description": "Most popular \u2014 ideal for active traders.", "features": ["5 high-conviction signals per day", "Direct MT5 auto-execution", "Advanced risk & trailing-stop logic", "Multi-pair support", "Priority support"], "popular": True, "style": DEFAULT_STYLE},
        {"id": "elite", "name": "Elite", "signalsPerDay": 8, "price": 299, "period": "month", "description": "For full-time traders who want maximum coverage.", "features": ["8 high-conviction signals per day", "Direct MT5 auto-execution", "Custom risk profile & lot sizing", "Multi-account / Multi-pair support", "1-on-1 onboarding & VIP support"], "popular": False, "style": DEFAULT_STYLE},
    ],
    "referralPage": {
        "badge": "Referral Program",
        "title": "Refer & earn free VIP signals",
        "titleAccent": "free VIP signals",
        "subtitle": "Share your unique referral link \u2014 when a friend signs up through it, you both unlock access to our VIP Telegram channel with daily premium signals.",
        "telegramUrl": "https://t.me/thecryptoroom",
        "telegramShareUrl": "https://t.me/share/url",
        "perks": [
            {"icon": "Gift", "title": "Free VIP Signals", "text": "Every successful sign-up via your link unlocks free signals from our VIP Telegram channel."},
            {"icon": "Users", "title": "Earn Together", "text": "Your friends save money on indicators \u2014 you earn rewards. Win-win."},
            {"icon": "Star", "title": "Priority Access", "text": "Active referrers get early access to new indicators and beta features."},
        ],
    },
    "footer": {
        "description": "The ultimate trading indicator that gives real-time trade signals without repainting or lag.",
        "socials": [
            {"icon": "Twitter", "href": "#twitter"},
            {"icon": "Youtube", "href": "#youtube"},
            {"icon": "MessageCircle", "href": "#discord"},
            {"icon": "Send", "href": "#telegram"},
            {"icon": "Mail", "href": "#email"},
        ],
        "columns": [
            {"title": "Products", "links": [{"label": "All Indicators", "href": "/indicators"}, {"label": "MT5 Integration", "href": "/mt5"}, {"label": "Referral Program", "href": "/referral"}]},
            {"title": "Resources", "links": [{"label": "Tutorials", "href": "#tutorials"}, {"label": "Blogs", "href": "#blogs"}, {"label": "About us", "href": "#about"}, {"label": "Contact", "href": "#contact"}]},
            {"title": "Legal", "links": [{"label": "Terms of Service", "href": "#terms"}, {"label": "Privacy Policy", "href": "#privacy"}, {"label": "Refund Policy", "href": "#refund"}, {"label": "Disclaimer", "href": "#disclaimer"}]},
        ],
        "copyright": "All rights reserved.",
        "disclaimer": "Trading involves risk. Past performance is not indicative of future results. The Crypto Room does not provide financial advice.",
    },
}

# Indicator generation
_chart_imgs = [
    "https://gainzalgo.com/cdn/shop/files/1.1.png?v=1690502314&width=1946",
    "https://gainzalgo.com/cdn/shop/files/3_1.png?v=1690503064&width=1946",
    "https://gainzalgo.com/cdn/shop/files/2.2.png?v=1690503063&width=1946",
    "https://gainzalgo.com/cdn/shop/files/img1.png?v=1676409298&width=3840",
    "https://gainzalgo.com/cdn/shop/files/img3.png?v=1676409317&width=3840",
    "https://gainzalgo.com/cdn/shop/files/Layer_10.png?v=1671147914&width=3840",
]

_indicator_taglines = [
    "Real-time BUY & SELL signals \u2014 zero repaint, zero lag.",
    "Trend detection with multi-timeframe confluence.",
    "Scalping precision on the 1m & 5m charts.",
    "Smart Money Concepts \u2014 order blocks & liquidity zones.",
    "Volume profile & VWAP confluence.",
    "All-in-one dashboard \u2014 every tool in one indicator.",
]

_indicator_descriptions = [
    "Our flagship signal indicator built on a unique price-action algorithm. Designed to give the earliest, most accurate entries on every timeframe and every market.",
    "Identify the dominant trend instantly with adaptive moving averages and momentum confluence across multiple timeframes.",
    "Built for scalpers. Pinpoint entries on lower timeframes with momentum bursts and exhaustion detection.",
    "Visualise institutional order flow with automatic order block detection, fair value gaps and liquidity sweeps.",
    "See where the real volume is. Auto-anchored VWAP, session volume profile and high/low volume nodes on every chart.",
    "The complete bundle. Signals, trend, SMC, volume and scalping logic combined into one customisable dashboard.",
]

_indicator_videos = [
    "FSS_VBSm-vs",
    "2bP1JpQ9DCk",
    "iom_nhYQIYk",
    "TfxPCpw1f60",
    "6IUhXLBDTRE",
    "jNQXAC9IVRw",
]

_indicator_features = [
    ["Real-time BUY & SELL signals on every candle", "Zero repainting \u2014 signals never disappear", "Customizable sensitivity & alerts", "Works on TradingView (free plan supported)", "Lifetime access \u2014 one-time payment"],
    ["Multi-timeframe trend confluence", "Adaptive moving average engine", "Smart trend-strength meter", "TradingView alerts & webhooks", "Lifetime updates included"],
    ["Optimised for 1m / 5m / 15m timeframes", "Built-in stop-loss & take-profit zones", "Momentum exhaustion detection", "Audible & push alerts", "Lifetime access"],
    ["Automatic order block detection", "Fair Value Gap (FVG) zones", "Liquidity sweep alerts", "Premium / discount visualisation", "Lifetime updates"],
    ["Session & visible-range volume profile", "Auto-anchored VWAP with bands", "High/low volume node detection", "Multi-symbol support", "Lifetime access"],
    ["Every module from No. 1 \u2013 No. 5", "Single unified dashboard", "Module toggles (signals, SMC, volume, trend)", "Priority support & onboarding", "Lifetime access \u2014 one payment"],
]

_prices = [29.95, 39.95, 34.95, 49.95, 44.95, 79.95]
_orig = [149.95, 199.95, 174.95, 249.95, 224.95, 399.95]
_ratings = [4.9, 4.8, 4.7, 4.9, 4.8, 5.0]
_reviewCounts = [124, 89, 67, 152, 73, 211]

_sample_reviews = [
    {"name": "Eliza B.", "date": "October 17, 2025", "rating": 5, "text": "The accuracy and clarity are amazing. The alerts save my time and keep me safe from over trading."},
    {"name": "David", "date": "April 30, 2026", "rating": 4, "text": "Adapts well to different timeframes. The trend detection is incredibly reliable."},
    {"name": "Uzair", "date": "April 27, 2026", "rating": 5, "text": "Pretty solid accuracy on lower timeframes. The alerts have made my life so much easier."},
    {"name": "Terry", "date": "April 23, 2026", "rating": 5, "text": "Customer support was friendly and guided everything about the indicator."},
]

for i in range(6):
    INITIAL_CONTENT["indicators"].append({
        "id": f"no-{i+1}",
        "slug": f"no-{i+1}",
        "number": i + 1,
        "name": f"Indicator No. {i+1}",
        "tagline": _indicator_taglines[i],
        "description": _indicator_descriptions[i][:120],
        "longDescription": _indicator_descriptions[i],
        "price": _prices[i],
        "originalPrice": _orig[i],
        "discount": "80%",
        "rating": _ratings[i],
        "reviewCount": _reviewCounts[i],
        "images": [_chart_imgs[i % len(_chart_imgs)], _chart_imgs[(i + 1) % len(_chart_imgs)], _chart_imgs[(i + 2) % len(_chart_imgs)]],
        "videoId": _indicator_videos[i],
        "features": _indicator_features[i],
        "reviews": _sample_reviews,
        "style": DEFAULT_STYLE,
    })
