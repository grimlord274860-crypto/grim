import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Home, Layers, Cpu, Send, Layout, LogOut, Save, Upload, RotateCcw, Eye, ExternalLink, Boxes, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiContent } from '../api';
import HeaderEditor from './sections/HeaderEditor';
import HomeEditor from './sections/HomeEditor';
import IndicatorsEditor from './sections/IndicatorsEditor';
import MT5Editor from './sections/MT5Editor';
import ReferralEditor from './sections/ReferralEditor';
import FooterEditor from './sections/FooterEditor';
import ThemeEditor from './sections/ThemeEditor';
import DraftContext, { useDraft } from './DraftContext';

const NAV = [
  { to: '/admin', label: 'Theme & Brand', icon: Settings, end: true },
  { to: '/admin/header', label: 'Header', icon: Layout },
  { to: '/admin/home', label: 'Home Page', icon: Home },
  { to: '/admin/indicators', label: 'Indicators', icon: Layers },
  { to: '/admin/mt5', label: 'MT5 Integration', icon: Cpu },
  { to: '/admin/referral', label: 'Referral', icon: Send },
  { to: '/admin/footer', label: 'Footer', icon: Boxes },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const nav = useNavigate();
  const [draft, setDraft] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    apiContent.getDraft().then((r) => setDraft(r.data));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const updateDraft = (updater) => {
    setDraft((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setDirty(true);
      return next;
    });
  };

  const saveDraft = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      await apiContent.saveDraft(draft);
      setDirty(false);
      showToast('Draft saved');
    } catch (e) {
      showToast('Failed to save draft', 'error');
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    setPublishing(true);
    try {
      // Save first if dirty
      if (dirty) await apiContent.saveDraft(draft);
      await apiContent.publish();
      setDirty(false);
      showToast('Published live');
    } catch (e) {
      showToast('Publish failed', 'error');
    } finally {
      setPublishing(false);
    }
  };

  const resetDraft = async () => {
    if (!window.confirm('Discard all draft changes and reset to published?')) return;
    await apiContent.resetDraft();
    const r = await apiContent.getDraft();
    setDraft(r.data);
    setDirty(false);
    showToast('Draft reset to published');
  };

  const previewLive = async () => {
    if (dirty) {
      await apiContent.saveDraft(draft);
      setDirty(false);
    }
    localStorage.setItem('site_mode', 'preview');
    window.open('/', '_blank');
  };

  const handleLogout = () => {
    logout();
    nav('/admin/login', { replace: true });
  };

  if (!draft) {
    return <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center">Loading admin…</div>;
  }

  return (
    <DraftContext.Provider value={{ draft, updateDraft }}>
      <div className="min-h-screen bg-[#0a0b0f] text-white flex">
        <aside className="w-64 bg-[#0d0e12] border-r border-white/10 flex flex-col flex-shrink-0">
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Boxes className="w-6 h-6 text-[#00d4ff]" strokeWidth={2.2} />
                <div className="absolute inset-0 blur-md bg-[#00d4ff]/40 -z-10" />
              </div>
              <span className="font-bold">Admin</span>
            </div>
            <p className="text-white/40 text-xs mt-1 truncate">{user?.email}</p>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV.map((n) => {
              const Icon = n.icon;
              return (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isActive ? 'bg-[#00d4ff]/15 text-[#00d4ff]' : 'text-white/75 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {n.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="p-3 border-t border-white/10">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 bg-[#0d0e12]/95 backdrop-blur border-b border-white/10">
            <div className="px-6 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {dirty && <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold">Unsaved changes</span>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={previewLive} className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-white/15 hover:border-white/30 text-white/85" title="Save draft and open live preview">
                  <Eye className="w-4 h-4" /> Live Preview <ExternalLink className="w-3 h-3" />
                </button>
                <button onClick={resetDraft} className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-white/15 hover:border-white/30 text-white/85" title="Discard draft and reset to published">
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button disabled={saving} onClick={saveDraft} className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-white/10 hover:bg-white/15 text-white disabled:opacity-50" title="Save as draft template">
                  <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Draft'}
                </button>
                <button disabled={publishing} onClick={publish} className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-[#00d4ff] hover:bg-[#22ddff] text-black font-semibold disabled:opacity-50 shadow-lg shadow-[#00d4ff]/20">
                  <Upload className="w-4 h-4" /> {publishing ? 'Publishing…' : 'Publish'}
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route index element={<ThemeEditor />} />
              <Route path="header" element={<HeaderEditor />} />
              <Route path="home" element={<HomeEditor />} />
              <Route path="indicators" element={<IndicatorsEditor />} />
              <Route path="mt5" element={<MT5Editor />} />
              <Route path="referral" element={<ReferralEditor />} />
              <Route path="footer" element={<FooterEditor />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </main>
        </div>

        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-2xl text-sm font-semibold ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-black'}`}>
            {toast.msg}
          </div>
        )}
      </div>
    </DraftContext.Provider>
  );
};

export default AdminLayout;
