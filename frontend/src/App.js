import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TrustedBy from './components/TrustedBy';
import Proof from './components/Proof';
import Profits from './components/Profits';
import Reviews from './components/Reviews';
import CTA from './components/CTA';
import Footer from './components/Footer';
import IndicatorsPage from './pages/IndicatorsPage';
import IndicatorDetailPage from './pages/IndicatorDetailPage';
import ReferralPage from './pages/ReferralPage';
import MT5Page from './pages/MT5Page';
import ScrollToTop from './components/ScrollToTop';
import { SiteProvider, useSite } from './context/SiteContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { applyTheme } from './theme';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import ModeBanner from './components/ModeBanner';
import AuthModal from './components/AuthModal';
import Toaster from './components/Toaster';

const Home = () => (
  <>
    <Hero />
    <Features />
    <TrustedBy />
    <Proof />
    <Profits />
    <Reviews />
    <CTA />
  </>
);

const Layout = ({ children }) => {
  const { content, loading } = useSite();
  useEffect(() => {
    if (content?.theme) applyTheme(content.theme);
  }, [content]);

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center">
        <div className="text-white/60 text-sm">Loading…</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      <ModeBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <AuthModal />
    </div>
  );
};

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0a0b0f] text-white flex items-center justify-center">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <SiteProvider>
          <CustomerAuthProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/*"
                  element={
                    <RequireAuth>
                      <AdminLayout />
                    </RequireAuth>
                  }
                />
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/indicators" element={<Layout><IndicatorsPage /></Layout>} />
                <Route path="/indicators/:slug" element={<Layout><IndicatorDetailPage /></Layout>} />
                <Route path="/referral" element={<Layout><ReferralPage /></Layout>} />
                <Route path="/mt5" element={<Layout><MT5Page /></Layout>} />
              </Routes>
            </BrowserRouter>
            <Toaster />
          </CustomerAuthProvider>
        </SiteProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
