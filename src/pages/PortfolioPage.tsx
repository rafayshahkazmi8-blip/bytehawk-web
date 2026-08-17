import { useState, useEffect } from 'react';
import { ArrowUpRight, Layers, ExternalLink, ArrowLeft, Shield, Cpu, Zap } from 'lucide-react';

interface CaseStudy {
  title: string;
  client: string;
  category: string;
  link: string;
  mainImage: string;
  sliderImages: string[];
  problem: string;
  solution: string;
  keyFeatures: string[];
  stack: string[];
}

const projects: CaseStudy[] = [
  {
    title: 'Global Integrated Support (GIS)',
    client: 'GIS Corp',
    category: 'Web Dev',
    link: 'https://globalintegratedsupport.com/',
    mainImage: '/portfolio/GIS/main.png',
    sliderImages: [
      '/portfolio/GIS/main.png',
      '/portfolio/GIS/2.png',
      '/portfolio/GIS/3.png'
    ],
    problem: 'An auto-detailing service platform engineered to connect vehicle owners with professional detailing vendors across 50 states. The goal was to build a clean, conversion-focused layout that presents complex service packages in an intuitive, easy-to-navigate format.',
    solution: 'Re-architected the client acquisition funnel with a simplified 4-step scheduling flow, built a dynamic discount checker, and integrated a customizable vendor coverage map.',
    keyFeatures: [
      'Service Showcase: Visual presentation for specialized packages including Interior, Exterior, and Super Wax Detail.',
      'Appointment Flow: A streamlined 4-step booking journey designed to maximize user conversion.',
      'Interactive Coverage Map: Integrated map showcasing vendor distribution across 50 states with radius indicators.',
      'Discount Checker: Dynamic coupon code validator for instant promotional savings.',
      'Responsive Design: Optimized layout ensuring pixel-perfect display across desktop, tablet, and mobile devices.'
    ],
    stack: ['React', 'TypeScript', 'Google Maps API', 'CSS Grid', 'REST APIs', 'Vite'],
  },
  {
    title: 'Ceedrs Business Ecosystem',
    client: 'Ceedrs Ltd',
    category: 'Web Dev',
    link: 'https://ceedrs.com/',
    mainImage: '/portfolio/CEEDRS/Main.png',
    sliderImages: [
      '/portfolio/CEEDRS/Main.png',
      '/portfolio/CEEDRS/2.png',
      '/portfolio/CEEDRS/3.png'
    ],
    problem: 'Legacy operations require modular, all-in-one workspaces to replace fragmented HR and business tools. This dashboard system manages over 25 complex enterprise modules including payroll, live check-ins, and performance reporting.',
    solution: 'Engineered a highly extensible grid dashboard, built a lightweight WebSocket client-sync engine, and collaborated on a Flutter mobile application with offline-first client syncing.',
    keyFeatures: [
      'Mobile-First Architecture: Seamless mobile experience with offline-first capabilities using Flutter for field staff clock-in.',
      'Real-Time Sync: WebSocket engine for instant dashboard sync, chat, and action approvals across users.',
      'Modular Scalability: Built a "Clean Grid" dashboard system where users access only their assigned enterprise modules.',
      'Performance-Focused Backend: Single-source-of-truth API structures powering web, mobile, and external webhooks.'
    ],
    stack: ['React', 'TypeScript', 'Flutter', 'WebSockets', 'Node.js', 'Styled Components'],
  },
  {
    title: 'OAKSIS Academy E-Learning',
    client: 'OAKSIS Academy',
    category: 'Design',
    link: 'https://oaksis.com/',
    mainImage: '/portfolio/OAKSIS/main to display in cart.png',
    sliderImages: [
      '/portfolio/OAKSIS/main to display in cart.png',
      '/portfolio/OAKSIS/2.png',
      '/portfolio/OAKSIS/3.png'
    ],
    problem: 'Premium online education academies require elite dark theme visual identity, interactive multi-track course catalogs, and intuitive dual-role portals for student-teacher management.',
    solution: 'Designed and developed an optimized web portal featuring gold and emerald accents, modular tutor profile cards, course directory filters, and direct e-commerce checkout integration.',
    keyFeatures: [
      'Categorized Course Directory: Dynamic filter panels enabling quick navigation across Languages, AI, and O/A Level tracks.',
      'Dual-Role Auth Portal: Customized Student and Teacher dashboard gate layouts integrated with multi-provider OAuth.',
      'E-Commerce & Enrollment: Instructor profiles, difficulty levels, pricing tags, and cart checkout.',
      'Premium Design Language: Dark glassmorphic layout optimized for long study sessions and accessibility standards.'
    ],
    stack: ['Figma UX/UI', 'React', 'Tailwind CSS', 'OAuth 2.0', 'Framer Motion'],
  },
];

