import { useRef, useEffect, useState } from 'react';

interface ScrollPickerProps {
  items: string[];
  value: string;
  onChange: (val: string) => void;
  label?: string;
  width?: number;
}

export default function ScrollPicker({ items, value, onChange, label, width = 90 }: ScrollPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      {label && (
        <span style={{
          fontSize: '0.65rem', fontWeight: 700, color: 'var(--purple-300)',
          textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-heading)',
        }}>{label}</span>
      )}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width, height: 36, borderRadius: 8, padding: '0 10px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative',
          fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
          color: '#FFFFFF', userSelect: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}
      >
        {value}
        <svg style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1L5 5L9 1" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', top: '100%', left: 0,
            marginTop: 4, width: width + 20, minWidth: 60, maxHeight: 160, overflowY: 'auto',
            borderRadius: 8, background: 'rgba(15,8,36,0.97)', border: '1px solid rgba(139,92,246,0.35)',
            backdropFilter: 'blur(16px)', zIndex: 50, padding: 4,
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          {items.map(item => (
            <div
              key={item}
              onClick={() => { onChange(item); setOpen(false); }}
              style={{
                padding: '7px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem',
                fontWeight: item === value ? 700 : 500, fontFamily: 'var(--font-heading)',
                color: item === value ? '#FFFFFF' : 'var(--text-muted)',
                background: item === value ? 'rgba(139,92,246,0.2)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { if (item !== value) e.currentTarget.style.background = 'rgba(139,92,246,0.08)'; }}
              onMouseLeave={(e) => { if (item !== value) e.currentTarget.style.background = 'transparent'; }}
            >{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}
