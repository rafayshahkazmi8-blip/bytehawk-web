import { useState } from 'react';
import { Layers, ArrowUpRight, ChevronRight } from 'lucide-react';

interface CaseStudy {
  title: string;
  client: string;
  category: 'web' | 'design' | 'marketing';
  metrics: { before: string; after: string; label: string };
  problem: string;
  solution: string;
  stack: string[];
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'design' | 'marketing'>('all');
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  const projects: CaseStudy[] = [
    {
      title: "Nova Thread Headless Storefront",
      client: "Nova Thread Apparel",
      category: "web",
      metrics: { before: "4.8s Load", after: "0.9s Load", label: "Page Performance Optimization" },
      problem: "A high-traffic fashion brand was losing 35% of mobile visitors during checkout due to slow load speeds and redundant database queries on legacy architecture.",
      solution: "We re-architected their commerce storefront as a headless React app running on global edge nodes, routing database queries via pre-compiled serverless APIs.",
      stack: ["React", "TypeScript", "Node.js", "GraphQL", "Vercel Edge"],
    },
    {
      title: "Corporate Visual System overhaul",
      client: "Aero Drone Systems",
      category: "design",
      metrics: { before: "12% Conv.", after: "28% Conv.", label: "Visitor Conversion Increase" },
      problem: "Aero Drone developed advanced machinery, but their dated visual style made it difficult to appeal to Fortune 500 procurement teams.",
      solution: "We structured a complete visual brand book: a minimalist geometric logo, cohesive product presentation guides, and responsive UX layouts.",
      stack: ["Figma", "Adobe Illustrator", "3D Blender Renderings"],
    },
    {
      title: "Inbound Funnel Optimization",
      client: "Apex Enterprise Logistics",
      category: "marketing",
      metrics: { before: "68 Leads/mo", after: "240 Leads/mo", label: "Monthly Qualified Inbound Leads" },
      problem: "Apex spent $12,000 monthly on broad PPC keywords with less than 1% lead capture due to unstructured landing pages and lack of CRM triggers.",
      solution: "We restructured their landing pages, integrated a custom cost estimator tool, and programmed automated lead scoring in their CRM.",
      stack: ["HubSpot CRM", "Google Ads", "Tailwind CSS", "Semantic Web"],
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section dark-theme" style={{ minHeight: '100vh', justifyContent: 'center', zIndex: 10 }}>
      <style>{`
        .portfolio-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 45px;
          gap: 20px;
          flex-wrap: wrap;
        }
        .filter-group {
          display: flex;
          gap: 10px;
        }
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
        }
        .portfolio-card {
          cursor: pointer;
          position: relative;
        }
        .metric-comparison {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
          padding: 15px 20px;
          background: rgba(124, 58, 237, 0.05);
          border-radius: 12px;
          border: 1px solid var(--glass-border);
        }
        .metric-val {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.15rem;
        }
        .metric-before {
          color: var(--text-muted);
          text-decoration: line-through;
        }
        .metric-after {
          color: #10B981; /* bright green for positive result */
        }
        .process-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: rgba(217, 70, 239, 0.1);
          color: #D946EF;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-top: 15px;
          border: 1px solid rgba(217, 70, 239, 0.2);
        }
        .project-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(11, 7, 30, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .project-modal {
          background: #FFFFFF;
          color: #1E1B4B;
          width: 100%;
          max-width: 600px;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          position: relative;
        }
        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #F3E8FF;
          border: none;
          color: var(--primary-dark);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
        }
        .close-btn:hover {
          background: var(--primary-light);
          color: white;
        }
        @media (max-width: 768px) {
          .portfolio-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="portfolio-header">
        <div>
          <span className="text-gradient" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
            Case Studies
          </span>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white' }}>
            Our Proven Results
          </h2>
        </div>

        <div className="filter-group">
          {(['all', 'web', 'design', 'marketing'] as const).map(f => (
            <button 
              key={f} 
              className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              style={{ textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="portfolio-grid">
        {filteredProjects.map((p, idx) => (
          <div 
            key={idx} 
            className="glass-card portfolio-card"
            onClick={() => setSelectedProject(p)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-light)', fontWeight: 700 }}>
                {p.category}
              </span>
              <ArrowUpRight size={18} style={{ color: 'var(--text-muted)' }} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '10px 0 12px 0', color: 'white' }}>
              {p.title}
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineBreak: 'strict', minHeight: '60px' }}>
              {p.problem.slice(0, 100)}...
            </p>

            <div className="metric-comparison">
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Before</div>
                <div className="metric-val metric-before">{p.metrics.before}</div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>After</div>
                <div className="metric-val metric-after">{p.metrics.after}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="process-badge">
                <Layers size={12} /> View Process
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '15px' }}>
                {p.client}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedProject(null)}>×</button>
            
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-purple)', fontWeight: 700 }}>
              {selectedProject.category} Case Study
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 20px 0' }}>
              {selectedProject.title}
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--primary-dark)' }}>The Problem</h4>
              <p style={{ fontSize: '0.95rem', color: '#4B5563' }}>{selectedProject.problem}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--primary-dark)' }}>Our Solution</h4>
              <p style={{ fontSize: '0.95rem', color: '#4B5563' }}>{selectedProject.solution}</p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--primary-dark)' }}>Tech Stack</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedProject.stack.map(s => (
                  <span key={s} style={{ background: '#F3E8FF', color: 'var(--primary-dark)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ padding: '20px', background: '#F5F3FF', border: '1px solid rgba(124, 58, 237, 0.15)', borderRadius: '16px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-purple)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '5px' }}>
                {selectedProject.metrics.label}
              </h4>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                {selectedProject.metrics.before} → <span style={{ color: '#10B981' }}>{selectedProject.metrics.after}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
