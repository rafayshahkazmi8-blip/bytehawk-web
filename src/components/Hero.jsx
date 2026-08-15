import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Play, Award, Zap, Heart } from 'lucide-react';
import GlassCard from './GlassCard';

const Hero = ({ setActiveTab }) => {
  const [hoveredBadge, setHoveredBadge] = useState(null);
  
  // Interactive Live2D visualizer simulator states
  const [paramAngleX, setParamAngleX] = useState(12.0);
  const [paramEyeOpen, setParamEyeOpen] = useState(1.0);
  const [paramMouthForm, setParamMouthForm] = useState(0.6);

  const { scrollY } = useScroll();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const yLeft = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : 80]);
  const opacityLeft = useTransform(scrollY, [0, 450], [1, isMobile ? 1 : 0]);
  const scaleRight = useTransform(scrollY, [0, 600], [1, isMobile ? 1 : 0.9]);
  const rotateRightX = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : -8]);
  const rotateRightY = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : 10]);
  const opacityRight = useTransform(scrollY, [0, 500], [1, isMobile ? 1 : 0.4]);

  return (
    <section style={{ padding: '80px 0 60px 0', position: 'relative', perspective: 1200 }} className="fade-in">
      <div className="container grid-2" style={{ alignItems: 'center', transformStyle: 'preserve-3d' }}>
        
        {/* Left Column - Hero Details */}
        <motion.div style={{ y: yLeft, opacity: opacityLeft }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              lineHeight: '1.15',
              marginBottom: '10px',
              fontFamily: 'var(--font-heading)'
            }}
          >
            ByteHawk
          </h1>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: '1.2',
              marginBottom: '16px',
              color: '#ffffff',
              fontWeight: '500'
            }}
            className="text-glow-purple"
          >
            Creating Digital Worlds for Creators
          </h2>
          
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '36px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            VTuber Models • Digital Art • Animation • Web Solutions
          </p>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                setActiveTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Start a Project
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setActiveTab('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              View Portfolio
            </button>
          </div>

          {/* Quick Metrics */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '44px',
              borderTop: '1px solid var(--border-glow)',
              paddingTop: '24px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '2rem', color: '#ffffff' }}>100%</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Rigging Precision</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: '#ffffff' }}>24/7</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Client Support</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2rem', color: '#ffffff' }}>15+</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Expressions Built-in</p>
            </div>
          </div>

          {/* Detailed Rigging Technical Specifications Grid */}
          <div
            style={{
              marginTop: '32px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px dashed var(--border-light)',
              borderRadius: '12px',
              padding: '20px'
            }}
          >
            <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={14} style={{ color: 'var(--accent)' }} /> AAA Studio Creative Standards
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>• Model Canvas Size:</strong> Native 8000x8000px
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>• Texture Mapping:</strong> 4K Texture Atlases
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>• Physics Clusters:</strong> 42 Rigging groups
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>• Export Support:</strong> VTube Studio & VSeeFace
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>• Source Files:</strong> Complete layered PSD
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>• Licensing:</strong> Commercial Rights Included
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Column - Premium Stream Mockup Interface & Simulator */}
        <motion.div 
          style={{ 
            position: 'relative', 
            scale: scaleRight, 
            rotateX: rotateRightX, 
            rotateY: rotateRightY, 
            opacity: opacityRight,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Animated floating decoration elements */}
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              left: '-20px',
              backgroundColor: 'var(--secondary)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px var(--secondary-glow)',
              transform: 'rotate(-5deg)',
              zIndex: 5
            }}
          >
            <Zap size={12} /> LIVE NOW
          </div>

          <div
            style={{
              position: 'absolute',
              top: '180px',
              right: '-15px',
              backgroundColor: '#06b6d4',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)',
              transform: 'rotate(3deg)',
              zIndex: 5
            }}
          >
            <Heart size={14} fill="#ffffff" /> 4.9k Views
          </div>

          {/* Core Interactive Mock Stream Card */}
          <GlassCard padding={false} style={{ overflow: 'hidden' }} className="neon-border-glow">
            <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#05070a' }}>
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80"
                alt="Stream Mockup Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.5,
                  filter: 'hue-rotate(240deg) brightness(0.85)'
                }}
              />
              
              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(12, 15, 23, 1) 0%, rgba(12, 15, 23, 0) 50%, rgba(12, 15, 23, 0.6) 100%)'
                }}
              />

              {/* VTuber Stream Border Frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: '16px',
                  border: '1.5px solid rgba(13, 110, 253, 0.5)',
                  borderRadius: '12px',
                  pointerEvents: 'none'
                }}
              />

              {/* Streaming Overlay Info */}
              <div
                style={{
                  position: 'absolute',
                  top: '32px',
                  left: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    animation: 'pulse 1.5s infinite'
                  }}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' }}>
                  01:45:22
                </span>
              </div>

              {/* Interactive Audio Wave visualizer simulation */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '3px',
                  height: '24px'
                }}
              >
                {[12, 18, 8, 22, 14, 20, 10, 16, 24, 12, 18, 6].map((val, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '3px',
                      backgroundColor: idx % 3 === 0 ? 'var(--secondary)' : idx % 3 === 1 ? 'var(--primary)' : 'var(--accent)',
                      borderRadius: '3px',
                      animation: `visualizer ${1 + (idx % 4) * 0.25}s ease-in-out infinite alternate`,
                      height: '4px'
                    }}
                  />
                ))}
              </div>

              {/* Floating Hawk Overlay Brand Accent */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    opacity: 0.08,
                    letterSpacing: '4px',
                    color: '#ffffff'
                  }}
                >
                  HAWK
                </span>
              </div>
            </div>

            {/* Bottom Stream Status */}
            <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-deep)' }}>
              <h4 style={{ marginBottom: '4px', fontSize: '1.15rem' }}>ByteHawk Broadcast System v2.1</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Testing premium Live2D models, high-quality audio lip-syncing, and stinger transitions.
              </p>
            </div>

            {/* Live2D Parameter Visualizer Simulation */}
            <div style={{ padding: '24px', backgroundColor: 'rgba(7, 9, 14, 0.7)', borderTop: '1px solid var(--border-glow)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h5 style={{ fontSize: '0.85rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} style={{ color: 'var(--accent)' }} /> Live2D Rigging Simulator
                </h5>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                  ● LIVE DEFORMATION PREVIEW
                </span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'ParamAngleX (Head Turn)', min: -30, max: 30, value: paramAngleX, setter: setParamAngleX, unit: '°' },
                  { label: 'ParamEyeOpenL (Eye Open)', min: 0, max: 1.2, value: paramEyeOpen, setter: setParamEyeOpen, unit: '' },
                  { label: 'ParamMouthForm (Mouth Smile)', min: -1, max: 1, value: paramMouthForm, setter: setParamMouthForm, unit: '' }
                ].map((p, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      <span style={{ fontFamily: 'monospace' }}>{p.label}</span>
                      <span style={{ color: 'var(--accent)', fontFamily: 'monospace', fontWeight: 'bold' }}>
                        {p.value.toFixed(1)}{p.unit}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="range"
                        min={p.min}
                        max={p.max}
                        step={0.1}
                        value={p.value}
                        onChange={(e) => p.setter(parseFloat(e.target.value))}
                        style={{
                          flexGrow: 1,
                          accentColor: idx === 0 ? 'var(--primary)' : idx === 1 ? 'var(--secondary)' : 'var(--accent)',
                          height: '4px',
                          background: 'rgba(255,255,255,0.1)',
                          border: 'none',
                          borderRadius: '2px',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Live2D Model Face Simulator Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border-glow)', borderRadius: '8px' }}>
                <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border-light)' }}>
                  {/* Outer circle with rotating glow based on ParamAngleX */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '2.5px solid transparent',
                    borderTopColor: 'var(--accent)',
                    borderBottomColor: 'var(--secondary)',
                    transform: `rotate(${paramAngleX * 3}deg)`,
                    transition: 'transform 0.05s linear'
                  }} />
                  {/* Mock eyes and mouth that animate based on parameters */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transform: `translate(${paramAngleX * 0.3}px, ${Math.abs(paramAngleX) * 0.08}px)`,
                    transition: 'transform 0.05s linear'
                  }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* Left Eye */}
                      <div style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        transform: `scaleY(${paramEyeOpen})`,
                        transition: 'transform 0.05s linear'
                      }} />
                      {/* Right Eye */}
                      <div style={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        transform: `scaleY(${paramEyeOpen})`,
                        transition: 'transform 0.05s linear'
                      }} />
                    </div>
                    {/* Mouth */}
                    <div style={{
                      width: '14px',
                      height: paramMouthForm >= 0 ? `${3 + paramMouthForm * 3}px` : '2px',
                      borderBottom: '2px solid #ffffff',
                      borderRadius: paramMouthForm >= 0 ? '0 0 8px 8px' : '8px 8px 0 0',
                      alignSelf: 'center',
                      transition: 'height 0.05s linear, border-radius 0.05s linear'
                    }} />
                  </div>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#ffffff' }}>Fluid Kinematic Solver</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Mesh deformation groups updating in real-time</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </div>

      {/* CSS Keyframe animations for visualizer and live pulses */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes visualizer {
          0% { height: 4px; }
          100% { height: 24px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
