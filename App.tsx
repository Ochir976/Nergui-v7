import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServiceGrid from './components/ServiceGrid';
import FeatureBanner from './components/FeatureBanner';
import MoneyBackSection from './components/MoneyBackSection';
import TestimonialSection from './components/TestimonialSection';
import LogoMaker from './components/LogoMaker';
import MadeOnSection from './components/MadeOnSection';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import FindTalentPage from './components/FindTalentPage';
import FindWorkPage from './components/FindWorkPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();

  // Hide Navbar/Footer on specific routes if needed, e.g. Login
  const isAuthPage = location.pathname === '/login';

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      {!isAuthPage && <Navbar onOpenAuth={openAuth} />}

      <main className="flex flex-col">
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col gap-16 md:gap-32">
              <Hero />
              <ServiceGrid />
              <FeatureBanner />
              <MoneyBackSection />
              <TestimonialSection />
              <LogoMaker />
              <MadeOnSection />
            </div>
          } />

          <Route path="/find-talent" element={<FindTalentPage />} />
          <Route path="/find-work" element={<FindWorkPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        initialMode={authMode}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;
