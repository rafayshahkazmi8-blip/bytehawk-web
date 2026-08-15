import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor Component - Ultra-Simple Neon Theme Dot Edition
 * Runs 100% directly via native hardware transform with zero canvas/particle overhead
 * for zero lag and fluid mouse movement.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    if (!dot) return;

    const handleMouseMove = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (dot.style.opacity === '0') {
        dot.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <style>{`
        @media (min-width: 769px) {
          body, a, button, select, input, textarea, .tab-btn, .interactive-card, [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Simple Theme Color Neon Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          backgroundColor: '#00f2fe',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          margin: '-5px 0 0 -5px',
          opacity: 0,
          boxShadow: '0 0 10px #00f2fe, 0 0 20px rgba(0, 242, 254, 0.8), 0 0 30px rgba(109, 40, 217, 0.6)',
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
