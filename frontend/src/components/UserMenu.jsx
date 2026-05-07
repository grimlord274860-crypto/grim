import React, { useEffect, useRef, useState } from 'react';
import { User, LogOut, ShoppingBag, Settings, ChevronDown } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';

const initials = (name, email) => {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
  }
  return (email || '??').substring(0, 2).toUpperCase();
};

const UserMenu = ({ primary }) => {
  const { customer, logout } = useCustomerAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  if (!customer) return null;

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors">
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: primary || '#00d4ff', color: '#000' }}>
          {initials(customer.name, customer.email)}
        </span>
        <ChevronDown className="w-4 h-4 text-white/60" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-[#15171c] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white text-sm font-semibold truncate">{customer.name}</p>
            <p className="text-white/50 text-xs truncate">{customer.email}</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/85 hover:bg-white/5 transition-colors">
            <User className="w-4 h-4 text-white/60" /> My Account
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/85 hover:bg-white/5 transition-colors">
            <ShoppingBag className="w-4 h-4 text-white/60" /> My Orders
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/85 hover:bg-white/5 transition-colors">
            <Settings className="w-4 h-4 text-white/60" /> Settings
          </button>
          <div className="border-t border-white/10" />
          <button onClick={() => { logout(); setOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
