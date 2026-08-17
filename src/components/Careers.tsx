import { useState } from 'react';
import { MapPin, Clock, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Job {
  id: string;
  title: string;
  department: 'Design' | 'Engineering' | 'Sales';
  type: string;
  location: string;
  description: string;
}

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', portfolio: '', resumeText: '' });

  const jobs: Job[] = [
    {
      id: "3d-dev",
      title: "Senior Creative Web Developer",
      department: "Engineering",
      type: "Full-Time",
      location: "Remote (Global)",
      description: "We are looking for a frontend wizard expert in React, TypeScript, Three.js (R3F), and GLSL shaders. You should have a portfolio displaying web experiences with smooth animations, scroll rigging, and optimized rendering."
    },
    {
      id: "uiux-brand",
      title: "UI/UX & Brand Identity Designer",
      department: "Design",
      type: "Full-Time / Contract",
      location: "Hybrid (New York)",
      description: "Join us to shape brand systems and UI wireframes. You will create geometric vector logos, layout UI interfaces in Figma, and build brand books for enterprise machinery and software clients."
    },
    {
      id: "sales-automation",
      title: "Sales Funnel & Integration Engineer",
      department: "Sales",
      type: "Full-Time",
      location: "Remote (Global)",
      description: "We need an integration specialist to script CRM database flows (HubSpot/Salesforce), wire webhooks, construct multi-step lead capture widgets, and build automated outreach funnels."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#7C3AED', '#D946EF', '#FFFFFF']
    });
  };

  return (
    <section id="careers" className="section" style={{ minHeight: '100vh', justifyContent: 'center', zIndex: 10 }}>
      <style>{`
        .careers-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
          margin-top: 40px;
        }
        .job-card {
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 20px;
          transition: var(--transition-smooth);
        }
        .job-card:hover {
          border-color: var(--primary-purple);
          transform: translateX(5px);
        }
        .job-meta {
          display: flex;
          gap: 15px;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .career-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(11, 7, 30, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .career-modal {
          background: #FFFFFF;
          color: #1E1B4B;
          width: 100%;
          max-width: 550px;
          border-radius: 24px;
          padding: 35px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          position: relative;
        }
        .careers-input {
          width: 100%;
          padding: 12px 14px;
          border: 2px solid #E9D5FF;
          border-radius: 10px;
          margin-bottom: 12px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .careers-input:focus {
          border-color: var(--primary-purple);
        }
      `}</style>

      <div className="careers-layout">
        {/* Culture Column */}
        <div>
          <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
            Join Bytehawk
          </span>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.15 }}>
            Where code meets digital artistry
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>
            We work at the intersection of creative UI animation and cloud architectures. We value design fidelity, asynchronous workflows, clean testing structures, and developers who write optimized scripts.
          </p>
          <div style={{ background: 'rgba(124, 58, 237, 0.03)', border: '1px dashed var(--glass-border)', padding: '24px', borderRadius: '16px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '6px' }}>Our Culture Blueprint</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
              <li>Complete autonomy: work on your own schedules.</li>
              <li>Fidelity-first approach: no compromised designs.</li>
              <li>Learning allowance for advanced WebGL and 3D modeling courses.</li>
              <li>Modern workstation setup and hardware allowance.</li>
            </ul>
          </div>
        </div>

        {/* Jobs List Column */}
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Current Openings</h3>
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-meta">
                <span style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--primary-purple)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                  {job.department}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {job.type}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} /> {job.location}
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>{job.title}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{job.description}</p>
              <button className="btn btn-secondary" onClick={() => { setSelectedJob(job); setFormSubmitted(false); }} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Apply For Role
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Career Application Modal */}
      {selectedJob && (
        <div className="career-modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="career-modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedJob(null)}>×</button>
            
            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary-purple)', fontWeight: 700 }}>
                  Job Application
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '5px 0 15px 0' }}>
                  {selectedJob.title}
                </h3>
                
                <input 
                  type="text" 
                  placeholder="Full Name *" 
                  required
                  className="careers-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
                
                <input 
                  type="email" 
                  placeholder="Email Address *" 
                  required
                  className="careers-input"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />

                <input 
                  type="url" 
                  placeholder="Portfolio / GitHub Link *" 
                  required
                  className="careers-input"
                  value={formData.portfolio}
                  onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                />

                <textarea 
                  placeholder="Tell us about a complex, high-performance animation or API you built recently... *" 
                  required
                  rows={4}
                  className="careers-input"
                  value={formData.resumeText}
                  onChange={e => setFormData({ ...formData, resumeText: e.target.value })}
                  style={{ resize: 'none' }}
                />

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Submit Application <Send size={14} />
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DEF7EC', color: '#03543F', display: 'inline-flex', alignItems: 'center', marginBottom: '15px', justifyContent: 'center' }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Application Received!</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '8px', fontSize: '0.95rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Our lead recruiter will review your portfolio details and follow up at <strong>{formData.email}</strong> within 3 business days.
                </p>
                <button className="btn btn-primary" onClick={() => setSelectedJob(null)} style={{ marginTop: '20px' }}>
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
