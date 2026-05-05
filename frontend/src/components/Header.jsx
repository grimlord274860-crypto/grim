import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Menu, X, BarChart3 } from 'lucide-react';
import { navLinks } from '../data/mock';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tutorialsOpen, setTutorialsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50">
      {/* Promo bar */}
      <div className="bg-[#00d34d] text-black text-sm font-semibold tracking-wide">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-center gap-2 text-center">
          <span aria-hidden>🚀</span>
          <span>Ending soon: Get GainzAlgo for 80% off</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[#0d0e12] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 select-none">
            <BarChart3 className="w-7 h-7 text-[#00d34d]" strokeWidth={2.5} />
            <span className="text-white text-2xl font-bold tracking-tight">GainzAlgo</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setTutorialsOpen(true)}
                  onMouseLeave={() => setTutorialsOpen(false)}
                >
                  <button className="text-white/90 hover:text-[#00d34d] text-[15px] font-medium flex items-center gap-1 transition-colors">
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
                            className="block px-4 py-3 text-sm text-white/85 hover:bg-[#00d34d]/10 hover:text-[#00d34d] transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/90 hover:text-[#00d34d] text-[15px] font-medium transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white hover:text-[#00d34d] transition-colors p-2"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="Cart"
              className="relative text-white hover:text-[#00d34d] transition-colors p-2"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00d34d] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
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

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-[#0d0e12]">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-2 focus:outline-none focus:border-[#00d34d] transition-colors"
              />
            </div>
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0d0e12]">
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/90 hover:text-[#00d34d] py-3 border-b border-white/5 text-[15px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
