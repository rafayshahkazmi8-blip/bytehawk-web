// Stats bar — only rendered on the home page, right after the Hero section
const stats = [
  { num: '120+', label: 'Projects Launched' },
  { num: '99.4%', label: 'Client Satisfaction' },
  { num: '4', label: 'Core Services' },
  { num: '60fps', label: 'Guaranteed Performance' },
];

export default function StatsBar() {
  return (
    <div
      style={{
        padding: '0 8%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(139,92,246,0.2)',
          background: 'rgba(124,58,237,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '36px 24px',
              textAlign: 'center',
              borderRight:
                i < stats.length - 1
                  ? '1px solid rgba(139,92,246,0.15)'
                  : 'none',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.6rem',
                fontWeight: 900,
                background:
                  'linear-gradient(135deg, var(--purple-300), var(--accent-pink))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
                marginBottom: '6px',
              }}
            >
              {s.num}
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