// ── Project Auto Image Slider Component ─────────────────────────────
function ProjectImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="portfolio-slider" style={{ 
      position: 'relative', 
      width: '100%', 
      height: '480px',
      borderRadius: '24px', 
      overflow: 'hidden', 
      border: '1px solid rgba(139,92,246,0.3)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      background: '#0D0720'
    }}>
      {images.map((img, i) => (
        <img
          key={img}
          src={img}
          alt={`Project slide ${i + 1}`}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === index ? 1 : 0,
            transform: i === index ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
          }}
        />
      ))}
      {/* Clickable indicator dots */}
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              width: i === index ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: i === index ? 'var(--purple-300)' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: i === index ? '0 0 8px var(--purple-400)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const filters = ['All', 'Web Dev', 'Design'];
  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  // Scroll to top on project selection
  useEffect(() => {
    if (selected) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selected]);

  // Full-screen detailed case study interface
  if (selected) {
    return (
      <section className="section animate-fade-in" style={{ paddingTop: '100px' }}>
        <div className="container">
          
          {/* Back Button and Navigation Row */}
          <div className="portfolio-detail-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <button 
              onClick={() => setSelected(null)}
              className="btn btn-glass"
              style={{ padding: '10px 20px', gap: '8px', fontSize: '0.85rem' }}
            >
              <ArrowLeft size={16} /> Back to Portfolio
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="portfolio-tag" style={{ margin: 0 }}>{selected.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>Client: {selected.client}</span>
            </div>
          </div>

          {/* Title and Short Intro */}
          <div style={{ marginBottom: '40px' }}>
            <h1 className="section-title text-gradient-white" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '16px' }}>
              {selected.title}
            </h1>
            <p className="section-desc" style={{ maxWidth: '800px', fontSize: '1.15rem' }}>
              {selected.problem.slice(0, 160)}...
            </p>
          </div>

          {/* Big Beautiful Image Slider */}
          <div style={{ marginBottom: '56px' }}>
            <ProjectImageSlider images={selected.sliderImages} />
          </div>

          {/* Grid Details Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '48px',
            alignItems: 'start'
          }} className="portfolio-details-grid">
            
            {/* Left Column: Extensive Case Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
              
              {/* Problem / Objective */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Shield size={18} style={{ color: 'var(--purple-300)' }} />
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', margin: 0 }}>Project Challenge & Goals</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.75', margin: 0 }}>
                  {selected.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Cpu size={18} style={{ color: 'var(--purple-300)' }} />
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', margin: 0 }}>Engineering Approach</h2>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.75', margin: 0 }}>
                  {selected.solution}
                </p>
              </div>

              {/* Features / Deliverables */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <Zap size={18} style={{ color: 'var(--purple-300)' }} />
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', margin: 0 }}>Key Deliverables & Specs</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selected.keyFeatures.map((feat, idx) => {
                    const [title, desc] = feat.split(': ');
                    return (
                      <div 
                        key={idx} 
                        className="glass-card" 
                        style={{ padding: '20px', border: '1px solid rgba(139,92,246,0.15)', display: 'flex', gap: '14px', alignItems: 'flex-start' }}
                      >
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-pink)', marginTop: '6px', flexShrink: 0 }} />
                        <div>
                          <h4 style={{ color: 'var(--text-white)', fontSize: '0.92rem', fontWeight: 700, marginBottom: '4px' }}>{title}</h4>
                          {desc && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Sidebar / Metadata */}
            <div className="portfolio-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '120px' }}>
              
              {/* Glass Metadata Card */}
              <div className="glass-card-strong" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                  Project Info
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Client Name</span>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 600, margin: '2px 0 0 0' }}>{selected.client}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>Service Category</span>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 600, margin: '2px 0 0 0' }}>{selected.category}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 700 }}>External Link</span>
                    <p style={{ margin: '2px 0 0 0' }}>
                      <a 
                        href={selected.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ color: 'var(--purple-300)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        {selected.link.replace('https://', '')} <ExternalLink size={12} />
                      </a>
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '28px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '10px' }}>Tech Stack</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {selected.stack.map(s => (
                      <span key={s} style={{ padding: '4px 10px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--purple-200)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Website Link Button */}
                <a 
                  href={selected.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn btn-primary" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'center', padding: '14px 20px', borderRadius: '12px' }}
                >
                  Visit Website <ArrowUpRight size={16} />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 30px;
          width: 100%;
        }
        .portfolio-card {
          cursor: pointer;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
        }
        .portfolio-img-container {
          width: 100%;
          height: 220px;
          overflow: hidden;
          border-bottom: 1px solid rgba(139,92,246,0.15);
          position: relative;
        }
        .portfolio-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-card:hover img {
          transform: scale(1.06);
        }
        @media (max-width: 900px) {
          .portfolio-details-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-label">Case Studies</span>
            <h1 className="section-title text-gradient-white">Our Proven Results</h1>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? 'btn btn-primary' : 'btn btn-glass'}
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="portfolio-grid">
          {visible.map((p, i) => (
            <div key={i} className="glass-card portfolio-card" onClick={() => setSelected(p)}>
              {/* Main Image */}
              <div className="portfolio-img-container">
                <img src={p.mainImage} alt={p.title} />
              </div>

              <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div className="portfolio-tag" style={{ margin: 0 }}>{p.category}</div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontStyle: 'italic' }}>{p.client}</span>
                </div>

                <h3 className="portfolio-title" style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 800 }}>{p.title}</h3>
                
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: '1.6', marginBottom: '18px', flexGrow: 1 }}>
                  {p.problem.slice(0, 130)}...
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--accent-pink)', fontWeight: 700 }}>
                    <Layers size={13} /> View Process
                  </div>
                  <ArrowUpRight size={16} style={{ color: 'var(--text-subtle)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
