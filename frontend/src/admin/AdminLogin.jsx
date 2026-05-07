import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Boxes, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      await login(email, password);
    } catch (e) {
      setErr(e.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 relative">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.10), transparent 70%)' }} />
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="relative">
            <Boxes className="w-8 h-8 text-[#00b8e0]" strokeWidth={2.2} />
          </div>
          <span className="text-2xl font-bold text-slate-900">The Crypto Room</span>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900">Admin Login</h1>
        <p className="text-slate-500 text-sm text-center mt-1">Sign in to manage your site.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="text-xs text-slate-700 font-semibold">Email</span>
            <div className="mt-1.5 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 focus-within:border-[#00b8e0] focus-within:ring-2 focus-within:ring-[#00d4ff]/30 transition-colors">
              <Mail className="w-4 h-4 text-slate-400" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@email.com" className="flex-1 bg-transparent py-3 text-slate-900 placeholder-slate-400 focus:outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="text-xs text-slate-700 font-semibold">Password</span>
            <div className="mt-1.5 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 focus-within:border-[#00b8e0] focus-within:ring-2 focus-within:ring-[#00d4ff]/30 transition-colors">
              <Lock className="w-4 h-4 text-slate-400" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} required placeholder="••••••••" className="flex-1 bg-transparent py-3 text-slate-900 placeholder-slate-400 focus:outline-none" />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-slate-400 hover:text-slate-700">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <button disabled={loading} className="w-full py-3.5 rounded-lg bg-[#00b8e0] hover:bg-[#00a3c7] text-white font-semibold transition-colors disabled:opacity-50 shadow-md">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" /> Restricted access. Authorised users only.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
