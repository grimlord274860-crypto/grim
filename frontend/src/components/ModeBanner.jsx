import React from 'react';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const ModeBanner = () => {
  const { mode, switchMode } = useSite();
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="bg-amber-500/95 text-black text-xs font-semibold">
      <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          {mode === 'preview' ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          You are viewing the <strong>{mode === 'preview' ? 'DRAFT preview' : 'PUBLISHED site'}</strong>
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => switchMode(mode === 'preview' ? 'published' : 'preview')} className="px-3 py-1 rounded bg-black/15 hover:bg-black/25 transition-colors">
            Switch to {mode === 'preview' ? 'Published' : 'Draft'}
          </button>
          <a href="/admin" className="px-3 py-1 rounded bg-black text-amber-400 hover:bg-black/85 transition-colors">Open Admin</a>
        </div>
      </div>
    </div>
  );
};

export default ModeBanner;
