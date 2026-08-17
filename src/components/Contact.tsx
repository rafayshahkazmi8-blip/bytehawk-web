import React, { useState, useMemo } from 'react';
import { Mail, Phone, MapPin, Calendar, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import ScrollPicker from './ScrollPicker';

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

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', service: 'web', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  const dateLabel = `${selMonth} ${parseInt(selDate)}, ${selYear}`;
  const timeLabel = `${selHour}:${selMin} ${selPeriod}`;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#7C3AED', '#D946EF']
    });
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#7C3AED', '#D946EF']
    });
  };

  const handleBookMeeting = () => {
    setBookingConfirmed(true);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="contact" className="section" style={{ minHeight: '100vh', justifyContent: 'center', zIndex: 10 }}>
      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: start;
          margin-top: 40px;
        }
        .info-card {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-icon {
          background: rgba(124, 58, 237, 0.08);
          color: var(--primary-purple);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .calendly-widget {
          background: var(--white);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 24px;
          margin-top: 30px;
          box-shadow: 0 10px 30px var(--glass-shadow);
        }
        .booking-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 10px;
          margin-bottom: 15px;
        }
        .booking-btn {
          border: 1px solid #E9D5FF;
          background: transparent;
          padding: 8px 5px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          text-align: center;
          color: var(--text-dark);
        }
        .booking-btn:hover {
          border-color: var(--primary-purple);
          background: #FAF5FF;
        }
        .booking-btn.active {
          background: var(--primary-purple);
          border-color: var(--primary-purple);
          color: white;
        }
        .mock-map {
          height: 150px;
          width: 100%;
          background: #E0E7FF;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          margin-top: 30px;
          border: 1px solid var(--glass-border);
        }
        .map-pin {
          position: absolute;
          top: 40%;
          left: 55%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--primary-purple);
          cursor: pointer;
        }
        .map-pin-pulse {
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.4);
          animation: mapPulse 1.8s infinite ease-out;
          z-index: 1;
        }
        @keyframes mapPulse {
          to { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      <div className="contact-layout">
        {/* Contact Info & Booking */}
        <div>
          <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
            Get In Touch
          </span>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '25px', lineHeight: 1.15 }}>
            Let's build your next digital platform
          </h2>
          
          <div className="info-card">
            <div className="info-icon"><Mail size={18} /></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Send Email</div>
              <a href="mailto:hello@bytehawk.io" style={{ color: 'var(--text-dark)', fontWeight: 700, textDecoration: 'none' }}>hello@bytehawk.io</a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><Phone size={18} /></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Call Operations</div>
              <a href="tel:+15550199" style={{ color: 'var(--text-dark)', fontWeight: 700, textDecoration: 'none' }}>+1 (555) 019-9238</a>
            </div>
          </div>

          <div className="info-card">
            <div className="info-icon"><MapPin size={18} /></div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Headquarters</div>
              <div style={{ color: 'var(--text-dark)', fontWeight: 700 }}>52 Broadway, Suite 400, NY</div>
            </div>
          </div>

          {/* Interactive Booking Widget */}
          <div className="calendly-widget">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-dark)' }}>
              <Calendar size={18} style={{ color: 'var(--primary-purple)' }} /> Mock Calendly Booking Widget
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Select a time to automatically schedule a discovery call with Ethan Sterling.
            </p>

            {!bookingConfirmed ? (
              <>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '15px' }}>1. Select Date</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 10, marginBottom: 15, flexWrap: 'wrap' }}>
                  <ScrollPicker items={days} value={selDate} onChange={handleDateChange} label="Day" width={68} />
                  <ScrollPicker items={MONTHS} value={selMonth} onChange={setSelMonth} label="Month" width={110} />
                  <ScrollPicker items={YEARS} value={selYear} onChange={setSelYear} label="Year" width={72} />
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '10px' }}>2. Select Time</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 10, marginBottom: 15, flexWrap: 'wrap' }}>
                  <ScrollPicker items={HOURS} value={selHour} onChange={setSelHour} label="Hour" width={62} />
                  <ScrollPicker items={MINUTES} value={selMin} onChange={setSelMin} label="Min" width={62} />
                  <ScrollPicker items={PERIODS} value={selPeriod} onChange={setSelPeriod} label="" width={62} />
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={handleBookMeeting}
                  style={{ width: '100%', padding: '10px 14px', fontSize: '0.9rem', marginTop: '5px' }}
                >
                  Book Discovery Meeting
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '15px 0' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#DEF7EC', color: '#03543F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                  <Check size={20} />
                </div>
                <h5 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-dark)' }}>Meeting Scheduled!</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  A Calendly link and details were sent for <strong>{dateLabel} at {timeLabel}</strong>.
                </p>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setBookingConfirmed(false)}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', marginTop: '12px' }}
                >
                  Book another slot
                </button>
              </div>
            )}
          </div>

          {/* Interactive Mock Map */}
          <div className="mock-map">
            {/* Grid overlay for map appearance */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15, background: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '15px 15px' }} />
            
            <div className="map-pin">
              <div className="map-pin-pulse" />
              <MapPin size={24} style={{ fill: 'var(--primary-purple)', color: 'white', zIndex: 2 }} />
              <span style={{ background: 'white', color: 'var(--text-dark)', fontWeight: 700, fontSize: '0.75rem', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--glass-border)', marginTop: '4px', whiteSpace: 'nowrap', zIndex: 2, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                Bytehawk NYC Office
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card">
          {!formSubmitted ? (
            <form onSubmit={handleContactSubmit}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>Send a Message</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Marcus Aurelius"
                  className="careers-input"
                  style={{ marginBottom: 0 }}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. marcus@empire.org"
                  className="careers-input"
                  style={{ marginBottom: 0 }}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '6px' }}>Division / Project Type</label>
                <select 
                  className="careers-input"
                  style={{ marginBottom: 0 }}
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="web">Web Design & Development</option>
                  <option value="graphic">Graphic Design / Branding</option>
                  <option value="marketing">Digital Marketing / SEO</option>
                  <option value="sales">Sales & Business Growth</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', display: 'block', marginBottom: '6px' }}>Project Specifications</label>
                <textarea 
                  rows={4}
                  placeholder="Please describe your project, budget limitations, or tech requirements..."
                  className="careers-input"
                  style={{ marginBottom: 0, resize: 'none' }}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Project Request
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DEF7EC', color: '#03543F', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Message Transmitted!</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Thank you, <strong>{formData.name}</strong>. A copy of your details has been logged. We will reach back to you at <strong>{formData.email}</strong> within 12 hours.
              </p>
              <button className="btn btn-primary" onClick={() => setFormSubmitted(false)} style={{ marginTop: '25px' }}>
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
