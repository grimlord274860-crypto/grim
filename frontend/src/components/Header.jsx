import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, Menu, X, Boxes } from 'lucide-react';
import { navLinks, brand } from '../data/mock';

const NEON = '#00d4ff';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tutorialsOpen, setTutorialsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(0);
  const location = useLocation();

  const isActive = (href) => href.startsWith('/') && location.pathname === href;

  const renderLink = (link) => {
    if (link.dropdown) {
      return (
        <div
          key={link.label}
          className="relative"
          onMouseEnter={() => setTutorialsOpen(true)}
          onMouseLeave={() => setTutorialsOpen(false)}
        >
          <button className="text-white/90 hover:text-[#00d4ff] text-[15px] font-medium flex items-center gap-1 transition-colors">
            {link.label}
            <ChevronDown className="w-4 h-4" />
          </button>
          {tutorialsOpen && (
            <div className="absolute left-0 top-full pt-3 w-56">
              <div className="bg-[#15171c] border border-white/10 rounded-md shadow-xl overflow-hidden">
                {link.dropdown.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-sm text-white/85 hover:bg-[#00d4ff]/10 hover:text-[#00d4ff] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    if (link.href.startsWith('/')) {
      return (
        <Link
          key={link.label}
          to={link.href}
          className={`text-[15px] font-medium transition-colors ${
            isActive(link.href) ? 'text-[#00d4ff]' : 'text-white/90 hover:text-[#00d4ff]'
          }`}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={link.label}
        href={link.href}
        className="text-white/90 hover:text-[#00d4ff] text-[15px] font-medium transition-colors"
      >
        {link.label}
      </a>
    );
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Promo bar */}
      <div
        className="text-black text-sm font-semibold tracking-wide"
        style={{ background: NEON }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-center gap-2 text-center">
          <span aria-hidden>🚀</span>
          <span>Ending soon: Get our indicators for 80% off</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[#0d0e12] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 select-none group">
            <div className="relative">
              <Boxes className="w-7 h-7 text-[#00d4ff]" strokeWidth={2.2} />
              <div className="absolute inset-0 blur-md bg-[#00d4ff]/40 -z-10 group-hover:bg-[#00d4ff]/60 transition-colors" />
            </div>
            <span className="text-white text-[22px] font-bold tracking-tight">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(renderLink)}
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-[#00d4ff] transition-colors p-2"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="Cart"
              className="relative text-white hover:text-[#00d4ff] transition-colors p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00d4ff] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-white/10 bg-[#0d0e12]">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <input
                type="text"
                autoFocus
                placeholder="Search indicators..."
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-2 focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
            </div>
          </div>
        )}

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0d0e12]">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/90 hover:text-[#00d4ff] py-3 border-b border-white/5 text-[15px]"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/90 hover:text-[#00d4ff] py-3 border-b border-white/5 text-[15px]"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
