import { Shield, Zap, CheckCircle, Target, Users, Globe, Award, Code } from 'lucide-react';
import { ThreeDTeamRing } from '../components/widgets/ThreeDTeamRing';

const values = [
  { icon: <Shield size={20} />, title: 'Absolute Reliability', desc: 'Clean codebases built to withstand scale, heavy load, and security audits.' },
  { icon: <Zap size={20} />, title: 'Performance Obsessed', desc: '60fps rendering, lazy-loaded assets, and edge hosting keep bounce rates minimal.' },
  { icon: <Target size={20} />, title: 'Design Fidelity', desc: 'No compromised pixels. We ship exactly what was designed, every single time.' },
  { icon: <CheckCircle size={20} />, title: 'Results-Driven', desc: 'Every deliverable tied to a measurable business outcome with tracked KPIs.' },
  { icon: <Users size={20} />, title: 'Client-Centric', desc: 'Dedicated project managers, weekly updates, and radical transparency throughout.' },
  { icon: <Globe size={20} />, title: 'Global Reach', desc: 'Serving clients across 12+ countries with full remote-native, async workflows.' },
  { icon: <Award size={20} />, title: 'Award-Winning Work', desc: 'Recognized by Awwwards, CSS Design Awards, and The FWA for interface excellence.' },
  { icon: <Code size={20} />, title: 'Open-Source Minded', desc: 'We contribute back with shared tools, components, and published research.' },
];


const milestones = [
  { year: '2022', title: 'Studio Founded', desc: 'Bytehawk opens with 3 core engineers and a bold vision for immersive web.' },
  { year: '2022', title: 'First Enterprise Client', desc: 'Delivered a headless e-commerce platform generating $2M/month for a US fashion brand.' },
  { year: '2023', title: 'Design Division Launch', desc: 'Expanded into brand identity, winning 2 Awwwards Site of the Day awards.' },
  { year: '2023', title: 'Marketing Division', desc: 'Added SEO and PPC services, achieving 240% average traffic growth for onboarded clients.' },
  { year: '2024', title: '120+ Projects Milestone', desc: 'Surpassed 120 completed projects across 12 countries with 99.4% client satisfaction.' },
  { year: '2024', title: 'AI-Powered Tools', desc: 'Released internal AI pipeline tools for automated CRM scoring and lead qualification.' },
];

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">

        {/* ── Page Header ── */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 72px auto' }}>
          <span className="section-label">Who We Are</span>
          <h1 className="section-title text-gradient-white">
            Pioneering digital ecosystems that drive measurable growth
          </h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Bytehawk bridges creative visual artistry and bleeding-edge cloud engineering — delivering
            experiences that are impossible to ignore.
          </p>
        </div>

        {/* ── Story + Stats ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'start',
            marginBottom: '88px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '18px' }}>
              Our Story
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.78' }}>
              Founded in 2022, Bytehawk was born with a single mission: create software that isn't
              just functional — it's visually spectacular and operationally game-changing. We were
              tired of agencies that shipped mediocre work behind beautiful proposals.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '15px', lineHeight: '1.78' }}>
              We operate at the intersection of immersive 3D UI, full-stack engineering, and
              data-driven marketing — delivering integrated solutions that brands simply can't get
              anywhere else. From Fortune 500 corporations to fast-moving startups, we build for
              scale from day one.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.78' }}>
              Every project is driven by a deep commitment to craft — obsessing over every pixel,
              every millisecond of load time, and every percentage point of conversion rate.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                { n: '120+', l: 'Projects Delivered' },
                { n: '99.4%', l: 'Client Satisfaction' },
                { n: '12+', l: 'Countries Served' },
                { n: '3×', l: 'Average ROI Multiplier' },
              ].map((s) => (
                <div key={s.l} className="glass-card" style={{ padding: '22px', textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      fontFamily: 'var(--font-heading)',
                      background: 'linear-gradient(135deg, var(--purple-300), var(--accent-pink))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {s.n}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', fontWeight: 500 }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mission panel */}
          <div className="glass-card-strong" style={{ padding: '36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '18px' }}>
                Our Mission
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '24px' }}>
                To be the world's most trusted studio for immersive digital engineering — a place where
                technology and artistry meet to create experiences that generate real business value.
              </p>
              <div
                style={{
                  padding: '20px',
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  borderRadius: '14px',
                  marginBottom: '22px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: 'var(--purple-200)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  "We don't just ship websites — we ship competitive advantages."
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--purple-300)', marginTop: '10px', fontWeight: 700 }}>
                  — Ethan Sterling, Founder
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                '✦ Fixed-price contracts — no surprise invoices',
                '✦ 30-day post-launch support included',
                '✦ Dedicated project manager on every build',
                '✦ Weekly progress updates and open communication',
              ].map((item) => (
                <p key={item} style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section Divider ── */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.45), transparent)', marginBottom: '72px' }} />

        {/* ── Leadership Team ── */}
        <div style={{ marginBottom: '88px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">The People Behind Bytehawk</span>
            <h2 className="section-title text-gradient-white" style={{ fontSize: '2.4rem' }}>
              Leadership Team
            </h2>
            <p className="section-desc" style={{ margin: '0 auto', maxWidth: '520px' }}>
              A handpicked team of senior engineers, creative directors, and growth specialists united by
              a shared obsession for excellence.
            </p>
          </div>

          <ThreeDTeamRing />
        </div>

        {/* ── Values ── */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.45), transparent)', marginBottom: '72px' }} />

        <div style={{ marginBottom: '88px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '36px', textAlign: 'center' }}>
            Our Core Values
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '18px' }}>
            {values.map((v, i) => (
              <div key={i} className="glass-card service-card" style={{ padding: '26px' }}>
                <div className="service-icon">{v.icon}</div>
                <div className="service-title" style={{ fontSize: '1rem' }}>{v.title}</div>
                <p className="service-desc" style={{ fontSize: '0.85rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.45), transparent)', marginBottom: '72px' }} />

        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '44px', textAlign: 'center' }}>
            Our Journey
          </h2>
          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(180deg, var(--purple-600), var(--accent-pink), transparent)',
                transform: 'translateX(-50%)',
              }}
            />
            {milestones.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '30px',
                  marginBottom: '28px',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div className="glass-card" style={{ padding: '20px' }}>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--purple-300)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        marginBottom: '5px',
                      }}
                    >
                      {m.year}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        color: 'var(--text-white)',
                        marginBottom: '5px',
                        fontSize: '0.97rem',
                      }}
                    >
                      {m.title}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.55', margin: 0 }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'var(--purple-500)',
                    border: '2px solid var(--purple-300)',
                    flexShrink: 0,
                    marginTop: '22px',
                    boxShadow: '0 0 12px rgba(139,92,246,0.7)',
                  }}
                />
                <div style={{ flex: 1 }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
