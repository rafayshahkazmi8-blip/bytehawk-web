import React, { useState } from 'react';
import { ArrowRight, Edit, Layout, Layers, ShieldCheck, Film, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import GlassCard from './GlassCard';

const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '1. Illustration & Character Draft',
      icon: <Edit size={24} style={{ color: 'var(--accent)' }} />,
      shortDesc: 'Designing the high-fidelity concept drawing and color palette.',
      detailedDesc: 'Our elite VTuber artists collaborate with you to create your character concept from scratch, or adapt your existing reference sheets. We provide 3 detailed thumbnail sketches and refine your chosen design through unlimited iterations at the draft stage.',
      deliverables: ['High-res character sheet', '3-view orthographic reference', 'Color design blueprint'],
      duration: '7 - 10 Days'
    },
    {
      title: '2. Live2D Art Layer Cutting',
      icon: <Layers size={24} style={{ color: 'var(--secondary)' }} />,
      shortDesc: 'Deconstructing the art into thousands of animatable layers.',
      detailedDesc: 'To rig fluid physics, every tiny part of the drawing (each eyelid layer, hair strand, clothes fold, and mouth flap) must be drawn on a separate layer. We slice your character into 400 to 1,200+ individual high-resolution layers inside raw Photoshop canvases.',
      deliverables: ['Layered Photoshop PSD file', 'Canvas size: 8000x8000px', 'Organized layer groups'],
      duration: '5 - 7 Days'
    },
    {
      title: '3. Kinematic Mesh Deformation',
      icon: <Layout size={24} style={{ color: 'var(--primary)' }} />,
      shortDesc: 'Setting up precise deformation grids for head and body movement.',
      detailedDesc: 'We import the sliced PSD into Live2D Cubism and build premium deformation meshes. We map head and body rotations (XYZ axes) to mathematical grids, establishing the base structure for standard tilts, leans, and perspective shifts.',
      deliverables: ['Mathematical grid mapping', 'X/Y/Z structural mesh', 'Standard orientation nodes'],
      duration: '6 - 8 Days'
    },
    {
      title: '4. Dynamic Physics Rigging',
      icon: <Sparkles size={24} style={{ color: 'var(--accent)' }} />,
      shortDesc: 'Adding liquid-smooth physics to hair, eyes, clothes, and bounds.',
      detailedDesc: 'We build advanced dual-axis physics clusters. We program responsive hair bounce, clothes rustles, accessories sway, breast bounce, and eye shine movements. Our rigs leverage high-precision mathematical nodes to achieve realistic gravity effects.',
      deliverables: ['42+ Custom physics groups', 'Multi-axis hair tracking', 'Breast & clothing bounce'],
      duration: '8 - 12 Days'
    },
    {
      title: '5. Face-Tracking & Mouth Lip-Sync',
      icon: <Film size={24} style={{ color: 'var(--secondary)' }} />,
      shortDesc: 'Mapping real-time expressions and mouth sync states.',
      detailedDesc: 'We program advanced face-tracking compatibility. We map mouth sync (vowels A-I-U-E-O), eye blinks, eyebrow levels, and gaze tracking. We configure up to 15 default expression hotkeys (blush, angry, crying, stars, pouts).',
      deliverables: ['VTube Studio settings file', '12+ Expressions mapped', 'Lip-sync and vowel mapping'],
      duration: '4 - 6 Days'
    },
    {
      title: '6. Quality Assurance & Live Testing',
      icon: <ShieldCheck size={24} style={{ color: 'var(--accent)' }} />,
      shortDesc: 'End-to-end testing in VTube Studio, VSeeFace, and OBS.',
      detailedDesc: 'We host a private review stream to demonstrate all rigging nodes, hotkeys, and tracking speeds in real-time. We run full diagnostics using standard webcams and iPhone tracking to guarantee smooth rendering without tearing.',
      deliverables: ['Testing reports', 'VTube Studio ready model folders', '30-day technical support warranty'],
      duration: '3 - 5 Days'
    }
  ];

  return (
    <section style={{ padding: '110px 0 100px 0' }} className="fade-in">
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Production Pipeline
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '8px', marginBottom: '16px' }}>
            Our AAA Studio <span className="gradient-text-primary">Workflow</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Developing a world-class virtual model requires extreme precision. Here is how our team of expert illustrators and riggers craft your digital persona.
          </p>
        </div>

        {/* Workflow Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 6fr', gap: '48px', alignItems: 'start' }} className="workflow-grid">
          
          {/* Left Column: Timeline Steps */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '12px' }}>
            {/* Glowing Laser Vertical Line */}
            <div style={{
              position: 'absolute',
              top: '24px',
              bottom: '24px',
              left: '34px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))',
              boxShadow: '0 0 15px var(--primary-glow)',
              zIndex: 0
            }} />
            
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`glass-card ${isActive ? 'neon-border-glow' : ''}`}
                  style={{
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderLeft: isActive ? '4px solid var(--accent)' : '1px solid var(--border-glow)',
                    background: isActive ? 'rgba(9, 15, 36, 0.85)' : 'var(--bg-card)',
                    transform: isActive ? 'translateX(8px)' : 'none',
                    transition: 'var(--transition-smooth)',
                    zIndex: 1,
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: isActive ? 'var(--bg-deep)' : 'rgba(255,255,255,0.02)',
                    border: isActive ? '2px solid var(--primary)' : '1px solid transparent',
                    boxShadow: isActive ? '0 0 15px var(--primary-glow)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'var(--transition-fast)'
                  }}>
                    {step.icon}
                  </div>
                  
                  <div style={{ textAlign: 'left', flexGrow: 1 }}>
                    <h4 style={{ fontSize: '1rem', color: isActive ? '#ffffff' : 'var(--text-primary)', transition: 'var(--transition-fast)' }}>
                      {step.title}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Duration: {step.duration}
                    </span>
                  </div>

                  <ArrowRight size={16} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)', opacity: isActive ? 1 : 0.4, transition: 'var(--transition-fast)' }} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Interactive Info Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <GlassCard style={{ padding: '40px', background: 'rgba(9, 15, 36, 0.85)' }} className="neon-border-glow">
              
              {/* Card Title Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-glow)', paddingBottom: '20px', marginBottom: '24px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase' }}>
                    Pipeline Focus Section
                  </span>
                  <h3 style={{ fontSize: '1.75rem', marginTop: '4px' }}>
                    {steps[activeStep].title.split('. ')[1]}
                  </h3>
                </div>
                <div style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(13, 110, 253, 0.1)',
                  border: '1px solid rgba(13, 110, 253, 0.25)',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: 'var(--accent)'
                }}>
                  {steps[activeStep].duration}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px', textAlign: 'left' }}>
                {steps[activeStep].detailedDesc}
              </p>

              {/* Focus List */}
              <div style={{ marginBottom: '28px' }}>
                <h5 style={{ color: '#ffffff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', textAlign: 'left' }}>
                  What You Receive / Key Highlights:
                </h5>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {steps[activeStep].deliverables.map((del, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process Pledge Quote Banner */}
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-light)', borderRadius: '12px', textAlign: 'left' }}>
                <h5 style={{ color: '#ffffff', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Studio Commitment
                </h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  You review and approve each stage before we move to the next. This ensures zero surprises and guarantees you love the final model!
                </p>
              </div>

            </GlassCard>
          </div>

        </div>

        {/* Studio Technical Requirements Section */}
        <div style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.75rem' }}>Technical Canvas Rigging Guidelines</h3>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="grid-3">
            <GlassCard>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--accent)' }}>Art Slicing Standards</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                PSD structures must separate eyes (eyeballs, eyelids, creases, scleras), mouth parts (lips, teeth, tongue, interior), hair segments (bangs, sides, back, tufts), and apparel nodes explicitly to avoid overlapping rigging artifacts.
              </p>
            </GlassCard>

            <GlassCard>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--secondary)' }}>Kinematics Parameters</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Our standard rigging presets support ParamAngleX/Y/Z (-30 to +30), ParamEyeOpenL/R (0.0 to 1.2), ParamBrowHeight (-1.0 to 1.0), and ParamMouthForm (-1.0 to 1.0) facilitating highly expressive, realistic virtual facial emotions.
              </p>
            </GlassCard>

            <GlassCard>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px', color: 'var(--accent)' }}>System Requirements</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Export formats yield standard `.moc3`, `.model3.json`, and `.physics3.json` files fully compatible with all industry platforms, optimized for low GPU usage in streaming software.
              </p>
            </GlassCard>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .workflow-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .workflow-grid > div:last-child {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Workflow;
