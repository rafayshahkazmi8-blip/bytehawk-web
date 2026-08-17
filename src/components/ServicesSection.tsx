import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Code, Paintbrush, BarChart3, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const services = [
  {
    icon: <Code size={22} />,
    title: 'Web Design & Development',
    desc: 'React, Three.js, TypeScript — ultra-fast, immersive apps with 60fps rendering.',
    bullets: ['Custom React & Next.js Apps', 'Three.js / WebGL 3D Experiences', 'Headless CMS & E-commerce', 'REST & GraphQL APIs'],
    color: '#7C3AED',
  },
  {
    icon: <Paintbrush size={22} />,
    title: 'Graphic Design & Branding',
    desc: 'Visual identity systems and brand books that command immediate market attention.',
    bullets: ['Logo & Brand Book Design', 'UI/UX Prototypes in Figma', 'Motion & Video Graphics', 'Marketing Collateral Kits'],
    color: '#D946EF',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Digital Marketing & SEO',
    desc: 'Intent-based PPC, semantic SEO, and CRO strategies that multiply conversions.',
    bullets: ['Technical SEO & Core Web Vitals', 'Google & Meta PPC Campaigns', 'Analytics Dashboards & Reporting', 'Email Marketing Automation'],
    color: '#818CF8',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Sales & Business Growth',
    desc: 'Automated CRM pipelines and outbound funnels that remove friction from every deal.',
    bullets: ['HubSpot / Salesforce CRM Setup', 'Multi-step Estimator Widgets', 'Webhook & Zapier Integrations', 'Conversion Funnel Analysis'],
    color: '#A78BFA',
  },
];

const cardVariants: Variants = {
  offHover: (angle: number) => ({
    rotateY: angle,
    z: 20,
    opacity: 0.85,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }),
  onHover: {
    rotateY: 0,
    z: 80,
    opacity: 1,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

interface ServiceCardProps {
  svc: typeof services[0];
  angle: number;
}

const ServiceAngledCard = ({ svc, angle }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{
        width: '320px',
        height: '420px',
        transformStyle: 'preserve-3d',
        flexShrink: 0,
      }}
      custom={angle}
      variants={cardVariants}
      initial="offHover"
      animate={isHovered ? "onHover" : "offHover"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="glass-card service-card" 
        style={{ 
          padding: '30px', 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          border: isHovered ? `1px solid ${svc.color}60` : '1px solid rgba(139,92,246,0.2)',
          boxShadow: isHovered ? `0 20px 40px ${svc.color}15, 0 0 0 1px ${svc.color}15` : '0 15px 40px rgba(0, 0, 0, 0.45)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div 
          className="service-icon" 
          style={{ 
            background: `rgba(${svc.color === '#7C3AED' ? '124,58,237' : svc.color === '#D946EF' ? '217,70,239' : svc.color === '#818CF8' ? '129,140,248' : '167,139,250'}, 0.15)`, 
            borderColor: `${svc.color}40`,
            marginBottom: '20px'
          }}
        >
          <span style={{ color: svc.color }}>{svc.icon}</span>
        </div>
        <div className="service-title" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{svc.title}</div>
        <p className="service-desc" style={{ marginBottom: '22px', fontSize: '0.86rem', lineHeight: '1.5', flexGrow: 1 }}>{svc.desc}</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
          {svc.bullets.map(b => (
            <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={13} style={{ color: svc.color, flexShrink: 0 }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const speed = 35; // speed of auto-scroll
  const angle = 20; // 3D angle of cards
  const gap = 36; // gap between cards in px

  // Triple the list for seamless infinite marquee loop
  const duplicatedServices = [...services, ...services, ...services, ...services];

  useEffect(() => {
    const calculateWidth = () => {
      // 320px width + 36px gap for one set of services
      const singleSetWidth = (320 + gap) * services.length;
      setWidth(singleSetWidth);
    };

    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, []);

  useEffect(() => {
    if (width <= 0) return;

    const startX = 0;
    const endX = -width;

    if (isHovered) return;

    const runAnimation = () => {
      const currentX = x.get();
      const dist = Math.abs(endX - currentX);
      const duration = speed * (dist / width);

      const controls = animate(x, endX, {
        duration: duration,
        ease: "linear",
        onComplete: () => {
          x.set(startX);
          runAnimation();
        }
      });
      return controls;
    };

    const animation = runAnimation();
    return () => animation.stop();
  }, [width, isHovered, x]);

  return (
    <section style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Top divider */}
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)', marginBottom: '80px', padding: '0 8%' }} />

      <div style={{ padding: '0 8%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-label">What We Do</span>
            <h2 className="section-title text-gradient-white" style={{ marginBottom: 0 }}>Our Services</h2>
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/contact')} style={{ gap: '8px' }}>
            Get in Touch <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Angled Slider Stage */}
      <SliderStage
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={containerRef}
          className="slider-track"
          style={{ x, gap: `${gap}px`, transformStyle: 'preserve-3d' }}
        >
          {duplicatedServices.map((svc, i) => (
            <ServiceAngledCard 
              key={i} 
              svc={svc} 
              angle={angle}
            />
          ))}
        </motion.div>
      </SliderStage>

      <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        ← Hover card to inspect · Auto-scrolling services →
      </div>
    </section>
  );
}

const SliderStage = styled.div`
  width: 100%;
  height: 480px;
  position: relative;
  overflow: visible;
  display: flex;
  align-items: center;
  perspective: 1200px;
  padding: 10px 0;
  cursor: pointer;

  .slider-track {
    display: flex;
    align-items: center;
    transform-style: preserve-3d;
    padding-left: 8%;
  }
`;
