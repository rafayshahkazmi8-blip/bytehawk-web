import React, { useState } from 'react';
import { Check, Flame, Gem, Sparkles, HelpCircle, Layers, Paintbrush } from 'lucide-react';
import GlassCard from './GlassCard';

const PackageExplorer = ({ setActiveTab, selectPackage }) => {
  const [activeTabName, setActiveTabName] = useState('vtuber');
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How does the custom commission design process work?',
      a: 'Our workflow is meticulously divided into 5 clear stages: (1) Research & Ideation, where we align on your reference sheet and requirements; (2) Concept Sketching, providing drafts until you approve; (3) Clean Lineart & Layered Coloring, cutting the artwork ready for rigging; (4) Live2D Kinematic Rigging, applying physics and hotkeys; and (5) QA & Delivery, where we provide the VTube Studio package and raw source files.'
    },
    {
      q: 'Do I receive full commercial broadcasting rights?',
      a: 'Yes, absolutely! Commercial rights are included by default in all of our package base prices so you can monetize your channel immediately.'
    },
    {
      q: 'Which face tracking software is compatible with your models?',
      a: 'Our models are exported in standard .moc3 format, fully compatible with VTube Studio, Animaze, and PrprLive. The 3D model upgrades deliver VRM format compatible with VSeeFace, VRChat, and Luppet.'
    },
    {
      q: 'What is the standard turnaround time for delivery?',
      a: 'Timelines range from 4-7 days for branding graphics, 2-3 weeks for Starter VTuber models, 3-4 weeks for Standard, and 4-6 weeks for Premium or Ultimate commissions to ensure flawless quality checking.'
    },
    {
      q: 'How many expressions and outfits can I add later?',
      a: 'You can add unlimited expressions or outfits! Specify them in the Quote Calculator before checking out, or message our support team to upgrade your existing model files at any point in the future.'
    }
  ];

  // Package definitions matching exact user requirements
  const vtuberPackages = [
    {
      id: 'vtuber_basic',
      name: 'Starter VTuber (Beginner)',
      badge: 'Starter Level',
      price: '$249',
      popular: false,
      desc: 'Perfect for content creators launching their virtual streaming journey with high-quality bust-up visual presence.',
      features: [
        'Bust-up (half body) custom model design',
        'Basic Live2D rigging & smooth tracking',
        '3–4 Expressions (Happy, Sad, Angry, Surprised)',
        'Outfit Toggle support included',
        'High-resolution source textures (PSD)'
      ],
      addons: ['Extra Expressions ($25/each)', 'Extra Outfits ($75)', 'Additional Toggles ($20)']
    },
    {
      id: 'vtuber_standard',
      name: 'Standard VTuber',
      badge: 'Most Popular',
      price: '$399',
      popular: true,
      desc: 'Our standard-setting model pack, featuring superior body expression, highly responsive mouth syncing, and pro rigging.',
      features: [
        'Half body or full body detailed model',
        'Advanced Live2D professional rigging',
        '6–8 Animated expressions included',
        'Custom Outfit Toggle support',
        'High-fidelity Mouth Tracking (Improved lip sync)'
      ],
      addons: ['Hand tracking toggle ($60)', 'Special Outfit Switch ($120)', 'Custom Props ($40/each)']
    },
    {
      id: 'vtuber_premium',
      name: 'Premium VTuber (Pro Level)',
      badge: 'Pro Level',
      price: '$749',
      popular: false,
      desc: 'The best-in-class full-body package for established streamers looking for absolute smooth kinematics, custom idle loops, and pro accessories.',
      features: [
        'Full body detailed model design',
        'High-quality Live2D rigging (Fluid kinematics)',
        '8-10 Animated expressions built-in',
        'Advanced physics (Rigid body hair, clothes, jewelry)',
        'Custom idle loops (Breathing, bounce, idle)',
        'Multiple outfit toggles (up to 3)'
      ],
      addons: ['Chibi Mascot overlay ($150)', 'Custom Logo Branding ($100)', 'Stream Overlay integration ($120)']
    }
  ];

  const brandingPackages = [
    {
      id: 'branding_starter',
      name: 'Starter Branding',
      badge: 'Quick Launch',
      price: '$149',
      popular: false,
      desc: 'Essential branding items to get your new channel set up with a clean aesthetic and consistent colors.',
      features: [
        'Simple Custom Logo Design (PNG)',
        'Matching Profile Picture (PFP)',
        '1x Platform Banner (Twitch/YouTube/Twitter)'
      ]
    },
    {
      id: 'branding_creator',
      name: 'Creator Branding Pack',
      badge: 'Streamer Starter',
      price: '$249',
      popular: true,
      desc: 'Build a cohesive streamer identity. Adds dynamic overlays to hook your audience on day one.',
      features: [
        'Custom Logo Design (High-res concept)',
        'Channel PFP + Banner designs',
        '1x Elegant Stream Overlay (HUD)'
      ]
    },
    {
      id: 'branding_pro',
      name: 'Pro Streamer Branding',
      badge: 'Complete Suite',
      price: '$399',
      popular: false,
      desc: 'The ultimate professional suite of overlays, custom mascot logo, alerts, and custom emotes to look tier-1.',
      features: [
        'Professional Mascot Logo Design',
        'Channel PFP + Platform Banners',
        'Custom Twitch/YouTube panels (up to 10)',
        'Stream Overlays (Starting, BRB, Ending, Chat)',
        '6x Custom Chat Emotes',
        'Custom alerts set (Follower, Sub, Raid)'
      ]
    }
  ];

  const handleConfigureClick = (pkgType, pkgId) => {
    selectPackage(pkgType, pkgId);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '110px 0 100px 0' }} className="fade-in">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
            Commission <span className="gradient-text-primary">Packages</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            We offer specialized custom VTuber creation, clean vector stream branding, and full package production. Choose a layout to begin customizing.
          </p>
        </div>

        {/* Tab Selector */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-glow)',
            borderRadius: '30px',
            padding: '4px',
            maxWidth: '480px',
            margin: '0 auto 48px auto'
          }}
        >
          <button
            style={{
              flex: 1,
              background: activeTabName === 'vtuber' ? 'var(--primary)' : 'none',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 20px',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={() => setActiveTabName('vtuber')}
          >
            <Layers size={16} /> VTuber Models
          </button>
          <button
            style={{
              flex: 1,
              background: activeTabName === 'branding' ? 'var(--primary)' : 'none',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 20px',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onClick={() => setActiveTabName('branding')}
          >
            <Paintbrush size={16} /> Branding Packs
          </button>
        </div>

        {/* Core Packages Grid */}
        <div className="grid-3" style={{ marginBottom: '60px' }}>
          {(activeTabName === 'vtuber' ? vtuberPackages : brandingPackages).map((pkg) => (
            <GlassCard
              key={pkg.id}
              className={`package-card ${pkg.popular ? 'popular-card' : ''}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                border: pkg.id.includes('starter') ? '2px solid var(--accent)' : pkg.id.includes('standard') || pkg.id.includes('creator') ? '2px solid var(--primary)' : '2px solid var(--secondary)',
                boxShadow: pkg.id.includes('starter') ? '0 0 25px var(--accent-glow), inset 0 0 15px var(--accent-glow)' : pkg.id.includes('standard') || pkg.id.includes('creator') ? '0 0 25px var(--primary-glow), inset 0 0 15px var(--primary-glow)' : '0 0 25px var(--secondary-glow), inset 0 0 15px var(--secondary-glow)'
              }}
            >
              {pkg.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'var(--secondary)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Flame size={12} fill="#ffffff" /> POPULAR
                </div>
              )}

              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {pkg.badge}
              </span>
              
              <h3 style={{ fontSize: '1.5rem', marginTop: '4px', marginBottom: '8px' }}>{pkg.name}</h3>
              
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '16px' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: '800', color: '#ffffff' }}>{pkg.price}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>USD Base</span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', flexGrow: 1 }}>
                {pkg.desc}
              </p>

              {/* Feature List */}
              <div style={{ borderTop: '1px solid var(--border-glow)', paddingTop: '20px', marginBottom: '24px' }}>
                <h5 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  What's Included:
                </h5>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <Check size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extra Addons specific list for VTuber */}
              {pkg.addons && (
                <div style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-glow)', borderRadius: '8px', padding: '12px 16px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Available Add-ons:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {pkg.addons.map((add, idx) => (
                      <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '2px 8px', borderRadius: '4px' }}>
                        {add}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Button */}
              <button
                className={`btn ${pkg.popular ? 'btn-secondary' : 'btn-outline'}`}
                style={{ width: '100%' }}
                onClick={() => handleConfigureClick(activeTabName, pkg.id)}
              >
                Choose & Configure
              </button>
            </GlassCard>
          ))}
        </div>

        {/* 💎 Ultimate Package Spotlight Section */}
        <div style={{ marginTop: '80px' }}>
          <GlassCard
            className="ultimate-spotlight-card"
            style={{
              border: '2px solid rgba(6, 182, 212, 0.4)',
              background: 'radial-gradient(ellipse at top right, rgba(6, 182, 212, 0.15) 0%, rgba(89, 50, 230, 0.05) 50%, var(--bg-card) 100%)',
              boxShadow: '0 20px 45px rgba(6, 182, 212, 0.1)'
            }}
          >
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#22d3ee',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                  }}
                >
                  <Gem size={12} fill="#22d3ee" /> AGENCY / PLATINUM LEVEL
                </div>

                <h2 style={{ fontSize: '2.25rem', marginBottom: '12px' }}>
                  💎 The Ultimate Package
                </h2>
                
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1rem', lineHeight: '1.6' }}>
                  Our flagship all-in-one suite designed specifically for professional streamers and agencies looking for a turnkey, AAA-tier debut assets bundle. Covers full detailed character models, mascot branding, and custom animated transition media.
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '32px' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ffffff' }}>$1,499</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Complete Bundle</span>
                </div>

                <button
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                    boxShadow: '0 4px 20px var(--accent-glow)'
                  }}
                  onClick={() => handleConfigureClick('ultimate', 'ultimate_agency')}
                >
                  Acquire Ultimate Pack
                </button>
              </div>

              {/* Ultimate Package Checklist Grid */}
              <div
                style={{
                  background: 'rgba(5, 7, 12, 0.4)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-glow)',
                  padding: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px'
                }}
              >
                {[
                  '1x Custom Brand Logo',
                  '2x Platform Banners',
                  '1x Animated Overlay Pack',
                  '1x Full VTuber Model (Ready to Rig)',
                  '1x High-End Fluid Rigging',
                  '1x Character Design Sheet',
                  '1x Custom Intro Video',
                  '1x Custom Outro Video',
                  '1x Stinger Transition',
                  '6x Custom Chat Emotes',
                  '6x Sub Badges Set',
                  '1x Debut Announcement Poster',
                  '6x Model Reveal Posters',
                  
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                      <Check size={10} style={{ color: 'var(--accent)' }} />
                    </div>
                    <span style={{ color: 'var(--text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 📚 Interactive Accordion FAQ Section */}
        <div style={{ marginTop: '80px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              Got Questions?
            </span>
            <h2 style={{ fontSize: '2.25rem', marginTop: '6px' }}>
              Commission FAQ Accordion
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <GlassCard
                key={idx}
                padding={false}
                style={{
                  border: faqOpenIndex === idx ? '1px solid var(--accent)' : '1px solid var(--border-glow)',
                  boxShadow: faqOpenIndex === idx ? '0 5px 15px var(--accent-glow)' : 'none',
                  overflow: 'hidden',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => setFaqOpenIndex(faqOpenIndex === idx ? null : idx)}
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    backgroundColor: faqOpenIndex === idx ? 'rgba(6, 182, 212, 0.03)' : 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <h4 style={{ fontSize: '1.05rem', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} style={{ color: faqOpenIndex === idx ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0 }} />
                    <span style={{ color: faqOpenIndex === idx ? '#ffffff' : 'var(--text-secondary)' }}>{faq.q}</span>
                  </h4>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'light', color: 'var(--text-muted)', transform: faqOpenIndex === idx ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', lineHeight: 1 }}>
                    +
                  </span>
                </div>

                {/* Accordion Collapsible Panel */}
                <div
                  style={{
                    maxHeight: faqOpenIndex === idx ? '300px' : '0px',
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    backgroundColor: 'rgba(5, 7, 12, 0.2)'
                  }}
                >
                  <p style={{ padding: '0 24px 20px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .package-card {
          height: 100%;
        }
        
        .popular-card {
          box-shadow: 0 10px 30px var(--secondary-glow);
          transform: scale(1.02);
        }
        
        .popular-card:hover {
          transform: scale(1.04) translateY(-5px) !important;
        }

        @media (max-width: 900px) {
          .ultimate-spotlight-card .grid-2 {
            grid-template-columns: 1fr !important;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default PackageExplorer;
