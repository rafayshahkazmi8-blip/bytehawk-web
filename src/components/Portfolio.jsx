import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Eye, Film, Filter, Play, ImageIcon, Layers, Sliders, X, ZoomIn, ExternalLink
} from 'lucide-react';
import GlassCard from './GlassCard';
import { getApiUrl, getMediaUrl } from '../apiConfig';

// ─────────────────────────────────────────────────────────────────────────────
//  LIGHTBOX — full-screen image popup on card click
// ─────────────────────────────────────────────────────────────────────────────
const Lightbox = ({ item, onClose }) => {
  const directUrl = getMediaUrl(item.url);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden'; // prevent background scroll
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(4, 5, 15, 0.92)',
        backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'lbFadeIn 0.25s ease',
      }}
    >
      {/* Image container — stop propagation so clicking image doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          maxWidth: '90vw', maxHeight: '90vh',
          animation: 'lbZoomIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Close button — anchored to top-right of image box */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: -16, right: -16, zIndex: 10000,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(30,20,60,0.9)', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', backdropFilter: 'blur(8px)',
            transition: 'background 0.2s ease',
            boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,30,30,0.85)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(30,20,60,0.9)'}
        >
          <X size={16} />
        </button>
        <img
          src={directUrl}
          alt={item.name}
          style={{
            maxWidth: '100%', maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 0 60px rgba(109,40,217,0.35), 0 24px 80px rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        {/* Caption */}
        <div style={{
          marginTop: '16px', textAlign: 'center',
          background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)',
          borderRadius: '10px', padding: '10px 24px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>
            {item.categoryLabel}
          </span>
          <span style={{ fontSize: '0.95rem', color: '#fff', fontWeight: 600 }}>
            {formatItemName(item.name, item.category)}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  HELPER — friendly display name
// ─────────────────────────────────────────────────────────────────────────────
function formatItemName(name, category) {
  if (category === 'websites') return name;
  if (name.startsWith('WhatsApp Image') || name.startsWith('WhatsApp Video')) {
    const isVideo = name.includes('Video');
    const parts = name.split(' at ');
    let timeStr = '';
    if (parts.length > 1) {
      timeStr = parts[1].replace(/\.(jpeg|jpg|png|mp4)$/i, '').trim();
    }
    return `Vutuber Design ${isVideo ? 'Video' : 'Graphic'} — ${timeStr || name}`;
  }
  const noExt = name.replace(/\.[^/.]+$/, '');
  if (/^\d{4}-\d{4}$/.test(noExt)) return `3D Animation — ${noExt}`;
  if (/^\d+$/.test(noExt))         return `3D Model Render #${noExt}`;
  return noExt.replace(/[-_]/g, ' ');
}

// ─────────────────────────────────────────────────────────────────────────────
//  DEDUPLICATOR — strips duplicate URLs within a single category array
// ─────────────────────────────────────────────────────────────────────────────
function dedupeCategory(items) {
  const seen = new Set();
  return items.filter(item => {
    if (!item || !item.url) return false;
    const key = decodeURIComponent(item.url).toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
//  CATEGORIES
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: '3d-models',     label: '3D Models',          icon: <Layers   size={11} />, dataKey: '3d-models',     categoryLabel: '3D Model' },
  { id: '3d-animations', label: '3D Animations',       icon: <Film     size={11} />, dataKey: '3d-animations', categoryLabel: '3D Animation' },
  { id: '2d-models',     label: '2D Models',           icon: <ImageIcon size={11} />, dataKey: '2d-models',   categoryLabel: '2D Model' },
  { id: '2d-animations', label: '2D Animations',       icon: <Film     size={11} />, dataKey: '2d-animations', categoryLabel: '2D Animation' },
  { id: '2d-rigging',    label: '2D Rigging',          icon: <Sliders  size={11} />, dataKey: '2d-rigging',   categoryLabel: '2D Rigging' },
  { id: 'branding',      label: 'Branding & Graphics', icon: <Eye      size={11} />, dataKey: 'branding',      categoryLabel: 'Branding & Graphics' },
  { id: 'websites',      label: 'Websites',            icon: <ExternalLink size={11} />, dataKey: 'websites',      categoryLabel: 'Website' },
];

// ─────────────────────────────────────────────────────────────────────────────
//  VIDEO CARD
// ─────────────────────────────────────────────────────────────────────────────
const VideoCard = React.memo(({ item }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const directUrl = getMediaUrl(item.url);

  const handleMouseEnter = useCallback(() => {
    setIsPlaying(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          })
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, []);

  return (
    <GlassCard padding={false} className="portfolio-card neon-border-glow" style={{ overflow: 'hidden' }}>
      <div
        style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', background: '#07090e' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          ref={videoRef}
          src={directUrl}
          muted loop playsInline preload="auto"
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top center',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            transform: isPlaying ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', top: 10, right: 10, zIndex: 5,
          background: isPlaying ? 'rgba(16,185,129,0.9)' : 'rgba(109,40,217,0.85)',
          backdropFilter: 'blur(6px)', padding: '4px 10px', borderRadius: '6px',
          fontSize: '0.65rem', fontWeight: 700, color: '#fff',
          display: 'flex', alignItems: 'center', gap: 4,
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s ease',
        }}>
          <Film size={10} /> {isPlaying ? 'PLAYING' : 'VIDEO'}
        </div>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', opacity: isPlaying ? 0 : 1, transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'rgba(109,40,217,0.65)', border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(6px)', boxShadow: '0 0 20px rgba(109,40,217,0.5)',
          }}>
            <Play size={22} fill="white" style={{ color: '#fff', marginLeft: 3 }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 18px', background: 'var(--bg-deep)' }}>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {item.categoryLabel}
        </span>
        <h4 style={{ fontSize: '0.93rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 3 }}>
          {formatItemName(item.name, item.category)}
        </h4>
      </div>
    </GlassCard>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  IMAGE CARD — click opens Lightbox
// ─────────────────────────────────────────────────────────────────────────────
const ImageCard = React.memo(({ item, onOpenLightbox }) => {
  const directUrl = getMediaUrl(item.url);
  return (
    <>
      <GlassCard
        padding={false}
        className="portfolio-card neon-border-glow"
        style={{ overflow: 'hidden', cursor: 'zoom-in' }}
        onClick={() => onOpenLightbox(item)}
      >
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', overflow: 'hidden', background: '#07090e' }}>
          <img
            src={directUrl}
            alt={item.name}
            loading="lazy"
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}
            className="portfolio-img"
          />
          <div className="portfolio-hover-overlay">
            <div className="hover-icon" style={{
              width: 52, height: 52, borderRadius: '50%',
              backgroundColor: 'rgba(109,40,217,0.65)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', border: '2px solid rgba(255,255,255,0.3)',
              transform: 'scale(0.8)', transition: 'var(--transition-smooth)',
              boxShadow: '0 0 20px rgba(109,40,217,0.5)',
            }}>
              <ZoomIn size={22} />
            </div>
          </div>
        </div>
        <div style={{ padding: '14px 18px', background: 'var(--bg-deep)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {item.categoryLabel}
          </span>
          <h4 style={{ fontSize: '0.93rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 3 }}>
            {formatItemName(item.name, item.category)}
          </h4>
        </div>
      </GlassCard>
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  WEBSITE CARD — opens link in secure new tab
// ─────────────────────────────────────────────────────────────────────────────
const WebsiteCard = React.memo(({ item }) => {
  const directUrl = getMediaUrl(item.url);
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-card neon-border-glow"
      style={{ display: 'block', textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}
    >
      <GlassCard padding={false} style={{ overflow: 'hidden', height: '100%' }}>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '62.5%', overflow: 'hidden', background: '#07090e' }}>
          <img
            src={directUrl}
            alt={item.name}
            loading="lazy"
            style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'top center',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}
            className="portfolio-img"
          />
          <div className="portfolio-hover-overlay">
            <div className="hover-icon" style={{
              width: 52, height: 52, borderRadius: '50%',
              backgroundColor: 'rgba(109,40,217,0.65)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', border: '2px solid rgba(255,255,255,0.3)',
              transform: 'scale(0.8)', transition: 'var(--transition-smooth)',
              boxShadow: '0 0 20px rgba(109,40,217,0.5)',
            }}>
              <ExternalLink size={22} />
            </div>
            <span style={{ position: 'absolute', bottom: '15px', color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>View Website</span>
          </div>
        </div>
        <div style={{ padding: '14px 18px', background: 'var(--bg-deep)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {item.categoryLabel}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: 3 }}>
            <h4 style={{ fontSize: '0.93rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0, flexGrow: 1 }}>
              {item.name}
            </h4>
            <ExternalLink size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          </div>
        </div>
      </GlassCard>
    </a>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN PORTFOLIO
// ─────────────────────────────────────────────────────────────────────────────
const Portfolio = () => {
  const [allItems, setAllItems]         = useState([]);   // single flat deduplicated list
  const [loading, setLoading]           = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [error, setError]               = useState(null);
  const [lightboxItem, setLightboxItem] = useState(null); // currently open lightbox image

  const openLightbox  = useCallback((item) => setLightboxItem(item), []);
  const closeLightbox = useCallback(() => setLightboxItem(null), []);

  useEffect(() => {
    const saved = sessionStorage.getItem('portfolioFilter');
    if (saved) setActiveFilter(saved);

    const handleFilterChange = (e) => {
      const filterId = e?.detail || sessionStorage.getItem('portfolioFilter') || 'all';
      setActiveFilter(filterId);
    };

    window.addEventListener('portfolioFilterChange', handleFilterChange);
    window.addEventListener('storage', handleFilterChange);

    return () => {
      window.removeEventListener('portfolioFilterChange', handleFilterChange);
      window.removeEventListener('storage', handleFilterChange);
    };
  }, []);

  useEffect(() => {
    // 'ignore' is closure-scoped — each effect invocation gets its own fresh copy.
    // React StrictMode: first invocation's cleanup sets ignore=true and aborts fetch.
    // Second (real) invocation starts fresh with ignore=false → data loads exactly once.
    let ignore = false;
    const controller = new AbortController();

    (async () => {
      try {
        const res  = await fetch(getApiUrl('/api/portfolio'), { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!ignore && json.success && json.data) {
          setAllItems(buildDedupedList(json.data));
        } else if (!json.success) throw new Error('Empty response');
      } catch (err) {
        if (err.name !== 'AbortError' && !ignore) {
          console.error('Portfolio load error:', err);
          setError('Could not load portfolio data.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;      // prevent stale setState on the aborted first-mount
      controller.abort(); // cancel any in-flight network request
    };
  }, []);

  // ── Filtered view ────────────────────────────────────────────────────────────
  const filteredItems = activeFilter === 'all'
    ? allItems
    : allItems.filter(i => i.category === activeFilter);

  const totalCount = allItems.length;
  const videoCount = allItems.filter(i => i.type === 'video').length;
  const imgCount   = allItems.filter(i => i.type === 'image').length;

  return (
    <section style={{ padding: '110px 0 100px 0' }} className="fade-in">
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: 12 }}>
            Our Portfolio <span className="gradient-text-accent">Showcase</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
            Explore our actual client commissions. Hover over any video card to play instantly.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          <button
            className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-outline'} btn-sm`}
            style={{ borderRadius: 20, fontSize: '0.76rem', padding: '5px 14px' }}
            onClick={() => { setActiveFilter('all'); sessionStorage.setItem('portfolioFilter', 'all'); }}
          >
            <Filter size={11} /> All Portfolio
          </button>
          {CATEGORIES.map(cat => {
            const count = allItems.filter(i => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`btn ${activeFilter === cat.id ? 'btn-primary' : 'btn-outline'} btn-sm`}
                style={{ borderRadius: 20, fontSize: '0.76rem', padding: '5px 14px', gap: 5 }}
                onClick={() => { setActiveFilter(cat.id); sessionStorage.setItem('portfolioFilter', cat.id); }}
              >
                {cat.icon} {cat.label}
                {count > 0 && (
                  <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '0 6px', fontSize: '0.65rem', fontWeight: 700 }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 0' }}>
            <div style={{ width: 40, height: 40, border: '4px solid var(--border-glow)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: 16 }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading portfolio assets…</p>
          </div>
        ) : error ? (
          <GlassCard style={{ textAlign: 'center', padding: '60px 24px' }}>
            <Film size={48} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
            <h3>Could Not Load Portfolio</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
          </GlassCard>
        ) : filteredItems.length === 0 ? (
          <GlassCard style={{ textAlign: 'center', padding: '60px 24px' }}>
            <ImageIcon size={48} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
            <h3>No Items in This Category</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto' }}>
              {totalCount === 0
                ? 'Make sure media files are in the correct folders and backend is running.'
                : 'Try a different filter above.'}
            </p>
          </GlassCard>
        ) : (
          <div className="portfolio-grid">
            {filteredItems.map(item => {
              if (item.category === 'websites') {
                return <WebsiteCard key={item._key} item={item} />;
              }
              return item.type === 'video'
                ? <VideoCard key={item._key} item={item} />
                : <ImageCard key={item._key} item={item} onOpenLightbox={openLightbox} />;
            })}
          </div>
        )}
      </div>

      {/* Lightbox Portal */}
      {lightboxItem && <Lightbox item={lightboxItem} onClose={closeLightbox} />}

      <style>{`
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 22px;
        }
        @media (max-width: 600px) {
          .portfolio-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 12px; }
        }
        .portfolio-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .portfolio-card:hover { transform: translateY(-5px); }
        .portfolio-card:hover .portfolio-img { transform: scale(1.05); }
        .portfolio-hover-overlay {
          position: absolute; inset: 0;
          background: rgba(89,50,230,0.38);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.28s ease; pointer-events: none;
        }
        .portfolio-card:hover .portfolio-hover-overlay { opacity: 1; }
        .portfolio-card:hover .hover-icon { transform: scale(1) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lbZoomIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  buildDedupedList — called ONCE on raw API data.
//  Flattens all categories into a single array, deduplicates by URL,
//  assigns a stable _key and category metadata to each item.
// ─────────────────────────────────────────────────────────────────────────────
function buildDedupedList(data) {
  const seenUrls = new Set();
  const result   = [];

  CATEGORIES.forEach(cat => {
    const raw = data[cat.dataKey];
    if (!Array.isArray(raw)) return;

    dedupeCategory(raw).forEach(item => {
      const normUrl = decodeURIComponent(item.url).toLowerCase().trim();
      if (seenUrls.has(normUrl)) return; // cross-category duplicate — skip
      seenUrls.add(normUrl);

      result.push({
        ...item,
        category:      cat.id,
        categoryLabel: cat.categoryLabel,
        _key:          normUrl, // stable React key — URL-based, never duplicated
      });
    });
  });

  return result;
}

export default Portfolio;
