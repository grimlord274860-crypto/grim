import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, Boxes } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 pointer-events-none opacity-50" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.15), transparent 70%)' }} />
      <div className="relative w-full max-w-md bg-[#13151b] border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="relative">
            <Boxes className="w-8 h-8 text-[#00d4ff]" strokeWidth={2.2} />
            <div className="absolute inset-0 blur-md bg-[#00d4ff]/40 -z-10" />
          </div>
          <span className="text-2xl font-bold">The Crypto Room</span>
        </div>
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <p className="text-white/60 text-sm text-center mt-1">Sign in to manage your site.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="text-xs text-white/70 font-semibold">Email</span>
            <div className="mt-1.5 flex items-center gap-2 bg-[#0a0b0f] border border-white/15 rounded-lg px-3 focus-within:border-[#00d4ff] transition-colors">
              <Mail className="w-4 h-4 text-white/40" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@email.com" className="flex-1 bg-transparent py-3 text-white placeholder-white/30 focus:outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="text-xs text-white/70 font-semibold">Password</span>
            <div className="mt-1.5 flex items-center gap-2 bg-[#0a0b0f] border border-white/15 rounded-lg px-3 focus-within:border-[#00d4ff] transition-colors">
              <Lock className="w-4 h-4 text-white/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} required placeholder="••••••••" className="flex-1 bg-transparent py-3 text-white placeholder-white/30 focus:outline-none" />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-white/40 hover:text-white">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>
          {err && <p className="text-red-400 text-sm">{err}</p>}
          <button disabled={loading} className="w-full py-3.5 rounded-lg bg-[#00d4ff] text-black font-semibold hover:bg-[#22ddff] transition-colors disabled:opacity-50 shadow-lg shadow-[#00d4ff]/20">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-white/40 text-xs mt-6">
          Restricted access. Authorised users only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
