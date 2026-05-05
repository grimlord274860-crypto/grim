import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const Home = () => {
  return (
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
};

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#0a0b0f] text-white">
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/indicators" element={<Layout><IndicatorsPage /></Layout>} />
          <Route path="/indicators/:slug" element={<Layout><IndicatorDetailPage /></Layout>} />
          <Route path="/referral" element={<Layout><ReferralPage /></Layout>} />
          <Route path="/mt5" element={<Layout><MT5Page /></Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
