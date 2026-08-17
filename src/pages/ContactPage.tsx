import React, { useState, useMemo } from 'react';
import { Mail, Phone, MapPin, Calendar, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScrollPicker from '../components/ScrollPicker';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5000 - 2026 + 1 }, (_, i) => String(2026 + i));
const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const PERIODS = ['AM', 'PM'];

function getDaysInMonth(month: string, year: string) {
  const m = MONTHS.indexOf(month);
  const y = parseInt(year);
  return new Date(y, m + 1, 0).getDate();
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', service: 'web', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [booked, setBooked] = useState(false);

  const [selMonth, setSelMonth] = useState<string>(MONTHS[new Date().getMonth()]);
  const [selYear, setSelYear] = useState<string>(String(CURRENT_YEAR));
  const [selDate, setSelDate] = useState<string>('01');
  const [selHour, setSelHour] = useState<string>('10');
  const [selMin, setSelMin] = useState<string>('00');
  const [selPeriod, setSelPeriod] = useState<string>('AM');

  const maxDays = useMemo(() => getDaysInMonth(selMonth, selYear), [selMonth, selYear]);
  const days = useMemo(() => Array.from({ length: maxDays }, (_, i) => String(i + 1).padStart(2, '0')), [maxDays]);

  const handleDateChange = (val: string) => {
    const num = parseInt(val);
    if (num > maxDays) {
      setSelDate(String(maxDays).padStart(2, '0'));
    } else {
      setSelDate(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 90, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#7C3AED', '#D946EF'] });
    confetti({ particleCount: 90, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#7C3AED', '#D946EF'] });
  };

  const dateLabel = `${selMonth} ${parseInt(selDate)}, ${selYear}`;
  const timeLabel = `${selHour}:${selMin} ${selPeriod}`;

  const handleBook = () => {
    setBooked(true);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px auto' }}>
          <span className="section-label">Get In Touch</span>
          <h1 className="section-title text-gradient-white">Let's build your next digital platform</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Reach out for project inquiries, partnership proposals, or just to say hi. We respond within 12 hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Info + Booking */}
          <div>
            <div className="contact-info-item">
              <div className="contact-icon"><Mail size={18} /></div>
              <div>
                <div className="contact-info-label">Email Us</div>
                <a href="mailto:hello@bytehawk.io" className="contact-info-value" style={{ textDecoration: 'none' }}>hello@bytehawk.io</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon"><Phone size={18} /></div>
              <div>
                <div className="contact-info-label">Call Operations</div>
                <a href="tel:+15550199238" className="contact-info-value" style={{ textDecoration: 'none' }}>+1 (555) 019-9238</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon"><MapPin size={18} /></div>
              <div>
                <div className="contact-info-label">Headquarters</div>
                <div className="contact-info-value">52 Broadway, Suite 400, New York, NY</div>
              </div>
            </div>

            {/* Booking Widget */}
            <div className="glass-card-strong" style={{ padding: '28px', marginTop: '10px' }}>
              <h4 style={{ color: 'var(--text-white)', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Calendar size={18} style={{ color: 'var(--purple-300)' }} /> Book a Discovery Call
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '18px' }}>
                Schedule a 30-minute intro call with Ethan Sterling directly.
              </p>

              {!booked ? (
                <>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '10px' }}>Select Date</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                    <ScrollPicker items={days} value={selDate} onChange={handleDateChange} label="Day" width={68} />
                    <ScrollPicker items={MONTHS} value={selMonth} onChange={setSelMonth} label="Month" width={110} />
                    <ScrollPicker items={YEARS} value={selYear} onChange={setSelYear} label="Year" width={72} />
                  </div>

                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '10px' }}>Select Time</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
                    <ScrollPicker items={HOURS} value={selHour} onChange={setSelHour} label="Hour" width={62} />
                    <ScrollPicker items={MINUTES} value={selMin} onChange={setSelMin} label="Min" width={62} />
                    <ScrollPicker items={PERIODS} value={selPeriod} onChange={setSelPeriod} label="" width={62} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '10px 14px', background: 'rgba(139,92,246,0.08)', borderRadius: 10, border: '1px solid rgba(139,92,246,0.15)' }}>
                    <Calendar size={14} style={{ color: 'var(--purple-300)' }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-light)', fontWeight: 600 }}>
                      {dateLabel} at {timeLabel}
                    </span>
                  </div>

                  <button className="btn btn-primary" onClick={handleBook} style={{ width: '100%' }}>
                    Book Meeting
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <Check size={22} style={{ color: '#34D399' }} />
                  </div>
                  <div style={{ color: 'var(--text-white)', fontWeight: 700 }}>Meeting Scheduled!</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>{dateLabel} at {timeLabel}</div>
                  <button className="btn btn-glass" onClick={() => setBooked(false)} style={{ padding: '7px 16px', fontSize: '0.8rem', marginTop: '14px' }}>
                    Book Another Slot
                  </button>
                </div>
              )}
            </div>

            {/* Mock Map */}
            <div style={{ height: '140px', borderRadius: '16px', background: 'rgba(124,58,237,0.05)', border: '1px solid var(--glass-border)', marginTop: '22px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, opacity: 0.08, background: 'linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div style={{ position: 'absolute', top: '42%', left: '55%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(139,92,246,0.3)', position: 'absolute', animation: 'mapPulse 2s ease-out infinite' }} />
                <MapPin size={22} style={{ color: 'var(--purple-400)', fill: 'rgba(139,92,246,0.3)' }} />
                <div style={{ background: 'rgba(6,2,15,0.8)', color: 'var(--text-white)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginTop: '4px', border: '1px solid var(--glass-border)', whiteSpace: 'nowrap' }}>
                  Bytehawk NYC HQ
                </div>
              </div>
              <style>{`@keyframes mapPulse { to { transform: scale(3); opacity: 0; } }`}</style>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-card-strong" style={{ padding: '36px' }}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-white)', marginBottom: '24px' }}>Send a Message</h3>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" type="text" placeholder="Your full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" placeholder="you@company.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Service / Division</label>
                  <select className="form-input form-select" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                    <option value="web">Web Design & Development</option>
                    <option value="graphic">Graphic Design / Branding</option>
                    <option value="marketing">Digital Marketing / SEO</option>
                    <option value="sales">Sales & Business Growth</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Details</label>
                  <textarea className="form-input form-textarea" rows={5} placeholder="Describe your project, budget range, and any specific technical requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>
                  Send Project Request
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '50px 20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '22px' }}>
                  <Check size={28} style={{ color: '#34D399' }} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-white)' }}>Message Transmitted!</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.65', fontSize: '0.92rem' }}>
                  Thank you, <strong style={{ color: 'var(--text-white)' }}>{form.name}</strong>. Your details have been logged. We'll respond to <strong style={{ color: 'var(--text-white)' }}>{form.email}</strong> within 12 hours.
                </p>
                <button className="btn btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: '28px' }}>
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
