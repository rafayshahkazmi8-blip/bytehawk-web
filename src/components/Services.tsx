import { useState } from 'react';
import { 
  Code, Paintbrush, BarChart3, TrendingUp, 
  Database, Cpu, Layout, CheckCircle2, Zap
} from 'lucide-react';

type TabType = 'web' | 'graphic' | 'marketing' | 'sales';

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabType>('web');
  const [sliderPos, setSliderPos] = useState(50); // percentage for before/after slider
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend' | 'design'>('all');

  const techStack = [
    { name: 'React', category: 'frontend', icon: <Code size={24} style={{ color: '#61DAFB' }} /> },
    { name: 'Node.js', category: 'backend', icon: <Cpu size={24} style={{ color: '#339933' }} /> },
    { name: 'Figma', category: 'design', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#F24E1E' }}><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/></svg> },
    { name: 'TypeScript', category: 'frontend', icon: <Code size={24} style={{ color: '#3178C6' }} /> },
    { name: 'PHP / Laravel', category: 'backend', icon: <Database size={24} style={{ color: '#777BB4' }} /> },
    { name: 'Tailwind CSS', category: 'frontend', icon: <Layout size={24} style={{ color: '#06B6D4' }} /> },
    { name: 'PostgreSQL', category: 'backend', icon: <Database size={24} style={{ color: '#4169E1' }} /> },
    { name: 'GitHub Actions', category: 'backend', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#181717' }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> }
  ];

  const filteredTech = techFilter === 'all' 
    ? techStack 
    : techStack.filter(t => t.category === techFilter);

  const timelineSteps = [
    { title: "1. Brand Auditing", desc: "Researching target demographics and competitors." },
    { title: "2. Wireframing & UX", desc: "Constructing high-fidelity interactive wireframes." },
    { title: "3. Visual System", desc: "Selecting styling sheets, fonts, and 3D scenes." },
    { title: "4. Digital Production", desc: "Coding, deploying, and optimizing final assets." }
  ];

  return (
    <section id="services" className="section" style={{ minHeight: '100vh', justifyContent: 'center', zIndex: 10 }}>
      <style>{`
        .services-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 50px auto;
        }
        .services-tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .tab-btn {
          background: var(--white);
          border: 1px solid var(--glass-border);
          padding: 12px 24px;
          border-radius: 14px;
          font-family: var(--font-heading);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }
        .tab-btn:hover {
          color: var(--primary-purple);
          border-color: var(--primary-purple);
          transform: translateY(-2px);
        }
        .tab-btn.active {
          background: var(--primary-purple);
          color: white;
          border-color: var(--primary-purple);
          box-shadow: 0 8px 20px var(--primary-glow);
        }
        .services-layout {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }
        .service-details {
          animation: fadeTab 0.5s ease;
        }
        @keyframes fadeTab {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tech-filter-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }
        .filter-btn {
          background: transparent;
          border: 1px solid var(--glass-border);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        .filter-btn:hover, .filter-btn.active {
          border-color: var(--primary-purple);
          color: var(--primary-purple);
          background: rgba(124, 58, 237, 0.05);
        }
        .chart-svg {
          width: 100%;
          height: 180px;
          background: rgba(124, 58, 237, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 15px;
          margin-top: 20px;
        }
        .chart-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawChart 2.5s forwards ease-out;
        }
        @keyframes drawChart {
          to { stroke-dashoffset: 0; }
        }
        .badge-list {
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }
        .badge-item {
          background: #FFFbeb;
          border: 1px solid #FEF3C7;
          color: #D97706;
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .badge-meta {
          background: #EFF6FF;
          border: 1px solid #DBEAFE;
          color: #2563EB;
        }
        /* Funnel SVG styling */
        .funnel-container {
          background: var(--white);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 24px;
          margin-top: 20px;
          position: relative;
        }
        .funnel-stage {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #FDFEFE;
          border: 1px solid #E9D5FF;
          border-radius: 12px;
          margin-bottom: 10px;
          position: relative;
          z-index: 2;
        }
        .funnel-stage::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background: rgba(124, 58, 237, 0.05);
          width: var(--width);
          border-radius: 11px 0 0 11px;
          z-index: -1;
        }
        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      <div className="services-header">
        <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
          What We Do
          </span>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '15px' }}>
          Tailored engineering & creative solutions
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Explore our specialized divisions focused on crafting premium user journeys, custom applications, and business pipelines.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="services-tabs">
        <button className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`} onClick={() => setActiveTab('web')}>
          <Code size={18} /> Web Design & Development
        </button>
        <button className={`tab-btn ${activeTab === 'graphic' ? 'active' : ''}`} onClick={() => setActiveTab('graphic')}>
          <Paintbrush size={18} /> Graphic Design
        </button>
        <button className={`tab-btn ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => setActiveTab('marketing')}>
          <BarChart3 size={18} /> Digital Marketing
        </button>
        <button className={`tab-btn ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>
          <TrendingUp size={18} /> Sales & Business Growth
        </button>
      </div>

      {/* Services Grid Content */}
      <div className="services-layout">
        {/* LEFT COLUMN: Service Sub-list */}
        <div className="service-details" key={activeTab}>
          {activeTab === 'web' && (
            <div>
              <span className="text-gradient" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Development Studio</span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '10px 0 15px 0' }}>Crafting fast interfaces</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
                We engineer scalable websites and server architectures. Our development features custom UI layouts, optimized APIs, robust databases, and modular architectures designed to render smoothly.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> UI/UX Design & Mockups
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Custom React & Vue Web Apps
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Headless E-commerce Solutions
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> CMS Development (WordPress/Sanity)
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'graphic' && (
            <div>
              <span className="text-gradient" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Design Lab</span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '10px 0 15px 0' }}>Visual Identity Design</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
                We translate company goals into visual systems. From high-resolution branding and layouts to custom vector illustration, we build experiences that resonate with target customers.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Custom Logo & Brand Book
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Wireframes & Design Prototypes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Custom Marketing Collateral
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Social Media Asset Kits
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'marketing' && (
            <div>
              <span className="text-gradient" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Growth Engine</span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '10px 0 15px 0' }}>ROI-Driven Marketing</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
                Acquiring traffic is only half the battle. We combine semantic SEO structure, target keyword research, PPC bid strategies, and user behavior analytics to maximize client conversion rates.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Advanced Core Web Vitals SEO
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> PPC Campaign Audits & Adwords
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Search Intent Copywriting
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Performance Analytics Reports
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'sales' && (
            <div>
              <span className="text-gradient" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Sales Automation</span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '10px 0 15px 0' }}>Pipeline Optimization</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
                Remove manual friction from your sales pipeline. We build integrated database connections, email sequences, CRM routing protocols, and custom estimators to close deals faster.
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Custom CRM Setup & Webhook Wiring
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Outbound Lead Generation Flows
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Automated Client Onboarding
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--primary-purple)' }} /> Conversion Funnel Analysis
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Interactive Widget */}
        <div className="glass-card" style={{ padding: '30px', minHeight: '430px' }}>
          {activeTab === 'web' && (
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={20} style={{ color: 'var(--primary-purple)' }} /> Tech Stack Explorer
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Click a filter to see the modern stack we use to build responsive platforms.
              </p>
              
              <div className="tech-filter-bar">
                <button className={`filter-btn ${techFilter === 'all' ? 'active' : ''}`} onClick={() => setTechFilter('all')}>All</button>
                <button className={`filter-btn ${techFilter === 'frontend' ? 'active' : ''}`} onClick={() => setTechFilter('frontend')}>Frontend</button>
                <button className={`filter-btn ${techFilter === 'backend' ? 'active' : ''}`} onClick={() => setTechFilter('backend')}>Backend</button>
                <button className={`filter-btn ${techFilter === 'design' ? 'active' : ''}`} onClick={() => setTechFilter('design')}>Design</button>
              </div>

              <div className="tech-grid">
                {filteredTech.map(tech => (
                  <div key={tech.name} className="tech-icon">
                    {tech.icon}
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'graphic' && (
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                Brand Transformation Slider
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Drag the slider below to see a before and after branding transformation.
              </p>

              <div className="before-after-container" style={{ '--slider-pos': `${sliderPos}%` } as React.CSSProperties}>
                {/* Before Image */}
                <div className="slider-image slider-before" style={{ background: '#312E81', color: '#818CF8', padding: '100px 30px', textAlign: 'center' }}>
                  <h5 style={{ fontSize: '2.5rem', fontWeight: 800 }}>OLD LOGO</h5>
                  <p style={{ opacity: 0.6 }}>Cluttered gradients, dated fonts (2012)</p>
                </div>

                {/* After Image */}
                <div className="slider-image slider-after" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #05020C 100%)', color: 'white', padding: '100px 30px', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '2px solid white', padding: '8px 16px', borderRadius: '12px' }}>
                    <Zap size={24} style={{ fill: 'white' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'Outfit' }}>BYTEHAWK</span>
                  </div>
                  <p style={{ opacity: 0.8, marginTop: '12px' }}>Sleek, geometric, high-impact branding</p>
                </div>

                {/* Handle slider bar */}
                <div className="slider-handle">
                  <div className="slider-button">
                    ↔
                  </div>
                </div>

                {/* Range Input Overlay */}
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    zIndex: 10,
                    cursor: 'ew-resize'
                  }}
                />
              </div>
              
              <div className="timeline">
                {timelineSteps.map((step, index) => (
                  <div key={index} className="timeline-item">
                    <h5 style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{step.title}</h5>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'marketing' && (
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                Traffic Growth (SEO Campaign Results)
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Organic web traffic growth plotted over a 6-month SEO optimization pipeline.
              </p>

              <svg className="chart-svg" viewBox="0 0 300 100">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 10 90 Q 60 70 110 80 T 210 30 T 290 10" 
                  fill="none" 
                  stroke="#7C3AED" 
                  strokeWidth="3" 
                  className="chart-path"
                />
                <path 
                  d="M 10 90 Q 60 70 110 80 T 210 30 T 290 10 L 290 90 L 10 90 Z" 
                  fill="url(#chartGradient)"
                />
                {/* Horizontal guide lines */}
                <line x1="10" y1="10" x2="290" y2="10" stroke="rgba(124,58,237,0.1)" strokeDasharray="3" />
                <line x1="10" y1="50" x2="290" y2="50" stroke="rgba(124,58,237,0.1)" strokeDasharray="3" />
                <line x1="10" y1="90" x2="290" y2="90" stroke="rgba(124,58,237,0.1)" />
                {/* Graph Dots */}
                <circle cx="10" cy="90" r="3" fill="#7C3AED" />
                <circle cx="210" cy="30" r="3" fill="#7C3AED" />
                <circle cx="290" cy="10" r="4" fill="#D946EF" />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>Month 1 (Audit)</span>
                <span>Month 3 (Core Web Vitals)</span>
                <span>Month 6 (Launch)</span>
              </div>

              <div className="badge-list">
                <div className="badge-item">
                  <Zap size={14} /> Google Ads Partner
                </div>
                <div className="badge-item badge-meta">
                  <CheckCircle2 size={14} /> Meta Certified
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                Growth Funnel & CRM Integrations
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px' }}>
                Visual mapping of conversion rates and CRM automation triggers.
              </p>

              <div className="funnel-container">
                <div className="funnel-stage" style={{ '--width': '100%' } as React.CSSProperties}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>1. Traffic Outflow</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: 800 }}>100% (Baseline)</span>
                </div>
                <div className="funnel-stage" style={{ '--width': '65%' } as React.CSSProperties}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>2. Lead Capture (Estimator)</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: 800 }}>65% (+40% CRM opt-in)</span>
                </div>
                <div className="funnel-stage" style={{ '--width': '38%' } as React.CSSProperties}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>3. Consultation Booked</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--primary-purple)', fontWeight: 800 }}>38% (Automated Calendly)</span>
                </div>
                <div className="funnel-stage" style={{ '--width': '18%' } as React.CSSProperties}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>4. Deal Closed</span>
                  <span style={{ fontSize: '0.85rem', color: '#D946EF', fontWeight: 800 }}>18% (Avg. Close Rate)</span>
                </div>
              </div>

              <div style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <strong>Integrations:</strong>
                <span>Salesforce</span> • <span>HubSpot</span> • <span>Zapier</span> • <span>Zoho CRM</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
