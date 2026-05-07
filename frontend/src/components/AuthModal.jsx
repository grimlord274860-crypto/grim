import React, { useEffect, useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, X, Boxes, ShieldCheck } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';
import { useSite } from '../context/SiteContext';

const AuthModal = () => {
  const { content } = useSite();
  const brand = content?.brand || {};
  const theme = content?.theme || {};
  const primary = theme.primaryColor || '#00d4ff';
  const { modalOpen, modalMode, setModalMode, closeAuth, login, register, completeAuth } = useCustomerAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      setName('');
      setEmail('');
      setPassword('');
      setErr('');
      setShowPwd(false);
    }
  }, [modalOpen]);

  if (!modalOpen) return null;

  const isRegister = modalMode === 'register';

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      if (isRegister) await register(name.trim() || email.split('@')[0], email.trim(), password);
      else await login(email.trim(), password);
      completeAuth();
    } catch (e) {
      setErr(e.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4 bg-black/75 backdrop-blur-sm" onMouseDown={closeAuth}>
      <div
        className="relative w-full max-w-md bg-[#13151b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 right-3">
          <button onClick={closeAuth} className="text-white/60 hover:text-white p-2" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-7 pt-7 pb-6 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="relative">
              <Boxes className="w-7 h-7" style={{ color: primary }} strokeWidth={2.2} />
              <div className="absolute inset-0 blur-md opacity-40 -z-10" style={{ background: primary }} />
            </div>
            <span className="text-white text-xl font-bold">{brand.name || 'The Crypto Room'}</span>
          </div>
          <h2 className="text-white text-2xl font-bold">{isRegister ? 'Create your account' : 'Welcome back'}</h2>
          <p className="text-white/60 text-sm mt-1">
            {isRegister ? 'Sign up to continue with your purchase.' : 'Sign in to continue with your purchase.'}
          </p>
        </div>

        {/* Tab toggle */}
        <div className="px-7">
          <div className="grid grid-cols-2 bg-[#0a0b0f] border border-white/10 rounded-lg p-1">
            {['login', 'register'].map((m) => (
              <button
                key={m}
                onClick={() => setModalMode(m)}
                className="py-2 text-sm font-semibold rounded-md transition-colors capitalize"
                style={modalMode === m ? { background: primary, color: '#000' } : { color: 'rgba(255,255,255,0.7)' }}
              >
                {m === 'login' ? 'Sign in' : 'Register'}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="px-7 py-6 space-y-3">
          {isRegister && (
            <label className="block">
              <span className="text-xs text-white/70 font-semibold">Name</span>
              <div className="mt-1.5 flex items-center gap-2 bg-[#0a0b0f] border border-white/15 rounded-lg px-3 focus-within:border-[var(--cr-primary,#00d4ff)] transition-colors">
                <User className="w-4 h-4 text-white/40" />
                <input value={name} onChange={(e) => setName(e.target.value)} required={isRegister} placeholder="Your name" className="flex-1 bg-transparent py-3 text-white placeholder-white/30 focus:outline-none" />
              </div>
            </label>
          )}
          <label className="block">
            <span className="text-xs text-white/70 font-semibold">Email</span>
            <div className="mt-1.5 flex items-center gap-2 bg-[#0a0b0f] border border-white/15 rounded-lg px-3 focus-within:border-[var(--cr-primary,#00d4ff)] transition-colors">
              <Mail className="w-4 h-4 text-white/40" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="you@email.com" className="flex-1 bg-transparent py-3 text-white placeholder-white/30 focus:outline-none" />
            </div>
          </label>
          <label className="block">
            <span className="text-xs text-white/70 font-semibold">Password</span>
            <div className="mt-1.5 flex items-center gap-2 bg-[#0a0b0f] border border-white/15 rounded-lg px-3 focus-within:border-[var(--cr-primary,#00d4ff)] transition-colors">
              <Lock className="w-4 h-4 text-white/40" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPwd ? 'text' : 'password'} required minLength={6} placeholder={isRegister ? 'Min. 6 characters' : '••••••••'} className="flex-1 bg-transparent py-3 text-white placeholder-white/30 focus:outline-none" />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="text-white/40 hover:text-white">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </label>

          {err && <p className="text-red-400 text-sm">{err}</p>}

          <button disabled={loading} className="w-full py-3.5 rounded-lg font-semibold transition-colors disabled:opacity-50 shadow-lg" style={{ background: primary, color: '#000', boxShadow: `0 8px 24px ${primary}33` }}>
            {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
          </button>

          <p className="text-center text-white/55 text-xs pt-1">
            {isRegister ? 'Already have an account?' : "Don’t have an account?"}{' '}
            <button type="button" onClick={() => setModalMode(isRegister ? 'login' : 'register')} className="font-semibold transition-colors" style={{ color: primary }}>
              {isRegister ? 'Sign in' : 'Register'}
            </button>
          </p>

          <div className="mt-2 flex items-center gap-2 text-white/40 text-[11px] justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
            Your data is encrypted and never shared.
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
