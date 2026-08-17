import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, Zap } from 'lucide-react';

interface Member {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export default function About() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const team: Member[] = [
    {
      name: "Ethan Sterling",
      role: "Founder & Chief Architect",
      bio: "Ethan has spent 12 years building cloud infrastructures and designing interactive customer journeys for Fortune 500 tech firms.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Dr. Sarah Lin",
      role: "Director of AI Research",
      bio: "Sarah is a PhD graduate from MIT specializing in distributed systems, real-time optimization, and automated learning pipelines.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Marcus Vance",
      role: "Creative Art Lead",
      bio: "Marcus leads Bytehawk's branding division. He is a multi-award-winning UI designer obsessed with glassmorphism and 3D scenes.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Sophia Martinez",
      role: "Growth Operations Head",
      bio: "Sophia specializes in full-funnel marketing strategies, CRM setups, and scaling outreach systems that consistently multiply ROI.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80"
    }
  ];

  const handleNext = () => {
    setCarouselIndex((carouselIndex + 1) % team.length);
  };

  const handlePrev = () => {
    setCarouselIndex((carouselIndex - 1 + team.length) % team.length);
  };

  return (
    <section id="about" className="section" style={{ minHeight: '100vh', justifyContent: 'center', zIndex: 10 }}>
      <style>{`
        .about-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          margin-top: 40px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 30px;
        }
        .stat-card {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: var(--transition-smooth);
        }
        .stat-card:hover {
          background: var(--white);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(124, 58, 237, 0.05);
        }
        .stat-num {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-purple);
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-lbl {
          font-size: 0.9rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .carousel-container {
          position: relative;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 40px var(--glass-shadow);
          overflow: hidden;
        }
        .carousel-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          animation: fadeSlide 0.5s ease;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .carousel-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 3px solid var(--primary-light);
          object-fit: cover;
          margin-bottom: 20px;
        }
        .carousel-controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 25px;
        }
        .carousel-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--primary-purple);
          transition: var(--transition-fast);
        }
        .carousel-btn:hover {
          background: var(--primary-purple);
          color: white;
          transform: scale(1.05);
        }
        .value-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        .value-icon-box {
          background: rgba(124, 58, 237, 0.1);
          color: var(--primary-purple);
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .about-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      <div className="about-layout">
        <div>
          <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
            Who We Are
          </span>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.15 }}>
            Pioneering digital ecosystems that drive growth
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.05rem' }}>
            Bytehawk was founded with a single mission: to build software that isn't just functional, but visually spectacular and operationally game-changing. We bridge the gap between creative visual artistry and bleeding-edge cloud engineering.
          </p>

          <div style={{ marginTop: '20px' }}>
            <div className="value-item">
              <div className="value-icon-box">
                <Shield size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)' }}>Absolute Reliability</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We architect clean codebases built to stand test of scale, load, and security.</p>
              </div>
            </div>
            <div className="value-item">
              <div className="value-icon-box">
                <Zap size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)' }}>Performance Obsessed</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Zero-lag rendering, lazy loading assets, and edge hosting keep user retention high.</p>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-num">120+</div>
              <div className="stat-lbl">Projects Launched</div>
            </div>
            <div className="stat-card">
              <div className="stat-num">99.4%</div>
              <div className="stat-lbl">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Carousel & Leadership */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              Leadership Team
            </span>
          </div>
          
          <div className="carousel-container">
            <div key={carouselIndex} className="carousel-slide">
              <img 
                src={team[carouselIndex].image} 
                alt={team[carouselIndex].name} 
                className="carousel-avatar" 
              />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                {team[carouselIndex].name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--primary-purple)', fontWeight: 600, marginBottom: '15px' }}>
                {team[carouselIndex].role}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', minHeight: '80px' }}>
                "{team[carouselIndex].bio}"
              </p>
            </div>

            <div className="carousel-controls">
              <button className="carousel-btn" onClick={handlePrev}>
                <ChevronLeft size={20} />
              </button>
              <button className="carousel-btn" onClick={handleNext}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
