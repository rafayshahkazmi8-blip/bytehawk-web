import { useState } from 'react';
import { Code, Paintbrush, BarChart3, TrendingUp, CheckCircle2, Zap, Database, Cpu, Layout } from 'lucide-react';

type Tab = 'web' | 'design' | 'marketing' | 'sales';

const tabs = [
  { key: 'web' as Tab, label: 'Web Development', icon: <Code size={16} /> },
  { key: 'design' as Tab, label: 'Graphic Design', icon: <Paintbrush size={16} /> },
  { key: 'marketing' as Tab, label: 'Digital Marketing', icon: <BarChart3 size={16} /> },
  { key: 'sales' as Tab, label: 'Sales Growth', icon: <TrendingUp size={16} /> },
];

const content: Record<Tab, { title: string; desc: string; bullets: string[] }> = {
  web: {
    title: 'World-Class Web Engineering',
    desc: 'From performance-first React SPAs to immersive Three.js experiences — we code interfaces that convert.',
    bullets: ['UI/UX Design & Wireframing', 'Custom React, Vue & Next.js Apps', 'Headless E-commerce (Shopify / Sanity)', 'CMS Development (WordPress / Contentful)', 'REST & GraphQL API Architecture', 'DevOps, CI/CD & Edge Deployment'],
  },
  design: {
    title: 'Visual Identity & Brand Systems',
    desc: 'We translate your company vision into stunning, cohesive visual systems that command immediate attention.',
    bullets: ['Custom Logo & Brand Book', 'Interactive Figma Prototypes', 'Marketing Collateral Kits', 'Social Media Asset Design', 'Motion & Video Graphics', 'Print-Ready Production Files'],
  },
  marketing: {
    title: 'ROI-Driven Digital Marketing',
    desc: 'Combining semantic SEO, intent-based PPC, and behaviour analytics to multiply organic traffic and conversions.',
    bullets: ['Technical SEO & Core Web Vitals', 'Google & Meta PPC Campaigns', 'Conversion Rate Optimisation (CRO)', 'Keyword Research & Intent Mapping', 'Analytics Dashboards & Reporting', 'Email Marketing Automation'],
  },
  sales: {
    title: 'Sales Automation & CRM Systems',
    desc: 'Remove friction from your pipeline with intelligent automation, lead scoring, and integrated CRM workflows.',
    bullets: ['Custom CRM Setup & Configuration', 'Outbound Lead Generation Flows', 'Automated Onboarding Sequences', 'Webhook & Zapier Integrations', 'Multi-Step Estimator & Quote Tools', 'Conversion Funnel Analysis Reports'],
  },
};

