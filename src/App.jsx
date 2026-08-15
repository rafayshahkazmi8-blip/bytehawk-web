import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import PackageExplorer from './components/PackageExplorer';
import QuoteCalculator from './components/QuoteCalculator';
import ContactPage from './components/ContactPage';
import Workflow from './components/Workflow';
import FaqPage from './components/FaqPage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import GlassCard from './components/GlassCard';
import Login from './components/Login';
import { Star, MessageSquare, Shield, Smile, Sparkles } from 'lucide-react';
import './styles/global.css';
import MilkyWayBG from './components/MilkyWayBG';
import CustomCursor from './components/CustomCursor';

function App() {
  // Read initial active tab from URL hash if present
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'portfolio', 'workflow', 'faq', 'packages', 'calculator', 'contact', 'staff-login', 'staff/login', 'admin'];
    return validTabs.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);
  const [preSelectedPkg, setPreSelectedPkg] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Wrapper for setting active tab and syncing with URL hash
  const setActiveTab = (tabId) => {
    if (tabId === 'admin' && !isAuthenticated) {
      setActiveTabState('staff/login');
      window.location.hash = 'staff/login';
      return;
    }
    setActiveTabState(tabId);
    if (tabId === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `#${tabId}`;
    }
  };

  // Sync state if user clicks browser back/forward or changes hash manually
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'portfolio', 'workflow', 'faq', 'packages', 'calculator', 'contact', 'staff-login', 'staff/login', 'admin'];
      if (validTabs.includes(hash)) {
        if (hash === 'admin' && !isAuthenticated) {
          setActiveTabState('staff/login');
        } else {
          setActiveTabState(hash);
        }
      } else if (!hash) {
        setActiveTabState('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('vutuberdesign_token');
    const user = localStorage.getItem('vutuberdesign_user');
    if (token && user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTabState('admin');
    window.location.hash = 'admin';
  };

  const handleLogout = () => {
    localStorage.removeItem('vutuberdesign_token');
    localStorage.removeItem('vutuberdesign_user');
    setIsAuthenticated(false);
    setActiveTabState('home');
    window.location.hash = '';
  };

  const { scrollYProgress } = useScroll();
  
  const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  // Background Parallax
  const yCity = useTransform(scrollYProgress, [0, 1], ["0%", isMobileView ? "0%" : "25%"]);
  const yNebula = useTransform(scrollYProgress, [0, 1], ["0%", isMobileView ? "0%" : "45%"]);
  const yGrid = useTransform(scrollYProgress, [0, 1], ["0%", isMobileView ? "0%" : "15%"]);

  // Foreground Asymmetric Parallax
  const yFeatureLeft = useTransform(scrollYProgress, [0.05, 0.45], [0, isMobileView ? 0 : -60]);
  const yFeatureCenter = useTransform(scrollYProgress, [0.05, 0.45], [0, isMobileView ? 0 : 30]);
  const yFeatureRight = useTransform(scrollYProgress, [0.05, 0.45], [0, isMobileView ? 0 : -90]);

  const yDiagLeft = useTransform(scrollYProgress, [0.2, 0.6], [isMobileView ? 0 : 50, isMobileView ? 0 : -50]);
  const yDiagRight = useTransform(scrollYProgress, [0.2, 0.6], [isMobileView ? 0 : -40, isMobileView ? 0 : 40]);

  // Holographic 3D Transforms
  const rotateXMatrix = useTransform(scrollYProgress, [0.4, 0.75], [isMobileView ? 0 : 15, 0]);
  const zMatrix = useTransform(scrollYProgress, [0.4, 0.75], [isMobileView ? 0 : -120, 0]);
  const opacityMatrix = useTransform(scrollYProgress, [0.4, 0.75], [0.4, 1]);

  const rotateYTestimonials = useTransform(scrollYProgress, [0.65, 0.95], [isMobileView ? 0 : -15, 0]);
  const scaleTestimonials = useTransform(scrollYProgress, [0.65, 0.95], [isMobileView ? 1 : 0.85, 1]);
  const opacityTestimonials = useTransform(scrollYProgress, [0.65, 0.95], [0.4, 1]);

  // Combined Mouse Coordinates & spotlight/glow updates & Lenis Smooth Scrolling
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    let lenis = null;

    if (!isMobile) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      function raf(time) {
        if (lenis) lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    let rafId = null;
    const handleMouseMoveSpotlight = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const xRatio = (e.clientX / window.innerWidth) - 0.5;
        const yRatio = (e.clientY / window.innerHeight) - 0.5;
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        document.documentElement.style.setProperty('--mouse-x-ratio', xRatio);
        document.documentElement.style.setProperty('--mouse-y-ratio', yRatio);
        rafId = null;
      });
    };
    window.addEventListener('mousemove', handleMouseMoveSpotlight, { passive: true });

    return () => {
      if (lenis) lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMoveSpotlight);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Stock Testimonial Data
  const testimonials = [
    {
      name: 'Kaori Ch. [Virtual Idol]',
      rating: 5,
      text: 'The Live2D rigging is absolute magic! Mouth tracking is so responsive, and they created 4 custom expressions that my chat absolutely loves. The budget builder is 100% accurate too!',
      avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Zane Gaming [Pro Streamer]',
      rating: 5,
      text: 'Vutuber Design built my entire overlays suite and custom mascot logo. The animated stingers make my scene changes look incredibly premium. Worth every single penny.',
      avatar: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&auto=format&fit=crop&q=80'
    },
    {
      name: 'Neko Hime [VTuber Indie]',
      rating: 5,
      text: 'I ordered the Standard VTuber Model and added the 3D model upgrade. The VRM file works perfectly in VSeeFace and VRChat out-of-the-box! Absolute pro riggers!',
      avatar: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=100&auto=format&fit=crop&q=80'
    }
  ];

  // Callback to link Package selection directly to calculator preset
  const selectPackage = (pkgType, pkgId) => {
    setPreSelectedPkg({ type: pkgType, id: pkgId });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Use native high-performance OS cursor */}

      {/* ═══ MILKY WAY LIVE GALAXY BACKGROUND ═══ */}
      {/* <MilkyWayBG /> */}

      {/* ═══ CYBERPUNK BACKGROUND ENGINE ═══ */}
      <div className="bg-engine-container">

        {/* Layer 1 — Cosmic nebula blobs */}
        <motion.div style={{ y: yNebula }}>
          <div 
            style={{
              width: '100%',
              height: '100%',
              transform: 'translate(calc(var(--mouse-x-ratio, 0) * 45px), calc(var(--mouse-y-ratio, 0) * 35px))',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
          >
            <div className="nebula-blob nebula-1" />
            <div className="nebula-blob nebula-2" />
            <div className="nebula-blob nebula-3" />
            <div className="nebula-blob nebula-4" />
          </div>
        </motion.div>

        {/* Layer 2 — Holographic subtle grid */}
        <div className="holo-overlay" />

        {/* Layer 3 — Scanlines */}
        <div className="scanline-overlay" />

        {/* Layer 4 — Cyberpunk cityscape silhouette */}
        <motion.div className="cityscape-layer" style={{ y: yCity }}>
          <div 
            style={{
              width: '100%',
              height: '100%',
              transform: 'translate(calc(var(--mouse-x-ratio, 0) * 20px), calc(var(--mouse-y-ratio, 0) * 10px))',
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
          >
            <div className="city-far" />
            <div className="city-windows" />
            <div className="city-ground-glow" />
          </div>
        </motion.div>

        {/* Layer 5 — Horizon glow + 3D cyber grid floor */}
        <motion.div className="horizon-glow" style={{ y: yGrid }} />
        <motion.div style={{ y: yGrid }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'translate(calc(var(--mouse-x-ratio, 0) * -35px), calc(var(--mouse-y-ratio, 0) * -15px))',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform'
            }}
          >
            <div className="cyber-grid" />
          </div>
        </motion.div>

        {/* Layer 6 — Floating ember particles */}
        {[...Array(12)].map((_, i) => {
          const colors = ['pink', 'blue', 'purple', 'white'];
          const color = colors[i % colors.length];
          const size = Math.random() * 3 + 1;
          return (
            <div
              key={`p-${i}`}
              className={`drift-star ${color}`}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 30}%`,
                width:  `${size}px`,
                height: `${size}px`,
                animationDelay:    `${(Math.random() * 18).toFixed(1)}s`,
                animationDuration: `${(12 + Math.random() * 18).toFixed(1)}s`,
              }}
            />
          );
        })}

        {/* Layer 7 — Horizontal light streaks */}
        {[...Array(3)].map((_, i) => {
          const streakColors = [
            'linear-gradient(90deg, transparent, rgba(56,189,248,0.8), transparent)',
            'linear-gradient(90deg, transparent, rgba(236,72,153,0.8), transparent)',
            'linear-gradient(90deg, transparent, rgba(167,139,250,0.7), transparent)',
          ];
          return (
            <div
              key={`streak-${i}`}
              className="light-streak"
              style={{
                top:               `${10 + Math.random() * 80}%`,
                width:             `${80 + Math.random() * 150}px`,
                background:        streakColors[i % streakColors.length],
                animationDelay:    `${(Math.random() * 12).toFixed(1)}s`,
                animationDuration: `${(4 + Math.random() * 6).toFixed(1)}s`,
              }}
            />
          );
        })}

        {/* Layer 8 — Elegant Glowing Orbs */}
        <div className="elegant-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
        </div>

      </div>

      {/* Spotlight Glow Follower Layer */}
      <div className="mouse-glow-layer" />

      {/* 2. Responsive Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Conditional Multi-Page/Tab Render Wrapper */}
      <main style={{ flexGrow: 1 }}>
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            {/* Hero Section */}
            <Hero setActiveTab={setActiveTab} />

            {/* Features Spotlight Showcase */}
            <section style={{ padding: '60px 0' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Why Choose Vutuber Design
                  </span>
                  <h2 style={{ fontSize: '2.25rem', marginTop: '6px' }}>
                    AAA-Tier Design Standards
                  </h2>
                </div>

                <div className="grid-3" style={{ perspective: 1200 }}>
                  <motion.div style={{ y: yFeatureLeft }}>
                    <GlassCard style={{ textAlign: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(13, 110, 253, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 16px auto' }}>
                        <Sparkles size={20} style={{ color: 'var(--accent)' }} />
                      </div>
                      <h4 style={{ marginBottom: '10px' }}>Smooth Kinematics</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Our physics modeling features advanced multi-axis deformation, giving your model liquid-smooth hair physics and clothes bounce.
                      </p>
                    </GlassCard>
                  </motion.div>

                  <motion.div style={{ y: yFeatureCenter }}>
                    <GlassCard style={{ textAlign: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0, 180, 216, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', margin: '0 auto 16px auto' }}>
                        <Smile size={20} style={{ color: 'var(--secondary)' }} />
                      </div>
                      <h4 style={{ marginBottom: '10px' }}>Custom Expressions</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Toggle bespoke emotional layers in real-time. Happy, sad, angry, pouts, or sparkling eyes map instantly to hotkeys.
                      </p>
                    </GlassCard>
                  </motion.div>

                  <motion.div style={{ y: yFeatureRight }}>
                    <GlassCard style={{ textAlign: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', margin: '0 auto 16px auto' }}>
                        <Shield size={20} style={{ color: 'var(--accent)' }} />
                      </div>
                      <h4 style={{ marginBottom: '10px' }}>Client Protection</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Enjoy full commercial broadcasting rights, layered raw PSD deliveries, and a 30-day post-delivery technical warranty.
                      </p>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Rigging Technical Diagnostics & Showcase */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-glow)' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Interactive telemetry
                  </span>
                  <h2 style={{ fontSize: '2.25rem', marginTop: '6px' }}>
                    Rigging Diagnostics & Live Simulator
                  </h2>
                </div>

                <div className="grid-2" style={{ alignItems: 'center', perspective: 1200 }}>
                  {/* Left Column: Metric Bars */}
                  <motion.div style={{ y: yDiagLeft }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#ffffff' }}>Fluid Dynamic Performance</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: '1.6' }}>
                      Each model undergoes comprehensive biomechanical diagnostics to ensure tracking response is immediate. Adjust hotkeys, physics dampening layers, and mesh structures with zero input lag.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {[
                        { label: 'ARKit Head Rotation Tracking XYZ', value: 98, color: 'var(--primary)' },
                        { label: 'Vowel Lip-Sync Mouth Form Mappings (A-I-U-E-O)', value: 95, color: 'var(--secondary)' },
                        { label: 'Physics Fluidity (Hair, Clothes & Bounce)', value: 100, color: 'var(--accent)' },
                        { label: 'VRAM Rendering Optimization (Under 45MB)', value: 92, color: '#10b981' }
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                            <span>{item.label}</span>
                            <span style={{ fontWeight: 'bold', color: '#ffffff' }}>{item.value}% Accuracy</span>
                          </div>
                          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div 
                              style={{ 
                                width: `${item.value}%`, 
                                height: '100%', 
                                backgroundColor: item.color, 
                                borderRadius: '3px',
                                boxShadow: `0 0 8px ${item.color}`
                              }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right Column: Dynamic Accreditations / Integration Support */}
                  <motion.div style={{ y: yDiagRight }}>
                    <GlassCard style={{ padding: '36px' }} className="neon-border-glow">
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Sparkles size={16} style={{ color: 'var(--accent)' }} /> Full Platform Compatibility
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: '24px' }}>
                        Our source assets comply fully with modern virtual tracking standards, yielding perfect mapping files that integrate instantly with standard broadcaster platforms:
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85rem' }}>
                        {[
                          { title: 'VTube Studio ready', desc: 'iPhone ARKit / Webcam tracking support' },
                          { title: 'VSeeFace / VRM support', desc: '3D virtual scene compatibility' },
                          { title: 'OBS Studio Stingers', desc: 'Custom alpha-layered transition files' },
                          { title: 'Leap Motion Mapping', desc: 'Precision hand & finger bone tracking' }
                        ].map((item, idx) => (
                          <div key={idx} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glow)', borderRadius: '8px' }}>
                            <span style={{ display: 'block', fontWeight: 'bold', color: '#ffffff', marginBottom: '4px' }}>{item.title}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </section>
            {/* Creator Package Comparison Matrix */}
            <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-glow)', perspective: 1200, transformStyle: 'preserve-3d' }}>
              <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                    Compare Packages
                  </span>
                  <h2 style={{ fontSize: '2.25rem', marginTop: '6px' }}>
                    Commission Specifications Comparison
                  </h2>
                </div>
 
                <motion.div style={{ overflowX: 'auto', rotateX: rotateXMatrix, z: zMatrix, opacity: opacityMatrix, transformStyle: 'preserve-3d' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', color: 'var(--text-secondary)', minWidth: '700px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-light)', textAlign: 'left' }}>
                        <th style={{ padding: '16px', color: '#ffffff', fontWeight: '700' }}>Features / Specs</th>
                        <th style={{ padding: '16px', color: 'var(--primary)', fontWeight: '700' }}>Starter Package</th>
                        <th style={{ padding: '16px', color: 'var(--secondary)', fontWeight: '700' }}>Standard Package</th>
                        <th style={{ padding: '16px', color: 'var(--accent)', fontWeight: '700' }}>Premium Package</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { spec: 'Canvas Resolution', starter: '4000 x 4000 px', standard: '6000 x 6000 px', premium: '8000 x 8000 px (AAA)' },
                        { spec: 'Layer Slicing Count', starter: '200 - 350 Slices', standard: '400 - 700 Slices', premium: '800 - 1200+ Slices' },
                        { spec: 'Rigging Deformations', starter: 'Basic X/Y Rotation', standard: 'Advanced X/Y/Z Rotations', premium: 'Fluid 9-Axis Rigging' },
                        { spec: 'Expressions Mapped', starter: '3 - 4 Expressions', standard: '6 - 8 Expressions', premium: '10 - 12 Expressions' },
                        { spec: 'Physics Groups', starter: 'Hair & Eyes Only', standard: 'Hair, Eyes, Clothes & Breasts', premium: 'Full Gravity & Wind Clusters' },
                        { spec: 'Commercial License', starter: 'Broadcasting Only', standard: 'Broadcasting & YouTube Promo', premium: 'Broadcasting, YouTube & Merch Option' },
                        { spec: 'Source Files Delivery', starter: 'Layered PSD (Optional)', standard: 'Raw layered PSD & Moc3', premium: 'PSD, Moc3, VRM Export & Stingers' },
                        { spec: 'Warranty Duration', starter: '15-Day Warranty', standard: '30-Day Warranty', premium: '30-Day Ext. Warranty & Support' }
                      ].map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-glow)', background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                          <td style={{ padding: '14px 16px', fontWeight: '600', color: '#ffffff' }}>{row.spec}</td>
                          <td style={{ padding: '14px 16px' }}>{row.starter}</td>
                          <td style={{ padding: '14px 16px', color: row.spec.includes('AAA') ? '#ffffff' : 'var(--text-secondary)' }}>{row.standard}</td>
                          <td style={{ padding: '14px 16px', color: '#ffffff', fontWeight: 'bold' }}>{row.premium}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              </div>
            </section>
 
            {/* Testimonials Slider */}
            <section style={{ padding: '60px 0 100px 0', perspective: 1200, transformStyle: 'preserve-3d' }}>
              <div className="container" style={{ maxWidth: '800px' }}>
                
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <h3 style={{ fontSize: '2rem' }}>
                    Client <span className="gradient-text-accent">Testimonials</span>
                  </h3>
                </div>
 
                <motion.div style={{ rotateY: rotateYTestimonials, scale: scaleTestimonials, opacity: opacityTestimonials, transformStyle: 'preserve-3d' }}>
                  <GlassCard style={{ padding: '40px' }} className="fade-in">
                    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginBottom: '16px' }}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={18} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                      ))}
                    </div>
 
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', textAlign: 'center', color: 'var(--text-primary)', marginBottom: '24px', lineHeight: '1.6' }}>
                      "{testimonials[activeTestimonial].text}"
                    </p>
 
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      <img
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2.5px solid var(--primary)', objectFit: 'cover' }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <h5 style={{ fontSize: '0.95rem', color: '#ffffff' }}>{testimonials[activeTestimonial].name}</h5>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Commission Client</span>
                      </div>
                    </div>
 
                    {/* Bullet navigators */}
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTestimonial(idx)}
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: activeTestimonial === idx ? 'var(--accent)' : 'var(--text-muted)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'var(--transition-fast)'
                          }}
                        />
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'portfolio' && <Portfolio />}

        {activeTab === 'workflow' && <Workflow />}

        {activeTab === 'faq' && <FaqPage />}

        {activeTab === 'packages' && (
          <PackageExplorer
            setActiveTab={setActiveTab}
            selectPackage={selectPackage}
          />
        )}

        {activeTab === 'calculator' && (
          <QuoteCalculator preSelected={preSelectedPkg} />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {(activeTab === 'staff-login' || activeTab === 'staff/login') && <Login onLoginSuccess={handleLoginSuccess} />}

        {activeTab === 'admin' && isAuthenticated && <AdminDashboard onLogout={handleLogout} />}
      </main>

      {/* 4. Global Footer with staff entry portals */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
