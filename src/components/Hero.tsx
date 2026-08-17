import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
}

// ── Inline 3D Perspective Card (ported from lightswind, styled for Bytehawk) ──
function PerspectiveCard({ image }: { image: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const card = cardRef.current;
      const shine = shineRef.current;
      const shadow = shadowRef.current;
      if (!card || !shine || !shadow) return;

      const wW = window.innerWidth;
      const wH = window.innerHeight;
      const mx = event.clientX;
      const my = event.clientY;

      const xRatio = (mx / wW) * 2 - 1; // -1 to 1
      const yRatio = (my / wH) * 2 - 1;

      const rotX = -(yRatio * 12);
      const rotY = xRatio * 12;
      const transX = xRatio * 18;
      const transY = yRatio * 18;

      const theta = Math.atan2(my - wH / 2, mx - wW / 2);
      const angle = (theta * 180) / Math.PI - 90;

      card.style.transform = `translate3d(${transX}px,${transY}px,0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      // Image stays fixed — no backgroundPosition change

      shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${(my / wH) * 0.35}) 0%, rgba(255,255,255,0) 75%)`;

      const cx = mx - wW / 2;
      const cy = my - wH / 2;
      shadow.style.transform = `scale(0.92) translateX(${cx * -0.015 + 10}px) translateY(${cy * -0.015 + 14}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const W = '100%';
  const H = '100%';

  return (
    <div style={{ perspective: '1100px', width: W, height: H, position: 'relative' }}>
      {/* Shadow */}
      <div
        ref={shadowRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 24,
          background: 'rgba(80,30,180,0.45)',
          filter: 'blur(28px)',
          transform: 'scale(0.92) translateY(14px)',
          transition: 'transform 0.14s ease-out',
          zIndex: 1,
        }}
      />

      {/* Card */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 24,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          border: '1.5px solid rgba(139,92,246,0.35)',
          boxShadow: '0 0 0 1px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
          transition: 'transform 0.14s ease-out, background-position 0.14s ease-out',
          willChange: 'transform',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        {/* Inner overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, transparent 55%, rgba(217,70,239,0.1) 100%)',
          }}
        />
        {/* Shine layer */}
        <div
          ref={shineRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            zIndex: 10,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero({ onOpenEstimator }: HeroProps) {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '130px 8% 70px 8%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-card-wrap {
          width: 100%;
          aspect-ratio: 4 / 3;
          position: relative;
        }
        @keyframes scrollDot {
          0%   { top: 7px;  opacity: 1; }
          100% { top: 22px; opacity: 0; }
        }
        @keyframes pulseGlow {
          0%   { opacity: 0.12; transform: scale(0.96) translate(0, 0); }
          50%  { opacity: 0.22; transform: scale(1.04) translate(10px, -10px); }
          100% { opacity: 0.12; transform: scale(0.96) translate(0, 0); }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-card-wrap { aspect-ratio: 16/9; }
        }
      `}</style>

      {/* Subtle pulsing background purple glows (dim/low-opacity behind text) */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(124,58,237,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'pulseGlow 10s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(217,70,239,0.18) 0%, rgba(217,70,239,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 1,
          animation: 'pulseGlow 14s ease-in-out infinite alternate',
        }}
      />

      <div className="hero-grid" style={{ position: 'relative', zIndex: 2 }}>
        {/* ── Left: Copy ── */}
        <div className="animate-fade-up">
          <div className="hero-badge">
            <Sparkles size={14} />
            Bytehawk Digital Studio — Est. 2022
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
              fontWeight: 900,
              color: 'var(--text-white)',
              lineHeight: 1.06,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
            }}
          >
            Engineering{' '}
            <span className="text-gradient">Immersive</span>{' '}
            Interfaces That Scale Brands
          </h1>

          <p
            style={{
              fontSize: '1.08rem',
              color: 'var(--text-muted)',
              maxWidth: '500px',
              lineHeight: 1.78,
              marginBottom: '36px',
            }}
          >
            We design and build ultra-high performance web applications,
            interactive 3D scenes, and custom automated growth funnels for
            next-generation enterprises.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onOpenEstimator}>
              Project Estimator <ArrowRight size={17} />
            </button>
            <button className="btn btn-glass" onClick={() => navigate('/about')}>
              Our Vision <Play size={14} style={{ fill: 'white' }} />
            </button>
          </div>
        </div>

        {/* ── Right: 3D Perspective Card ── */}
        <div
          className="hero-card-wrap animate-fade-in"
          style={{ animationDelay: '0.18s' }}
        >
          <PerspectiveCard image="/hero-image.png" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '7px',
          color: 'var(--text-subtle)',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          fontWeight: 600,
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: 22,
            height: 36,
            border: '1.5px solid rgba(255,255,255,0.14)',
            borderRadius: 99,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 3,
              height: 6,
              background: 'var(--purple-400)',
              borderRadius: 3,
              position: 'absolute',
              top: 7,
              animation: 'scrollDot 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
