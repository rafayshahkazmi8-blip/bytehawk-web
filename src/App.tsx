import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import FloatingCallWidget from './components/FloatingCallWidget';

// Home page sections
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import ServicesSection from './components/ServicesSection';
import FAQSection from './components/FAQSection';

// Pages
import AboutPage from './pages/AboutPage';
import PortfolioPage from './pages/PortfolioPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import EstimatePage from './pages/EstimatePage';

// ─── Home (Hero + Services + FAQ) ────────────────────────────────────────────
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Hero onOpenEstimator={() => navigate('/estimate')} />
      <StatsBar />
      <ServicesSection />
      <FAQSection />
    </>
  );
}

// ─── Scroll to top on route change ───────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// ─── Main app inner ───────────────────────────────────────────────────────────
function AppInner() {
  const scrollProgress = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) scrollProgress.current = window.scrollY / total;
    };
    lenis.on('scroll', onScroll);
    window.addEventListener('scroll', onScroll);

    let raf: number;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Fixed Three.js particle background */}
      <ThreeBackground scrollProgress={scrollProgress} />

      <ScrollToTop />

      <div className="page-wrapper">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/estimate" element={<EstimatePage />} />
          {/* Catch all */}
          <Route path="*" element={<HomePage />} />
        </Routes>

        <Footer />
      </div>

      <FloatingCallWidget />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
