import React from 'react';
import { BarChart3, Twitter, Youtube, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#08090c] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-7 h-7 text-[#00d34d]" strokeWidth={2.5} />
              <span className="text-white text-2xl font-bold tracking-tight">GainzAlgo</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              The ultimate trading indicator that gives real-time trade signals without repainting
              or lag.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d34d] hover:text-black text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d34d] hover:text-black text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#discord"
                aria-label="Discord"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d34d] hover:text-black text-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#email"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d34d] hover:text-black text-white flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Products
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#gainzalgo" className="hover:text-[#00d34d] transition-colors">GainzAlgo</a></li>
              <li><a href="#v2" className="hover:text-[#00d34d] transition-colors">GainzAlgo V2</a></li>
              <li><a href="#partner" className="hover:text-[#00d34d] transition-colors">Partner up</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Resources
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#tutorials" className="hover:text-[#00d34d] transition-colors">Tutorials</a></li>
              <li><a href="#blogs" className="hover:text-[#00d34d] transition-colors">Blogs</a></li>
              <li><a href="#about" className="hover:text-[#00d34d] transition-colors">About us</a></li>
              <li><a href="#contact" className="hover:text-[#00d34d] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Legal
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#terms" className="hover:text-[#00d34d] transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-[#00d34d] transition-colors">Privacy Policy</a></li>
              <li><a href="#refund" className="hover:text-[#00d34d] transition-colors">Refund Policy</a></li>
              <li><a href="#disclaimer" className="hover:text-[#00d34d] transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {year} GainzAlgo. All rights reserved.
          </p>
          <p className="text-white/40 text-xs max-w-2xl text-center md:text-right">
            Trading involves risk. Past performance is not indicative of future results. GainzAlgo
            does not provide financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
