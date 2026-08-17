import { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Sparkles, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  { id: 'web', name: 'Web Design & Development', base: 4500 },
  { id: 'design', name: 'Graphic Design & Branding', base: 2500 },
  { id: 'marketing', name: 'Digital Marketing & SEO', base: 2000 },
  { id: 'sales', name: 'Sales & Business Growth Systems', base: 3000 },
];
const budgets = [
  { label: '$2,000 – $5,000', m: 0.9 },
  { label: '$5,000 – $15,000', m: 1.0 },
  { label: '$15,000 – $30,000', m: 1.2 },
  { label: '$30,000+', m: 1.5 },
];
const timelines = [
  { label: 'Urgent (< 1 month)', m: 1.3 },
  { label: 'Standard (1–3 months)', m: 1.0 },
  { label: 'Flexible (3–6 months)', m: 0.8 },
];

export default function ProjectEstimator({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', company: '', notes: '' });
  const [done, setDone] = useState(false);

  if (!isOpen) return null;

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const estimate = () => {
    let base = selected.reduce((sum, id) => sum + (services.find(s => s.id === id)?.base ?? 0), 0);
    const bm = budgets.find(b => b.label === budget)?.m ?? 1;
    const tm = timelines.find(t => t.label === timeline)?.m ?? 1;
    base = base * bm * tm;
    return { min: Math.round((base * 0.85) / 100) * 100, max: Math.round((base * 1.15) / 100) * 100 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#7C3AED', '#A78BFA', '#D946EF', '#fff'] });
  };

  const { min, max } = estimate();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div style={{ background: '#0D0720', border: '1px solid var(--glass-border-purple)', borderRadius: '28px', padding: '0', maxWidth: '600px', width: '100%', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.7)', position: 'relative' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, var(--purple-700) 0%, var(--purple-900) 100%)', padding: '30px 32px', position: 'relative' }}>
          <button className="modal-close" onClick={onClose} style={{ top: 18, right: 18 }}><X size={16} /></button>
          <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} /> Project Cost Estimator
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.88rem', marginTop: '6px' }}>
            Select your requirements for an instant budget projection.
          </p>
        </div>

        <div style={{ padding: '32px' }}>
          {!done && (
            <div className="step-dots">
              {[1,2,3,4].map(s => <div key={s} className={`step-dot ${step >= s ? 'active' : ''}`} />)}
            </div>
          )}

          {/* Step 1: Services */}
          {step === 1 && !done && (
            <>
              <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '16px' }}>What services do you need?</h3>
              {services.map(srv => (
                <div key={srv.id} className={`option-card ${selected.includes(srv.id) ? 'selected' : ''}`} onClick={() => toggle(srv.id)}>
                  <span className="option-card-text">{srv.name}</span>
                  <div className={`check-circle ${selected.includes(srv.id) ? 'selected' : ''}`}>
                    {selected.includes(srv.id) && <Check size={12} />}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Step 2: Budget */}
          {step === 2 && !done && (
            <>
              <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '16px' }}>What's your estimated budget?</h3>
              {budgets.map(b => (
                <div key={b.label} className={`option-card ${budget === b.label ? 'selected' : ''}`} onClick={() => setBudget(b.label)}>
                  <span className="option-card-text">{b.label}</span>
                  <div className={`check-circle ${budget === b.label ? 'selected' : ''}`}>
                    {budget === b.label && <Check size={12} />}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && !done && (
            <>
              <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '16px' }}>What's your desired timeline?</h3>
              {timelines.map(t => (
                <div key={t.label} className={`option-card ${timeline === t.label ? 'selected' : ''}`} onClick={() => setTimeline(t.label)}>
                  <span className="option-card-text">{t.label}</span>
                  <div className={`check-circle ${timeline === t.label ? 'selected' : ''}`}>
                    {timeline === t.label && <Check size={12} />}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Step 4: Contact */}
          {step === 4 && !done && (
            <form onSubmit={handleSubmit}>
              <h3 style={{ color: 'var(--text-white)', fontWeight: 700, marginBottom: '18px' }}>Your contact details</h3>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" type="text" placeholder="Your name" required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input className="form-input" type="email" placeholder="you@company.com" required value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input className="form-input" type="text" placeholder="Company (optional)" value={contact.company} onChange={e => setContact({ ...contact, company: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Specific Requirements</label>
                <textarea className="form-input form-textarea" rows={3} placeholder="Any specific notes..." value={contact.notes} onChange={e => setContact({ ...contact, notes: e.target.value })} style={{ minHeight: '80px' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={selected.length === 0}>
                Get My Price Range <Send size={15} />
              </button>
            </form>
          )}

          {/* Result */}
          {done && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <h3 style={{ color: 'var(--text-white)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '8px' }}>Your Estimated Budget Range</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Based on your selections, we estimate:</p>
              <div style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid var(--glass-border-purple)', borderRadius: '20px', padding: '28px', marginBottom: '22px' }}>
                <div style={{ fontSize: '2.6rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-white)' }}>
                  {selected.length > 0 ? `$${min.toLocaleString()} – $${max.toLocaleString()}` : '$0'}
                </div>
                <p style={{ color: 'var(--purple-300)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 600 }}>
                  A detailed copy was sent to {contact.email}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={onClose}>Done</button>
                <a href="/contact" className="btn btn-glass" onClick={onClose}>Book Discovery Call</a>
              </div>
            </div>
          )}

          {/* Footer Nav */}
          {!done && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              {step > 1 ? (
                <button className="btn btn-glass" onClick={() => setStep(step - 1)} style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                  <ArrowLeft size={15} /> Back
                </button>
              ) : <div />}
              {step < 4 && (
                <button className="btn btn-primary" onClick={() => setStep(step + 1)} disabled={step === 1 && selected.length === 0} style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
                  Next <ArrowRight size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
