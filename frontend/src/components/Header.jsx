import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, Menu, X, Boxes, BarChart3, TrendingUp, Cpu, Zap, Star, LogIn } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import SearchModal from './SearchModal';
import UserMenu from './UserMenu';

const LOGO_ICONS = { Boxes, BarChart3, TrendingUp, Cpu, Zap, Star };

const Header = () => {
  const { content } = useSite();
  const header = content?.header || {};
  const brand = content?.brand || {};
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(0);
  const location = useLocation();
  const { customer, openAuth } = useCustomerAuth();

  const isActive = (href) => href.startsWith('/') && location.pathname === href;
  const Logo = LOGO_ICONS[brand.logoIcon] || Boxes;

  const renderLink = (link) => {
    if (link.href.startsWith('/')) {
      return (
        <Link
          key={link.label + link.href}
          to={link.href}
          className="text-[15px] font-medium transition-colors"
          style={{ color: isActive(link.href) ? primary : 'rgba(255,255,255,0.9)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = isActive(link.href) ? primary : 'rgba(255,255,255,0.9)')}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <a
        key={link.label + link.href}
        href={link.href}
        className="text-white/90 text-[15px] font-medium transition-colors"
        onMouseEnter={(e) => (e.currentTarget.style.color = primary)}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
      >
        {link.label}
      </a>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <div
          className="text-sm font-semibold tracking-wide"
          style={{ background: header.promoBg || primary, color: header.promoTextColor || '#000' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-center gap-2 text-center">
            <span aria-hidden>🚀</span>
            <span>{header.promoText || ''}</span>
          </div>
        </div>
        <div className="bg-[#0d0e12] border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 select-none group">
              <div className="relative">
                <Logo className="w-7 h-7" style={{ color: primary }} strokeWidth={2.2} />
                <div className="absolute inset-0 blur-md opacity-40 -z-10" style={{ background: primary }} />
              </div>
              <span className="text-white text-[22px] font-bold tracking-tight">{brand.name || ''}</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-7">{(header.navLinks || []).map(renderLink)}</nav>
            <div className="flex items-center gap-3">
              <button aria-label="Search" onClick={() => setSearchOpen(true)} className="text-white p-2 transition-colors" onMouseEnter={(e)=>e.currentTarget.style.color=primary} onMouseLeave={(e)=>e.currentTarget.style.color='#fff'}>
                <Search className="w-5 h-5" />
              </button>
              <button aria-label="Cart" className="relative text-white p-2 transition-colors" onMouseEnter={(e)=>e.currentTarget.style.color=primary} onMouseLeave={(e)=>e.currentTarget.style.color='#fff'}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center" style={{background:primary,color:'#000'}}>
                    {cartCount}
                  </span>
                )}
              </button>
              {customer ? (
                <UserMenu primary={primary} />
              ) : (
                <button onClick={() => openAuth('login')} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-semibold text-white border border-white/20 hover:border-white/40 transition-colors">
                  <LogIn className="w-4 h-4" /> Sign in
                </button>
              )}
              <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="lg:hidden border-t border-white/10 bg-[#0d0e12]">
              <nav className="flex flex-col px-6 py-4 gap-1">
                {(header.navLinks || []).map((link) =>
                  link.href.startsWith('/') ? (
                    <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="text-white/90 py-3 border-b border-white/5 text-[15px]">
                      {link.label}
                    </Link>
                  ) : (
                    <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-white/90 py-3 border-b border-white/5 text-[15px]">
                      {link.label}
                    </a>
                  )
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
