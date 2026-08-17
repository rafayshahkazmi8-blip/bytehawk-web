import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from "framer-motion";
import styled from "styled-components";

const team = [
  {
    initials: 'ES',
    name: 'Ethan Sterling',
    role: 'Founder & Chief Architect',
    bio: '12 years building cloud infrastructures and designing interactive customer journeys for Fortune 500 companies.',
    skills: ['Cloud Architecture', 'React/TypeScript', 'Three.js', 'System Design'],
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)',
    accent: '#A78BFA',
  },
  {
    initials: 'SL',
    name: 'Dr. Sarah Lin',
    role: 'Director of AI Research',
    bio: 'MIT PhD specializing in distributed systems, real-time optimization, and automated machine learning pipelines.',
    skills: ['ML Pipelines', 'Python', 'Data Engineering', 'Real-time Systems'],
    gradient: 'linear-gradient(135deg, #6D28D9 0%, #D946EF 100%)',
    accent: '#E879F9',
  },
  {
    initials: 'MV',
    name: 'Marcus Vance',
    role: 'Creative Art Lead',
    bio: 'Multi-award-winning UI designer obsessed with glassmorphism, 3D scenes, and pixel-perfect interfaces that wow.',
    skills: ['Figma/Framer', 'Motion Design', 'GLSL Shaders', 'Brand Identity'],
    gradient: 'linear-gradient(135deg, #3B0764 0%, #9333EA 100%)',
    accent: '#C084FC',
  },
  {
    initials: 'SM',
    name: 'Sophia Martinez',
    role: 'Growth Operations Head',
    bio: 'Full-funnel marketing specialist who consistently multiplies client ROI by 3–5× through data-led campaign architecture.',
    skills: ['Google Ads', 'HubSpot CRM', 'Conversion Rate', 'SEO Strategy'],
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
    accent: '#F9A8D4',
  },
];

export function ThreeDTeamRing() {
  const ringRef = useRef<HTMLDivElement>(null);
  const rotationY = useMotionValue(0);
  const currentRotationY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const dragVelocity = useRef<number>(0);
  const autoRafId = useRef<number>(0);
  const AUTO_SPEED = 0.25; // degrees per frame

  const angle = useMemo(() => 360 / team.length, []);
  const [showCards, setShowCards] = useState(false);

  // ── Auto-rotation loop ────────────────────────────────
  useEffect(() => {
    const loop = () => {
      if (!isDragging.current) {
        const next = rotationY.get() + AUTO_SPEED;
        rotationY.set(next);
        currentRotationY.current = next;
      }
      autoRafId.current = requestAnimationFrame(loop);
    };
    autoRafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(autoRafId.current);
  }, [rotationY]);

  // ── Sync currentRotationY on change ──────────────────
  useEffect(() => {
    const unsub = rotationY.on("change", (v) => {
      currentRotationY.current = v;
    });
    return () => unsub();
  }, [rotationY]);

  useEffect(() => {
    setTimeout(() => setShowCards(true), 100);
  }, []);

  // ── Drag handlers ─────────────────────────────────────
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    dragVelocity.current = 0;
    rotationY.stop();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    startX.current = x;
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  };

  const onDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const x = "touches" in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const delta = x - startX.current;
    dragVelocity.current = delta * 0.45;
    const next = currentRotationY.current + dragVelocity.current;
    rotationY.set(next);
    startX.current = x;
  };

  const onDragEnd = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);

    const initial = rotationY.get();
    const boost = dragVelocity.current * 18;
    const target = initial + boost;

    animate(initial, target, {
      type: "inertia",
      velocity: boost,
      power: 0.8,
      timeConstant: 350,
      restDelta: 0.5,
      onUpdate: (v) => rotationY.set(v),
    });

    dragVelocity.current = 0;
  };

  return (
    <Wrapper>
      <Stage onMouseDown={onDragStart} onTouchStart={onDragStart}>
        <motion.div
          ref={ringRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            rotateY: rotationY,
            cursor: "grab",
          }}
        >
          <AnimatePresence>
            {showCards &&
              team.map((member, index) => {
                const cardAngle = index * -angle;
                return (
                  <motion.div
                    key={index}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      transformStyle: "preserve-3d",
                      // Rotate card outward + push back — this is where card sits in the ring
                      rotateY: cardAngle,
                      z: -600,
                      transformOrigin: `50% 50% 600px`,
                    }}
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.18,
                      duration: 1.0,
                      ease: easeOut,
                    }}
                  >
                    {/* Inner face — counter-rotate so text always faces outward */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "22px",
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(22px)",
                        WebkitBackdropFilter: "blur(22px)",
                        border: "1px solid rgba(139,92,246,0.2)",
                        boxShadow: "0 14px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
                        display: "flex",
                        flexDirection: "column",
                        // Hide back faces properly
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      {/* Gradient top strip */}
                      <div style={{ height: 5, background: member.gradient, flexShrink: 0 }} />

                      {/* Card content */}
                      <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: 1, overflow: "hidden" }}>

                        {/* Avatar */}
                        <div style={{
                          width: 58,
                          height: 58,
                          borderRadius: "50%",
                          background: member.gradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 900,
                          fontSize: "1.1rem",
                          color: "white",
                          marginBottom: 14,
                          flexShrink: 0,
                          boxShadow: `0 0 14px ${member.accent}35`,
                          border: `1.5px solid ${member.accent}40`,
                        }}>
                          {member.initials}
                        </div>

                        {/* Name */}
                        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "var(--text-white)", marginBottom: 3, lineHeight: 1.25 }}>
                          {member.name}
                        </h3>

                        {/* Role */}
                        <p style={{ fontSize: "0.7rem", fontWeight: 700, color: member.accent, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
                          {member.role}
                        </p>

                        {/* Bio */}
                        <p style={{
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                          lineHeight: 1.55,
                          marginBottom: 16,
                          flex: 1,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        } as React.CSSProperties}>
                          {member.bio}
                        </p>

                        {/* Skills */}
                        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", marginTop: "auto" }}>
                          {member.skills.map((skill) => (
                            <span key={skill} style={{
                              padding: "3px 8px",
                              borderRadius: 7,
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              background: `${member.accent}12`,
                              border: `1px solid ${member.accent}30`,
                              color: member.accent,
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>
      </Stage>
      <Hint>← Drag to rotate · Auto-spinning →</Hint>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 820px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  perspective: 2200px;
  position: relative;
  overflow: hidden;
`;

const Stage = styled.div`
  width: min(400px, 90vw);
  height: 540px;
  position: relative;
  transform-style: preserve-3d;
  cursor: grab;
  &:active { cursor: grabbing; }
`;

const Hint = styled.p`
  margin-top: 44px;
  font-size: 0.73rem;
  color: var(--text-subtle);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  pointer-events: none;
`;

export default ThreeDTeamRing;
