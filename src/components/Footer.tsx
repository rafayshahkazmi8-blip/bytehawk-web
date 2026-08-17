import { useNavigate } from 'react-router-dom';
import SocialCard from './widgets/SocialCard';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ],
  Services: [
    { label: 'Web Development', path: '/contact' },
    { label: 'Graphic Design', path: '/contact' },
    { label: 'Digital Marketing', path: '/contact' },
    { label: 'Sales Growth', path: '/contact' },
  ],
  Resources: [
    { label: 'Project Estimator', path: '/' },
    { label: 'Case Studies', path: '/portfolio' },
    { label: 'Privacy Policy', path: '/' },
    { label: 'Terms of Service', path: '/' },
  ],
};



interface FooterProps {
  onOpenEstimator?: () => void;
}

export default function Footer({ onOpenEstimator }: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer style={{ position: 'relative', zIndex: 10 }}>
      {/* Main footer body */}
      <div style={{ background: 'rgba(0,0,0,0.4)', padding: '70px 8% 40px 8%', backdropFilter: 'blur(20px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Top: Brand + Links + Social */}
          <div className="footer-main-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '60px' }}>

            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                <img src="/logo.jpeg" alt="Bytehawk" style={{ height: '36px', width: '36px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid rgba(139,92,246,0.4)' }} />
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-white)' }}>Bytehawk</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '24px', maxWidth: '260px' }}>
                Engineering immersive digital platforms that drive measurable growth for next-generation enterprises worldwide.
              </p>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { icon: <Mail size={14} />, text: 'hello@bytehawk.io', href: 'mailto:hello@bytehawk.io' },
                  { icon: <Phone size={14} />, text: '+1 (555) 019-9238', href: 'tel:+15550199238' },
                  { icon: <MapPin size={14} />, text: 'New York, NY 10004', href: '#' },
                ].map((item, i) => (
                  <a key={i} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--text-subtle)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-300)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}>
                    <span style={{ color: 'var(--purple-400)' }}>{item.icon}</span>
                    {item.text}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav Link Columns */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-white)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {group}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {links.map(link => (
                    <li key={link.label}>
                      <span
                        onClick={() => navigate(link.path)}
                        style={{ fontSize: '0.87rem', color: 'var(--text-subtle)', cursor: 'pointer', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--purple-300)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-subtle)'; }}
                      >
                        {link.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Social Card Widget */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.08em', alignSelf: 'flex-start' }}>
                Follow Us
              </h4>
              <SocialCard />
            </div>
          </div>

          {/* Services highlight row */}
          <div style={{ padding: '28px', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: '18px', marginBottom: '40px' }}>
            <div className="footer-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
              {[
                { t: 'Web Development', d: 'React, Three.js, TypeScript apps built for speed and immersion.' },
                { t: 'Graphic Design', d: 'Visual identity systems, logos, and brand books.' },
                { t: 'Digital Marketing', d: 'ROI-driven PPC, SEO, and conversion strategies.' },
                { t: 'Sales Growth', d: 'Automated CRM pipelines and outbound funnels.' },
              ].map((s, i) => (
                <div key={i} style={{ cursor: 'pointer' }} onClick={() => navigate('/contact')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--purple-300)', fontFamily: 'var(--font-heading)' }}>{s.t}</span>
                    <ArrowUpRight size={12} style={{ color: 'var(--purple-400)' }} />
                  </div>
                  <p style={{ fontSize: '0.77rem', color: 'var(--text-subtle)', lineHeight: 1.5 }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="footer-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(217,70,239,0.08) 100%)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '16px', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-white)', fontSize: '1.05rem', marginBottom: '2px' }}>Ready to start your project?</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Get a free cost estimate in under 2 minutes.</p>
            </div>
            <button className="btn btn-primary" onClick={onOpenEstimator} style={{ whiteSpace: 'nowrap' }}>
              Open Project Estimator
            </button>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
              © 2024 Bytehawk Studio. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <span key={l} style={{ color: 'var(--text-subtle)', fontSize: '0.8rem', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--purple-300)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-subtle)')}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
