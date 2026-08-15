import React, { useState } from 'react';
import { Menu, X, ShieldAlert, ChevronDown, Briefcase, Play, Monitor, Users, Layers, Smile, Sliders } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Packages' },
    { id: 'calculator', label: 'Quote Calculator' }
  ];

  const dropdownItems = [
    { id: 'workflow', label: 'Agency Workflow' },
    { id: 'faq', label: 'F.A.Q. & Support' },
    { id: 'contact', label: 'Contact & Feedback' }
  ];

  const portfolioMegaItems = [
    {
      id: 'all',
      label: 'All Portfolio',
      desc: 'Browse every project we have shipped',
      icon: Briefcase,
      iconColor: '#6d28d9',
      iconBg: 'rgba(109,40,217,0.18)',
      featured: true,
    },
    {
      id: '3d-animations',
      label: '3D Animations',
      desc: 'Videos of 3D motion & cinematic pieces',
      icon: Play,
      iconColor: '#f97316',
      iconBg: 'rgba(249,115,22,0.18)',
    },
    {
      id: '2d-animations',
      label: '2D Animations',
      desc: 'Animated 2D videos & motion art',
      icon: Play,
      iconColor: '#a855f7',
      iconBg: 'rgba(168,85,247,0.18)',
    },
    {
      id: '2d-rigging',
      label: '2D Rigging',
      desc: 'Live2D VTuber model rigging & physics',
      icon: Sliders,
      iconColor: '#ec4899',
      iconBg: 'rgba(236,72,153,0.18)',
    },
    {
      id: '3d-models',
      label: '3D Models',
      desc: 'Stunning images of 3D character models',
      icon: Users,
      iconColor: '#94a3b8',
      iconBg: 'rgba(148,163,184,0.15)',
    },
    {
      id: '2d-models',
      label: '2D Models',
      desc: 'Static 2D character model artwork',
      icon: Users,
      iconColor: '#f97316',
      iconBg: 'rgba(249,115,22,0.18)',
    },
    {
      id: 'branding',
      label: 'Branding & Graphics',
      desc: 'Logos, overlays & complete brand kits',
      icon: Layers,
      iconColor: '#94a3b8',
      iconBg: 'rgba(148,163,184,0.15)',
    },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePortfolioItemClick = (itemId) => {
    setActiveTab('portfolio');
    setMobileMenuOpen(false);
    setMobilePortfolioOpen(false);
    if (itemId !== 'all') {
      sessionStorage.setItem('portfolioFilter', itemId);
    } else {
      sessionStorage.setItem('portfolioFilter', 'all');
    }
    window.dispatchEvent(new CustomEvent('portfolioFilterChange', { detail: itemId }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDropdownActive = dropdownItems.some(item => item.id === activeTab);
  const isPortfolioActive = activeTab === 'portfolio';
  const isAdminActive = activeTab === 'admin';

  return (
    <header>
      <div className={`container nav-container ${isAdminActive ? 'nav-admin-active' : ''}`}>
        {/* Logo */}
        <div className="logo-wrapper" onClick={() => handleNavClick('home')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <img
            className="brand-logo"
            src="/uploads/LOGO.png"
            alt="Vutuber Design"
            draggable={false}
          />
        </div>

        {/* Desktop Links */}
        <nav>
          <ul className="nav-links">
            {/* Home */}
            <li>
              <span
                className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Home
              </span>
            </li>

            {/* Portfolio & Services Mega Dropdown */}
            <li className="mega-dropdown-container">
              <span
                className={`nav-link ${isPortfolioActive ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
              >
                Portfolio &amp; Services <ChevronDown size={14} className="mega-chevron-icon" />
              </span>

              {/* Mega Dropdown Panel */}
              <div className="mega-dropdown-panel">
                <div className="mega-dropdown-inner">

                  {/* Portfolio Section */}
                  <div className="mega-section">
                    <div className="mega-section-header">
                      <span className="mega-section-dot" style={{ background: '#6d28d9' }}></span>
                      <span className="mega-section-title">PORTFOLIO</span>
                    </div>
                    <div className="mega-items-grid">
                      {portfolioMegaItems.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <div
                            key={item.id}
                            className={`mega-item ${item.featured ? 'mega-item-featured' : ''}`}
                            onClick={() => handlePortfolioItemClick(item.id)}
                          >
                            <div
                              className="mega-item-icon"
                              style={{ background: item.iconBg, color: item.iconColor }}
                            >
                              <IconComp size={18} />
                            </div>
                            <div className="mega-item-text">
                              <span className="mega-item-label">{item.label}</span>
                              <span className="mega-item-desc">{item.desc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>
            </li>

            {/* Packages */}
            <li>
              <span
                className={`nav-link ${activeTab === 'packages' ? 'active' : ''}`}
                onClick={() => handleNavClick('packages')}
              >
                Packages
              </span>
            </li>

            {/* Quote Calculator */}
            <li>
              <span
                className={`nav-link ${activeTab === 'calculator' ? 'active' : ''}`}
                onClick={() => handleNavClick('calculator')}
              >
                Quote Calculator
              </span>
            </li>

            {/* Resources Dropdown */}
            <li className="dropdown-container">
              <span
                className={`nav-link ${isDropdownActive ? 'active' : ''}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Resources <ChevronDown size={14} className="chevron-icon" />
              </span>
              <ul className="dropdown-menu-list">
                {dropdownItems.map((subItem) => (
                  <li key={subItem.id}>
                    <span
                      className={`dropdown-item ${activeTab === subItem.id ? 'active' : ''}`}
                      onClick={() => handleNavClick(subItem.id)}
                    >
                      {subItem.label}
                    </span>
                  </li>
                ))}
              </ul>
            </li>

            {activeTab === 'admin' && (
              <li className="admin-nav-link">
                <span
                  className="nav-link active"
                  style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={() => handleNavClick('admin')}
                >
                  <ShieldAlert size={16} /> Admin Portal
                </span>
              </li>
            )}
          </ul>
        </nav>

        {/* Right Call To Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex' }}
            onClick={() => handleNavClick('calculator')}
          >
            Get a Quote
          </button>

          {/* Hamburger Menu Icon */}
          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'none',
            }}
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(7, 9, 14, 0.97)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-glow)',
            padding: '24px',
            zIndex: 99,
          }}
          className="fade-in"
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {/* Home */}
            <li>
              <span
                style={{
                  display: 'block',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  color: activeTab === 'home' ? '#ffffff' : 'var(--text-secondary)',
                  padding: '10px 0',
                  cursor: 'pointer',
                }}
                onClick={() => handleNavClick('home')}
              >
                Home
              </span>
            </li>

            {/* Portfolio & Services accordion */}
            <li>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  cursor: 'pointer',
                }}
                onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
              >
                <span
                  style={{
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: isPortfolioActive ? '#ffffff' : 'var(--text-secondary)',
                  }}
                >
                  Portfolio &amp; Services
                </span>
                <ChevronDown
                  size={16}
                  style={{
                    color: 'var(--text-secondary)',
                    transform: mobilePortfolioOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
              {mobilePortfolioOpen && (
                <ul style={{ listStyle: 'none', paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
                  {portfolioMegaItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <li key={item.id}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: item.featured ? 'rgba(109,40,217,0.12)' : 'transparent',
                          }}
                          onClick={() => handlePortfolioItemClick(item.id)}
                        >
                          <div style={{ background: item.iconBg, color: item.iconColor, borderRadius: '8px', padding: '6px', display: 'flex' }}>
                            <IconComp size={14} />
                          </div>
                          <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-heading)', color: '#d0d8f0', fontWeight: 500 }}>
                            {item.label}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>

            {/* Other nav items */}
            {[...navItems.filter(i => i.id !== 'home'), ...dropdownItems].map((item) => (
              <li key={item.id}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: activeTab === item.id ? '#ffffff' : 'var(--text-secondary)',
                    padding: '10px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </span>
              </li>
            ))}

            {activeTab === 'admin' && (
              <li>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: 'var(--secondary)',
                    padding: '10px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavClick('admin')}
                >
                  <ShieldAlert size={20} /> Admin Portal
                </span>
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Inline styles */}
      <style>{`
        .dropdown-container {
          position: relative;
          display: inline-block;
        }
        .chevron-icon {
          transition: transform 0.3s ease;
        }
        .dropdown-container:hover .chevron-icon {
          transform: rotate(180deg);
          color: var(--accent);
        }
        .dropdown-menu-list {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          background: rgba(5, 7, 15, 0.97);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-md);
          padding: 10px;
          min-width: 210px;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0;
          visibility: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.7), 0 0 20px var(--primary-glow);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 9999;
        }
        .dropdown-container:hover .dropdown-menu-list {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .dropdown-item {
          display: block;
          padding: 9px 14px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
          border-left: 2px solid transparent;
        }
        .dropdown-item:hover, .dropdown-item.active {
          background: rgba(109, 40, 217, 0.12);
          color: #ffffff;
          border-left: 2px solid var(--primary);
          padding-left: 12px;
        }

        .mega-dropdown-container {
          position: relative;
          display: inline-block;
        }
        .mega-chevron-icon {
          transition: transform 0.3s ease;
        }
        .mega-dropdown-container:hover .mega-chevron-icon {
          transform: rotate(180deg);
          color: var(--accent);
        }

        .mega-dropdown-panel {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 9998;
          pointer-events: none;
        }
        .mega-dropdown-container:hover .mega-dropdown-panel {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
          pointer-events: all;
        }

        .mega-dropdown-inner {
          background: rgba(4, 2, 18, 0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(109, 40, 217, 0.35);
          border-radius: 16px;
          padding: 24px 28px;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.8),
            0 0 0 0.5px rgba(255,255,255,0.04),
            0 0 30px rgba(109,40,217,0.15),
            inset 0 1px 0 rgba(255,255,255,0.05);
          min-width: 560px;
          position: relative;
          overflow: hidden;
        }

        .mega-dropdown-inner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #6d28d9 30%, #ec4899 60%, transparent 100%);
          opacity: 0.7;
        }

        .mega-section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .mega-section-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 8px currentColor;
        }
        .mega-section-title {
          font-family: var(--font-heading);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .mega-items-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .mega-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          background: transparent;
        }
        .mega-item:hover {
          background: rgba(109, 40, 217, 0.1);
          border-color: rgba(109, 40, 217, 0.25);
        }
        .mega-item-featured {
          background: rgba(109, 40, 217, 0.13);
          border: 1px solid rgba(109, 40, 217, 0.3);
        }
        .mega-item-featured:hover {
          background: rgba(109, 40, 217, 0.2);
          border-color: rgba(109, 40, 217, 0.5);
        }

        .mega-item-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mega-item-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .mega-item-label {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 600;
          color: #e8eeff;
          white-space: nowrap;
        }
        .mega-item-desc {
          font-family: var(--font-body);
          font-size: 0.73rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logo-img {
          height: 60px !important;
          width: auto;
          border-radius: var(--radius-sm);
          background: transparent;
          padding: 0;
          filter: drop-shadow(0 0 8px rgba(13, 110, 253, 0.35));
          transition: var(--transition-smooth);
        }

        @media (max-width: 900px) {
          .nav-links {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
