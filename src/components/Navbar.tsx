import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useEffect } from 'react';



const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
  { label: 'Estimate', path: '/estimate' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => goTo('/')}>
        <img src="/logo.jpeg" alt="Bytehawk" />
      </div>

      <div className="nav-links">
        {navLinks.map(link => (
          <span key={link.path} className={`nav-link ${location.pathname === link.path ? 'active' : ''}`} onClick={() => goTo(link.path)}>
            {link.label}
          </span>
        ))}
        <button className="btn btn-primary" onClick={() => goTo('/estimate')} style={{ padding: '9px 18px', fontSize: '0.82rem' }}>
          Project Estimate
        </button>
      </div>

      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,2,15,0.97)', backdropFilter: 'blur(20px)', zIndex: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px' }}>
          <button style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
          {navLinks.map(link => (
            <span key={link.path} onClick={() => { goTo(link.path); setIsOpen(false); }}
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, color: location.pathname === link.path ? 'var(--purple-300)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}>
              {link.label}
            </span>
          ))}
          <button className="btn btn-primary" style={{ marginTop: '10px', padding: '14px 36px' }} onClick={() => { setIsOpen(false); goTo('/estimate'); }}>
            Project Estimate
          </button>
        </div>
      )}
    </nav>
  );
}
