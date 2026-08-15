import React, { useState } from 'react';
import { ShieldAlert, Sparkles, Send, Check } from 'lucide-react';

const Footer = ({ activeTab, setActiveTab, onLogout, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-glow)',
        backgroundColor: 'rgba(5, 7, 12, 0.9)',
        backdropFilter: 'blur(16px)',
        padding: '64px 0 24px 0',
        marginTop: '80px',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2.5fr 1.5fr 1.5fr 2.5fr',
            gap: '32px',
            marginBottom: '48px'
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand & Slogan */}
          <div>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '16px', 
                cursor: 'pointer' 
              }}
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {/* Brand logo */}
              <img
                className="footer-brand-logo"
                src="/uploads/LOGO.png"
                alt="Vutuber Design"
                draggable={false}
              />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '280px', lineHeight: '1.6', marginBottom: '20px' }}>
              Crafting premium Live2D models, high-precision physics rigging, and cohesive broadcasting overlay systems for elite content creators.
            </p>
            
            {/* Accreditation Neon Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 'bold', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.15)', padding: '4px 10px', borderRadius: '4px', width: 'fit-content' }}>
                <Sparkles size={10} /> AAA RIGGING STANDARDS
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--secondary)', fontWeight: 'bold', background: 'rgba(0, 180, 216, 0.05)', border: '1px solid rgba(0, 180, 216, 0.15)', padding: '4px 10px', borderRadius: '4px', width: 'fit-content' }}>
                ● CREATOR INTAKE VERIFIED
              </div>
            </div>
          </div>

          {/* Column 2: Studio Services */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '0.85rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
              Services
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              <li>Live2D VTuber Rigging</li>
              <li>3D VRM Avatars</li>
              <li>Custom Branding & Logos</li>
              <li>Stream Overlays</li>
              <li>Emotes & Stinger Alerts</li>
            </ul>
          </div>

          {/* Column 3: Client Portals */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '0.85rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
              Client Portal
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem' }}>
              {[
                { id: 'calculator', label: 'Quote Calculator' },
                { id: 'portfolio', label: 'Agency Portfolio' },
                { id: 'workflow', label: 'Workflow Pipeline' },
                { id: 'faq', label: 'F.A.Q. & Support' },
                { id: 'contact', label: 'Inquiry Form' }
              ].map((link) => (
                <li key={link.id}>
                  <span
                    style={{ color: activeTab === link.id ? '#ffffff' : 'var(--text-secondary)', cursor: 'pointer', transition: 'var(--transition-fast)', fontWeight: activeTab === link.id ? '600' : 'normal' }}
                    onClick={() => {
                      setActiveTab(link.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.target.style.color = activeTab === link.id ? '#ffffff' : 'var(--text-secondary)'}
                  >
                    {link.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>



          {/* Column 5: Stateful Glowing Newsletter */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '0.85rem', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
              Join Creator Logs
            </h5>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.4', marginBottom: '16px' }}>
              Stay updated on commission slots intake, rigging releases, and technical stream guidelines.
            </p>

            {subscribed ? (
              <div 
                style={{ 
                  background: 'rgba(0, 242, 254, 0.05)', 
                  border: '1px solid rgba(0, 242, 254, 0.3)', 
                  padding: '12px 16px', 
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--accent)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 0 15px rgba(0, 242, 254, 0.15)',
                  animation: 'fadeIn 0.5s ease forwards'
                }}
              >
                <Check size={14} /> Access Granted • Welcome Aboard, Creator!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(5, 7, 12, 0.6)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 12px',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    flexGrow: 1,
                    outline: 'none',
                    transition: 'var(--transition-fast)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 10px var(--primary-glow)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-light)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    boxShadow: '0 4px 10px var(--primary-glow)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--secondary)';
                    e.currentTarget.style.boxShadow = '0 4px 12px var(--secondary-glow)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.boxShadow = '0 4px 10px var(--primary-glow)';
                  }}
                >
                  <Send size={14} />
                </button>
              </form>
            )}


          </div>
        </div>

        {/* Bottom Lock / Secret Admin link */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.03)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>© {new Date().getFullYear()} Vutuber Design. All rights reserved. Designed with Vanilla CSS and React.</span>
          
          {isAuthenticated && (
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'var(--transition-fast)'
              }}
              onClick={() => {
                onLogout();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onMouseEnter={(e) => e.target.style.color = '#ef4444'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              <ShieldAlert size={12} /> Logout
            </button>
          )}
        </div>

      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
          .footer-grid > div:first-child,
          .footer-grid > div:last-child {
            grid-column: span 2;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .footer-grid > div:first-child,
          .footer-grid > div:last-child {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