const techStack = [
  { name: 'React', cat: 'frontend', icon: <Code size={20} style={{ color: '#61DAFB' }} /> },
  { name: 'TypeScript', cat: 'frontend', icon: <Code size={20} style={{ color: '#3178C6' }} /> },
  { name: 'Three.js', cat: 'frontend', icon: <Code size={20} style={{ color: '#7C3AED' }} /> },
  { name: 'Node.js', cat: 'backend', icon: <Cpu size={20} style={{ color: '#339933' }} /> },
  { name: 'PostgreSQL', cat: 'backend', icon: <Database size={20} style={{ color: '#4169E1' }} /> },
  { name: 'Tailwind', cat: 'frontend', icon: <Layout size={20} style={{ color: '#06B6D4' }} /> },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('web');
  const [techFilter, setTechFilter] = useState<'all' | 'frontend' | 'backend'>('all');
  const [sliderPos, setSliderPos] = useState(50);

  const filtered = techFilter === 'all' ? techStack : techStack.filter(t => t.cat === techFilter);

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 55px auto' }}>
          <span className="section-label">What We Do</span>
          <h1 className="section-title text-gradient-white">Tailored engineering & creative solutions</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Explore our specialized divisions focused on crafting premium user journeys, custom applications, and business pipelines.
          </p>
        </div>

        {/* Tab Nav */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '44px' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={activeTab === t.key ? 'btn btn-primary' : 'btn btn-glass'}
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'start' }}>
          {/* Left: Details */}
          <div key={activeTab} className="animate-fade-up">
            <span className="section-label">{tabs.find(t => t.key === activeTab)?.label}</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '16px' }}>
              {content[activeTab].title}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '28px', lineHeight: '1.7' }}>
              {content[activeTab].desc}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {content[activeTab].bullets.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontWeight: 500 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--purple-400)', flexShrink: 0 }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Interactive widget based on tab */}
          <div className="glass-card-strong" style={{ padding: '32px' }}>
            {activeTab === 'web' && (
              <>
                <h4 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={18} style={{ color: 'var(--purple-300)' }} /> Tech Stack Explorer
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>Filter the tools we use to build world-class platforms.</p>
                
                <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
                  {(['all', 'frontend', 'backend'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setTechFilter(f)}
                      className={techFilter === f ? 'btn btn-primary' : 'btn btn-glass'}
                      style={{ padding: '6px 14px', fontSize: '0.78rem', textTransform: 'capitalize' }}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {filtered.map(t => (
                    <div key={t.name} className="glass-card" style={{ padding: '18px 12px', textAlign: 'center', cursor: 'pointer', flexDirection: 'column', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {t.icon}
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-white)' }}>{t.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'design' && (
              <>
                <h4 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '6px' }}>Brand Transformation Slider</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>Drag to reveal a before/after brand redesign.</p>
                
                <div style={{
                  position: 'relative', height: '240px', borderRadius: '14px', overflow: 'hidden',
                  userSelect: 'none', border: '1px solid var(--glass-border)'
                }}>
                  {/* Before */}
                  <div style={{ position: 'absolute', inset: 0, background: '#1a0030', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, fontFamily: 'var(--font-heading)', opacity: 0.6 }}>OLD BRAND</div>
                    <div style={{ opacity: 0.4, fontSize: '0.85rem', marginTop: '6px' }}>Cluttered layout, dated fonts</div>
                  </div>
                  {/* After (clip by slider) */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #0d0720 0%, #3B0764 100%)',
                    clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white'
                  }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: '2px solid rgba(167,139,250,0.6)', padding: '10px 20px', borderRadius: '12px' }}>
                      <Zap size={22} style={{ fill: 'var(--purple-300)', color: 'var(--purple-300)' }} />
                      <span style={{ fontWeight: 900, fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}>BYTEHAWK</span>
                    </div>
                    <div style={{ opacity: 0.6, fontSize: '0.82rem', marginTop: '10px' }}>Clean, modern, premium identity</div>
                  </div>
                  {/* Slider line */}
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: '2px', background: 'white', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--purple-500)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem', fontWeight: 700, cursor: 'ew-resize' }}>↔</div>
                  </div>
                  <input type="range" min={0} max={100} value={sliderPos} onChange={e => setSliderPos(+e.target.value)}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'ew-resize', zIndex: 10, width: '100%', height: '100%' }} />
                </div>
              </>
            )}

            {activeTab === 'marketing' && (
              <>
                <h4 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '6px' }}>SEO Traffic Growth Chart</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>6-month organic traffic growth from a real campaign.</p>
                
                <svg width="100%" height="160" viewBox="0 0 300 100" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.06)" />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.06)" />
                  <path d="M 5 82 C 60 78 90 70 120 58 S 180 28 240 14 S 285 8 295 6" fill="none" stroke="url(#purpleLine)" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: 'var(--purple-400)' }} />
                  <path d="M 5 82 C 60 78 90 70 120 58 S 180 28 240 14 S 285 8 295 6 L 295 82 L 5 82 Z" fill="url(#g1)" />
                  <circle cx="295" cy="6" r="4" fill="var(--accent-pink)" />
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '6px' }}>
                  <span>Month 1</span><span>Month 3</span><span>Month 6</span>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                  {['Google Partner', 'Meta Certified', '3× Avg ROI'].map(b => (
                    <div key={b} style={{ padding: '6px 14px', background: 'rgba(139,92,246,0.12)', border: '1px solid var(--glass-border-purple)', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--purple-300)' }}>
                      {b}
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'sales' && (
              <>
                <h4 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '6px' }}>Conversion Funnel</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Visualised pipeline after our automation was installed.</p>
                
                {[
                  { label: 'Traffic Inflow', pct: 100, color: 'var(--purple-500)' },
                  { label: 'Lead Capture (Estimator)', pct: 65, color: 'var(--purple-400)' },
                  { label: 'Consultation Booked', pct: 38, color: 'var(--purple-300)' },
                  { label: 'Deal Closed', pct: 18, color: 'var(--accent-pink)' },
                ].map((stage, i) => (
                  <div key={i} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{stage.label}</span>
                      <span style={{ color: stage.color, fontWeight: 800 }}>{stage.pct}%</span>
                    </div>
                    <div style={{ height: '7px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                      <div style={{ width: `${stage.pct}%`, height: '100%', background: stage.color, borderRadius: '4px', transition: 'width 1s var(--ease-smooth)' }} />
                    </div>
                  </div>
                ))}

                <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '16px' }}>
                  Integrations: <span style={{ color: 'var(--text-muted)' }}>Salesforce • HubSpot • Zapier • Zoho CRM</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
