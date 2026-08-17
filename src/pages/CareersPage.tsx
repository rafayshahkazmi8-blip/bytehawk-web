import { useState } from 'react';
import { MapPin, Clock, Send, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const jobs = [
  {
    id: '3d-dev',
    title: 'Senior Creative Web Developer',
    dept: 'Engineering',
    type: 'Full-Time',
    location: 'Remote (Global)',
    desc: 'React, TypeScript, Three.js (R3F), GLSL shader expert. Must have portfolio displaying interactive 3D scenes, scroll rigging, and 60fps performance.',
  },
  {
    id: 'uiux',
    title: 'UI/UX & Brand Identity Designer',
    dept: 'Design',
    type: 'Full-Time / Contract',
    location: 'Hybrid (New York)',
    desc: 'Create geometric vector logos, UI wireframes in Figma, and complete brand books for enterprise and software clients.',
  },
  {
    id: 'sales-eng',
    title: 'Sales Funnel & Integration Engineer',
    dept: 'Sales',
    type: 'Full-Time',
    location: 'Remote (Global)',
    desc: 'Script CRM workflows (HubSpot / Salesforce), wire webhooks, build multi-step lead capture widgets, and automated outreach funnels.',
  },
];

export default function CareersPage() {
  const [selected, setSelected] = useState<(typeof jobs)[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', portfolio: '', about: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#7C3AED', '#D946EF', '#ffffff'] });
  };

  const openModal = (job: typeof jobs[0]) => {
    setSelected(job);
    setSubmitted(false);
    setForm({ name: '', email: '', portfolio: '', about: '' });
  };

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div className="careers-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', marginBottom: '60px' }}>
          <div>
            <span className="section-label">Join Bytehawk</span>
            <h1 className="section-title text-gradient-white" style={{ fontSize: '2.8rem' }}>
              Where code meets digital artistry
            </h1>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.75', marginBottom: '24px' }}>
              We work at the intersection of creative UI animation and cloud architectures — a rare team that ships pixel-perfect designs and production-ready backend systems simultaneously.
            </p>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '12px' }}>Our Culture Blueprint</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Complete autonomy — work on your own schedule',
                  'Fidelity-first: no compromised designs, ever',
                  'Learning allowance for advanced WebGL and 3D courses',
                  'Modern hardware setup and workstation allowance',
                  'Remote-first, async-first, output-first culture',
                ].map(item => (
                  <li key={item} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--purple-300)', marginTop: '2px' }}>◆</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Open Roles */}
          <div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-white)', marginBottom: '22px' }}>Current Openings</h3>
            {jobs.map(job => (
              <div key={job.id} className="glass-card job-card" style={{ padding: '24px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                  <span className="job-tag">{job.dept}</span>
                  <span className="job-tag"><Clock size={11} /> {job.type}</span>
                  <span className="job-tag"><MapPin size={11} /> {job.location}</span>
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-white)', marginBottom: '8px' }}>{job.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.6' }}>{job.desc}</p>
                <button className="btn btn-outline" style={{ padding: '9px 20px', fontSize: '0.85rem' }} onClick={() => openModal(job)}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X size={16} /></button>

            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div style={{ fontSize: '0.78rem', color: 'var(--purple-300)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Job Application</div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '24px' }}>{selected.title}</h3>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" type="text" placeholder="Your full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Portfolio / GitHub Link *</label>
                  <input className="form-input" type="url" placeholder="https://yourportfolio.com" required value={form.portfolio} onChange={e => setForm({ ...form, portfolio: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Tell us about a complex project you built *</label>
                  <textarea className="form-input form-textarea" placeholder="Describe your most impressive or complex technical work..." required rows={4} value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  Submit Application <Send size={15} />
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Check size={26} style={{ color: '#34D399' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-white)' }}>Application Received!</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.92rem', lineHeight: '1.65' }}>
                  Thank you, <strong style={{ color: 'var(--text-white)' }}>{form.name}</strong>. Our recruiting lead will review your portfolio and follow up at <strong style={{ color: 'var(--text-white)' }}>{form.email}</strong> within 3 business days.
                </p>
                <button className="btn btn-glass" onClick={() => setSelected(null)} style={{ marginTop: '24px' }}>Close Window</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
