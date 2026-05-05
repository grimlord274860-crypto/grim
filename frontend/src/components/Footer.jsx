import React from 'react';
import { Link } from 'react-router-dom';
import { Boxes, Twitter, Youtube, MessageCircle, Mail, Send } from 'lucide-react';
import { brand } from '../data/mock';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#08090c] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Boxes className="w-7 h-7 text-[#00d4ff]" strokeWidth={2.2} />
                <div className="absolute inset-0 blur-md bg-[#00d4ff]/40 -z-10" />
              </div>
              <span className="text-white text-[22px] font-bold tracking-tight">{brand.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{brand.tagline}</p>
            <div className="flex items-center gap-3 mt-5">
              <a href="#twitter" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d4ff] hover:text-black text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d4ff] hover:text-black text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#discord" aria-label="Discord" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d4ff] hover:text-black text-white flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#telegram" aria-label="Telegram" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d4ff] hover:text-black text-white flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="#email" aria-label="Email" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#00d4ff] hover:text-black text-white flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Products</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><Link to="/indicators" className="hover:text-[#00d4ff] transition-colors">All Indicators</Link></li>
              <li><Link to="/mt5" className="hover:text-[#00d4ff] transition-colors">MT5 Integration</Link></li>
              <li><Link to="/referral" className="hover:text-[#00d4ff] transition-colors">Referral Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Resources</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#tutorials" className="hover:text-[#00d4ff] transition-colors">Tutorials</a></li>
              <li><a href="#blogs" className="hover:text-[#00d4ff] transition-colors">Blogs</a></li>
              <li><a href="#about" className="hover:text-[#00d4ff] transition-colors">About us</a></li>
              <li><a href="#contact" className="hover:text-[#00d4ff] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Legal</h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#terms" className="hover:text-[#00d4ff] transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-[#00d4ff] transition-colors">Privacy Policy</a></li>
              <li><a href="#refund" className="hover:text-[#00d4ff] transition-colors">Refund Policy</a></li>
              <li><a href="#disclaimer" className="hover:text-[#00d4ff] transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">© {year} {brand.name}. All rights reserved.</p>
          <p className="text-white/40 text-xs max-w-2xl text-center md:text-right">
            Trading involves risk. Past performance is not indicative of future results. {brand.name} does not provide financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
