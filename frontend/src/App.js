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

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <TrustedBy />
        <Proof />
        <Profits />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
