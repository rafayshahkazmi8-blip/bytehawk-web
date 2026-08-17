import { useState, useMemo } from 'react';
import { ArrowRight, Check, Layers, DollarSign, Clock, User, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollPicker from '../components/ScrollPicker';

const services = [
  { id: 'web',      label: 'Web Design & Development',   base: 4500, sub: 'React, Three.js, TypeScript — ultra-fast, immersive applications.' },
  { id: 'design',  label: 'Graphic Design & Branding',   base: 2500, sub: 'Visual identity systems, brand books, and motion design.' },
  { id: 'marketing', label: 'Digital Marketing & SEO',   base: 2000, sub: 'Semantic SEO, PPC campaigns, CRO and analytics reporting.' },
  { id: 'sales',   label: 'Sales & CRM Automation',      base: 3000, sub: 'HubSpot, Salesforce pipelines and automated funnel architecture.' },
];

const budgets = [
  { label: '$2,000 – $5,000',    m: 0.9 },
  { label: '$5,000 – $15,000',   m: 1.0 },
  { label: '$15,000 – $30,000',  m: 1.2 },
  { label: '$30,000+',           m: 1.5 },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const CY = new Date().getFullYear();
const YEARS = Array.from({ length: 5000 - 2026 + 1 }, (_, i) => String(2026 + i));
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINS = ['00','05','10','15','20','25','30','35','40','45','50','55'];
const PERIODS = ['AM','PM'];

function daysInMonth(m: string, y: string) {
  const mi = MONTHS.indexOf(m);
  return new Date(parseInt(y), mi + 1, 0).getDate();
}

const steps = [
  { id: 1, label: 'Services',  icon: <Layers size={16} /> },
  { id: 2, label: 'Budget',    icon: <DollarSign size={16} /> },
  { id: 3, label: 'Schedule',  icon: <Clock size={16} /> },
  { id: 4, label: 'Details',   icon: <User size={16} /> },
];

export default function EstimatePage() {
  const navigate = useNavigate();
  const [step, setStep]         = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget]     = useState('');
  const [form, setForm]         = useState({ name: '', email: '', company: '', notes: '' });
  const [done, setDone]         = useState(false);

  const [selMonth, setSelMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [selYear, setSelYear]   = useState<string>(String(CY));
  const [selDate, setSelDate]   = useState<string>('01');
  const [selHour, setSelHour]   = useState<string>('10');
  const [selMin, setSelMin]     = useState<string>('00');
  const [selPeriod, setSelPeriod] = useState<string>('AM');

  const maxDays = useMemo(() => daysInMonth(selMonth, selYear), [selMonth, selYear]);
  const days = useMemo(() => Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0')), [maxDays]);

  const handleDayChange = (val: string) => {
    const n = parseInt(val);
    setSelDate(n > maxDays ? String(maxDays).padStart(2, '0') : val);
  };

  const dateLabel = `${selMonth} ${parseInt(selDate)}, ${selYear}`;
  const timeLabel = `${selHour}:${selMin} ${selPeriod}`;

  const toggle = (id: string) =>
    setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const getEstimate = () => {
    let base = selected.reduce((s, id) => s + (services.find(x => x.id === id)?.base ?? 0), 0);
    const bm = budgets.find(b => b.label === budget)?.m ?? 1;
    base = base * bm;
    return { min: Math.round((base * 0.85) / 100) * 100, max: Math.round((base * 1.15) / 100) * 100 };
  };

  const canAdvance = () => {
    if (step === 1) return selected.length > 0;
    if (step === 2) return !!budget;
    return true;
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setDone(true);
  };

  const { min, max } = getEstimate();

  // ─── Success State ───────────────────────────────────────────────
  if (done) {
    return (
      <section className="section" style={{ minHeight: '100vh', paddingTop: '140px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(217,70,239,0.15))',
            border: '1px solid rgba(139,92,246,0.35)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '32px',
          }}>
            <Check size={34} style={{ color: 'var(--purple-300)' }} />
          </div>

          <span className="section-label">Submission Confirmed</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', fontWeight: 900, color: 'var(--text-white)', lineHeight: 1.1, margin: '10px 0 20px' }}>
            Your Estimate Request is Logged
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '40px' }}>
            Thank you, <strong style={{ color: 'var(--text-white)' }}>{form.name}</strong>. A detailed project breakdown has been queued to <strong style={{ color: 'var(--text-white)' }}>{form.email}</strong>. Our team will reach out within 12 hours to confirm your scheduled slot on <strong style={{ color: 'var(--purple-300)' }}>{dateLabel}</strong> at <strong style={{ color: 'var(--purple-300)' }}>{timeLabel}</strong>.
          </p>

          <div className="glass-card-strong" style={{ padding: '28px', marginBottom: '32px' }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '10px' }}>Projected Cost Range</p>
            <div style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-white)' }}>
              {selected.length > 0 ? `$${min.toLocaleString()} – $${max.toLocaleString()}` : 'Custom'}
            </div>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', marginTop: '6px' }}>Final price delivered after discovery call</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              Go to Contact <ChevronRight size={15} />
            </button>
            <button className="btn btn-glass" onClick={() => { setDone(false); setStep(1); setSelected([]); setBudget(''); setForm({ name: '', email: '', company: '', notes: '' }); }}>
              New Estimate
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ─── Main Wizard ─────────────────────────────────────────────────
  return (
    <section className="section" style={{ minHeight: '100vh', paddingTop: '130px' }}>
      <style>{`
        .est-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.22s ease;
          margin-bottom: 10px;
          gap: 14px;
        }
        .est-option:hover {
          border-color: rgba(139,92,246,0.35);
          background: rgba(124,58,237,0.07);
        }
        .est-option.active {
          border-color: rgba(139,92,246,0.55);
          background: rgba(124,58,237,0.12);
          box-shadow: 0 0 0 1px rgba(139,92,246,0.2) inset;
        }
        .est-check {
          width: 22px; height: 22px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
        }
        .est-check.active {
          background: var(--purple-500);
          border-color: var(--purple-500);
        }
        .step-indicator {
          display: flex;
          align-items: center;
          gap: 0;
          margin-bottom: 48px;
        }
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          position: relative;
        }
        .step-circle {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.85rem;
          transition: all 0.3s;
          position: relative; z-index: 2;
        }
        .step-line {
          flex: 1;
          height: 2px;
          margin-bottom: 28px;
          transition: background 0.3s;
        }
        .step-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          transition: color 0.3s;
        }
      `}</style>

      <div style={{ maxWidth: '860px', margin: '0 auto', width: '100%' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="section-label">Project Estimator</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', fontWeight: 900, color: 'var(--text-white)', lineHeight: 1.06, letterSpacing: '-0.03em', margin: '10px 0 16px' }}>
            Build a Precision Estimate
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Define your scope, budget, and preferred consultation slot. No commitment required.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((s, i) => (
            <>
              <div className="step-item" key={s.id}>
                <div className="step-circle" style={{
                  background: step > s.id
                    ? 'var(--purple-500)'
                    : step === s.id
                    ? 'linear-gradient(135deg, var(--purple-600), var(--accent-pink))'
                    : 'rgba(255,255,255,0.05)',
                  border: step >= s.id ? 'none' : '1.5px solid rgba(255,255,255,0.1)',
                  color: step >= s.id ? 'white' : 'var(--text-subtle)',
                  boxShadow: step === s.id ? '0 0 20px rgba(124,58,237,0.5)' : 'none',
                }}>
                  {step > s.id ? <Check size={16} /> : s.icon}
                </div>
                <span className="step-label" style={{ color: step === s.id ? 'var(--purple-300)' : step > s.id ? 'var(--purple-400)' : 'var(--text-subtle)' }}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="step-line" style={{ background: step > s.id ? 'var(--purple-500)' : 'rgba(255,255,255,0.07)' }} />
              )}
            </>
          ))}
        </div>

        {/* Main Panel + Summary Side by Side */}
        <div className="est-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

          {/* Main Panel */}
          <div className="glass-card-strong" style={{ padding: '36px' }}>

            {/* Step 1 — Services */}
            {step === 1 && (
              <>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '6px' }}>Which services do you require?</h2>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginBottom: '24px' }}>Select all that apply to your project scope.</p>
                {services.map(svc => (
                  <div key={svc.id} className={`est-option ${selected.includes(svc.id) ? 'active' : ''}`} onClick={() => toggle(svc.id)}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-white)', marginBottom: '3px' }}>{svc.label}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{svc.sub}</div>
                    </div>
                    <div className={`est-check ${selected.includes(svc.id) ? 'active' : ''}`}>
                      {selected.includes(svc.id) && <Check size={12} />}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Step 2 — Budget */}
            {step === 2 && (
              <>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '6px' }}>What is your investment range?</h2>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginBottom: '24px' }}>This helps us recommend the appropriate scope and tier.</p>
                {budgets.map(b => (
                  <div key={b.label} className={`est-option ${budget === b.label ? 'active' : ''}`} onClick={() => setBudget(b.label)}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-white)' }}>{b.label}</span>
                    <div className={`est-check ${budget === b.label ? 'active' : ''}`}>
                      {budget === b.label && <Check size={12} />}
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* Step 3 — Schedule */}
            {step === 3 && (
              <>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '6px' }}>Schedule a Discovery Call</h2>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginBottom: '28px' }}>Pick your preferred date and time for a 30-minute consultation.</p>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--purple-300)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Select Date</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <ScrollPicker items={days} value={selDate} onChange={handleDayChange} label="Day" width={60} />
                    <ScrollPicker items={MONTHS} value={selMonth} onChange={setSelMonth} label="Month" width={100} />
                    <ScrollPicker items={YEARS} value={selYear} onChange={setSelYear} label="Year" width={64} />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--purple-300)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Select Time</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <ScrollPicker items={HOURS} value={selHour} onChange={setSelHour} label="Hour" width={56} />
                    <ScrollPicker items={MINS} value={selMin} onChange={setSelMin} label="Min" width={56} />
                    <ScrollPicker items={PERIODS} value={selPeriod} onChange={setSelPeriod} label="" width={56} />
                  </div>
                </div>

                <div style={{ padding: '14px 18px', borderRadius: '12px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple-300)', flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-light)', fontSize: '0.88rem', fontWeight: 600 }}>
                    Slot reserved — <strong style={{ color: 'var(--purple-200)' }}>{dateLabel}</strong> at <strong style={{ color: 'var(--purple-200)' }}>{timeLabel}</strong>
                  </span>
                </div>
              </>
            )}

            {/* Step 4 — Details */}
            {step === 4 && (
              <>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '6px' }}>Your Contact Details</h2>
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem', marginBottom: '28px' }}>We will send the full estimate breakdown to this email address.</p>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" type="text" placeholder="Your full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="you@company.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Company / Organisation</label>
                  <input className="form-input" type="text" placeholder="Optional" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Additional Context</label>
                  <textarea className="form-input form-textarea" rows={3} placeholder="Any specific requirements, integrations, or constraints..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ minHeight: '80px' }} />
                </div>
              </>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {step > 1 ? (
                <button className="btn btn-glass" onClick={() => setStep(s => s - 1)} style={{ padding: '10px 20px', fontSize: '0.84rem' }}>
                  Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canAdvance()}
                  style={{ padding: '12px 28px' }}
                >
                  Continue <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email}
                  style={{ padding: '12px 28px' }}
                >
                  Submit Request <ArrowRight size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Right: Live Summary */}
          <div className="est-summary" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '120px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '18px' }}>Summary</h4>

              {selected.length === 0 && !budget && step < 3 && (
                <p style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', lineHeight: 1.6 }}>Your selections will appear here as you progress.</p>
              )}

              {selected.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--purple-300)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Services</p>
                  {selected.map(id => {
                    const s = services.find(x => x.id === id);
                    return s ? (
                      <div key={id} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-pink)', flexShrink: 0 }} />
                        {s.label}
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {budget && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--purple-300)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Budget</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{budget}</p>
                </div>
              )}

              {dateLabel && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--purple-300)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Scheduled</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{dateLabel} · {timeLabel}</p>
                </div>
              )}

              {selected.length > 0 && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', marginTop: '6px' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Est. Range</p>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', color: 'var(--text-white)' }}>
                    ${min.toLocaleString()} – ${max.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            <div className="glass-card" style={{ padding: '22px' }}>
              <h4 style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>Why Bytehawk</h4>
              {[
                'Fixed-price contracts, zero surprises',
                '30-day post-launch support included',
                '60fps performance, guaranteed',
                '99.4% client satisfaction rate',
                'Dedicated project manager assigned',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '9px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--purple-400)', marginTop: '7px', flexShrink: 0 }} />
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
