import React, { useEffect, useRef } from 'react';

/* ================================================================
   MilkyWayBG  — LEGENDARY Edition
   ----------------------------------------------------------------
   Layer order (back → front):

   [Sky]
   1. Deep void base
   2. Galactic nebula blobs (slow drift)
   3. Milky Way arc — vivid multi-colour band with warm golden core
   4. Stars × 4 parallax depths  (twinkle + scroll + mouse)
   5. Shooting meteors

   [City]
   6. Far buildings   — tiny silhouettes, blue atmosphere haze
   7. Mid buildings   — medium, side-lit shading, subtle windows
   8. Near buildings  — tall dark towers, strong side-shading, dim windows
   9. Horizon city glow + ground reflection

   No window glow (no shadowBlur on windows).
   Windows = dim rectangular slots — interior light, not neon.
   Buildings get elegant side-shading for 3-D depth.
   ================================================================ */

const rand  = (a, b) => Math.random() * (b - a) + a;
const randI = (a, b) => Math.floor(rand(a, b));

// ─────────────────────────────────────────────────────────────────
//  GALAXY  helpers
// ─────────────────────────────────────────────────────────────────
function makeStar(W, H, layer) {
  // layer 0 = ultra-far (tiny/slow)  …  layer 3 = near (large/fast)
  const galProb = [0.78, 0.70, 0.55, 0.35][layer];
  const inGalaxy = Math.random() < galProb;

  let x, y;
  if (inGalaxy) {
    // Band sweeps lower-left → upper-right
    const t      = Math.random();
    const cx     = W * 0.08 + t * W * 0.84;
    const cy     = H * 0.92 - t * H * 0.88;
    // Spread widens toward the galaxy centre (t≈0.5)
    const spread = rand(0, H * 0.26) * (1 - Math.abs(t - 0.48) * 0.52);
    const angle  = Math.atan2(-H * 0.88, W * 0.84) + Math.PI / 2;
    x = cx + Math.cos(angle) * spread * (Math.random() - 0.5) * 2;
    y = cy + Math.sin(angle) * spread * (Math.random() - 0.5) * 2;
  } else {
    x = rand(0, W);
    y = rand(0, H);
  }

  const sizeRange = [
    [0.10, 0.65],   // ultra-far: dust specks
    [0.18, 1.10],   // far
    [0.28, 1.70],   // mid
    [0.40, 2.50],   // near: big bright stars
  ][layer];

  const palettes = [
    [230, 238, 255],   // blue-white
    [255, 255, 255],   // pure white
    [255, 248, 215],   // warm cream
    [255, 218, 185],   // peach
    [210, 215, 255],   // blue
    [255, 210, 240],   // faint pink
    [200, 255, 235],   // faint mint
  ];
  const [r, g, b] = palettes[randI(0, palettes.length)];

  return {
    baseX: x, baseY: y,
    size:  rand(...sizeRange),
    r, g, b,
    alpha:        rand(0.30, 1.0),
    twinkleSpeed: rand(0.25, 3.0),
    twinklePhase: rand(0, Math.PI * 2),
    inGalaxy, layer,
  };
}

function makeNebula(W, H) {
  const t  = Math.random();
  const cx = W * 0.08 + t * W * 0.84;
  const cy = H * 0.92 - t * H * 0.88;
  const palettes = [
    [80, 25, 180],    // deep violet
    [40, 10, 110],    // indigo
    [10, 40, 130],    // midnight blue
    [100, 20, 80],    // dark rose
    [20, 55, 100],    // ocean dark
    [60, 15, 140],    // purple
    [130, 60, 10],    // amber-brown (warm galaxy core edge)
  ];
  const [r, g, b] = palettes[randI(0, palettes.length)];
  return {
    x:  cx + rand(-W * 0.16, W * 0.16),
    y:  cy + rand(-H * 0.12, H * 0.12),
    rx: rand(W * 0.08, W * 0.24),
    ry: rand(H * 0.05, H * 0.16),
    r, g, b,
    alpha:    rand(0.04, 0.13),
    rotation: rand(0, Math.PI),
    driftX:   rand(-0.3, 0.3),
    driftY:   rand(-0.2, 0.2),
    flickPhase: rand(0, Math.PI * 2),
  };
}

// ─────────────────────────────────────────────────────────────────
//  BUILDING  helpers
// ─────────────────────────────────────────────────────────────────

// Window colours — muted, desaturated (interior glow, NOT neon)
const WIN_MUTED = [
  [55, 75, 110],    // muted blue-grey
  [65, 45, 105],    // dim violet
  [85, 50, 75],     // dim rose
  [95, 85, 48],     // amber dull
  [42, 82, 75],     // dark teal
  [80, 80, 95],     // greyed ice
  [105, 80, 55],    // warm tan
];

function generateBuildings(W, H, depthLayer) {
  // Config per layer:  0=ultra-far  1=far  2=mid  3=near
  const cfgs = [
    { minH:H*.04, maxH:H*.10, minW:12, maxW:38,  gap:[1,4],  baseY:H*.990, wProb:.12, wSz:[1,2], atProb:.00 },
    { minH:H*.07, maxH:H*.18, minW:22, maxW:62,  gap:[1,7],  baseY:H*.982, wProb:.18, wSz:[2,3], atProb:.20 },
    { minH:H*.13, maxH:H*.30, minW:40, maxW:100, gap:[2,12], baseY:H*.970, wProb:.24, wSz:[3,4], atProb:.32 },
    { minH:H*.20, maxH:H*.48, minW:60, maxW:150, gap:[4,18], baseY:H*.958, wProb:.28, wSz:[4,5], atProb:.42 },
  ][depthLayer];

  const buildings = [];
  let x = -rand(0, 180);

  while (x < W + 200) {
    const w      = rand(cfgs.minW, cfgs.maxW);
    const h      = rand(cfgs.minH, cfgs.maxH);
    const baseY  = cfgs.baseY;

    // Profile type: 0=flat, 1=double-step, 2=single-step, 3=tapered-top
    const profile = randI(0, 4);

    // Windows — no shadowBlur, muted colour, interior feel
    const [ww, wh] = cfgs.wSz;
    const cols     = Math.max(1, Math.floor((w - 6) / (ww + 4)));
    const rows     = Math.max(1, Math.floor((h - 8) / (wh + 6)));
    const windows  = [];

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (Math.random() < cfgs.wProb) {
          const [wr, wg, wb] = WIN_MUTED[randI(0, WIN_MUTED.length)];
          windows.push({
            c, r, wr, wg, wb,
            // dim flicker — very slow, subtle
            flickSpeed: rand(0.05, 0.55),
            flickPhase: rand(0, Math.PI * 2),
            // base brightness per window (some are nearly off)
            baseBright: rand(0.06, 0.22),
          });
        }
      }
    }

    // Rooftop antenna
    const hasAntenna = Math.random() < cfgs.atProb;
    const antennaH   = hasAntenna ? rand(10, 40) : 0;
    // Signal light blink (NO glow/shadow — just a tiny colored dot)
    const sigR = [220, 56, 236][randI(0, 3)];
    const sigG = [60,  189, 72][randI(0, 3)];
    const sigB = [60,  248, 153][randI(0, 3)];

    // Side-lighting tint per building (simulates galaxy/star ambient)
    // Left face slightly cooler (shadow), right face slightly warmer (ambient)
    const faceTint = randI(0, 3); // 0=violet  1=blue  2=teal

    buildings.push({
      x, w, h, baseY, profile,
      windows, cols, rows, ww, wh,
      hasAntenna, antennaH, sigR, sigG, sigB,
      faceTint, depthLayer,
    });

    x += w + rand(cfgs.gap[0], cfgs.gap[1]);
  }
  return buildings;
}

// ─────────────────────────────────────────────────────────────────
//  SHOOTING STAR
// ─────────────────────────────────────────────────────────────────
function makeShooter(W, H) {
  const x     = rand(0.05 * W, 0.88 * W);
  const y     = rand(0,         0.42 * H);
  const angle = rand(20, 60) * (Math.PI / 180);
  const speed = rand(8, 20);
  return {
    x, y,
    vx:    Math.cos(angle) * speed,
    vy:    Math.sin(angle) * speed,
    len:   rand(100, 260),
    life:  1,
    decay: rand(0.006, 0.018),
    width: rand(0.7, 2.5),
  };
}

// ═════════════════════════════════════════════════════════════════
//  COMPONENT
// ═════════════════════════════════════════════════════════════════
export default function MilkyWayBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');

    let W = 0, H = 0, dpr = 1, animId;
    let time = 0;
    let isVisible = true;
    let frameCount = 0;
    const FRAME_SKIP = 2; // render every 2nd frame for lower CPU

    // ── Smooth state ─────────────────────────────────────────────
    // Scroll: two-stage smoothing for cinematic heavy feel
    let scrollSmooth  = 0;   // fast stage
    let scrollSmoother= 0;   // slow stage (applied to furthest layers)
    let scrollTarget  = 0;

    let mouseX = 0, mouseY = 0;
    let mxTarget = 0, myTarget = 0;

    // ── Scene data ────────────────────────────────────────────────
    let starLayers  = [[], [], [], []];    // 4 depth layers
    let nebulas     = [];
    let bldLayers   = [[], [], [], []];    // 4 depth layers
    let shooters    = [];

    // ── Init ──────────────────────────────────────────────────────
    function init() {
      dpr = Math.min(window.devicePixelRatio, 2); // cap at 2x for performance
      W = canvas.width  = window.innerWidth * dpr;
      H = canvas.height = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Adapt star and building density for lower GPU/CPU overhead
      const isMobile = window.innerWidth <= 768;
      const starScale = isMobile ? 0.35 : (window.innerWidth < 1440 ? 0.55 : 0.75);

      starLayers = [
        Array.from({ length: Math.floor(400 * starScale) }, () => makeStar(W, H, 0)),
        Array.from({ length: Math.floor(300 * starScale) }, () => makeStar(W, H, 1)),
        Array.from({ length: Math.floor(190 * starScale) }, () => makeStar(W, H, 2)),
        Array.from({ length: Math.floor(90 * starScale) }, () => makeStar(W, H, 3)),
      ];

      nebulas = Array.from({ length: isMobile ? 3 : 5 }, () => makeNebula(W, H));

      // Buildings: [ultra-far, far, mid, near]
      bldLayers = [
        generateBuildings(W, H, 0),
        generateBuildings(W, H, 1),
        generateBuildings(W, H, 2),
        generateBuildings(W, H, 3),
      ];

      shooters = [];
    }

    // ─────────────────────────────────────────────────────────────
    //  DRAW: Galaxy band (vivid multi-colour)
    // ─────────────────────────────────────────────────────────────
    function drawGalaxy(scrollOff) {
      const steps = 28;
      const angle = Math.atan2(-H * 0.88, W * 0.84);

      for (let i = 0; i < steps; i++) {
        const t  = i / (steps - 1);
        const cx = W * 0.08 + t * W * 0.84;
        const cy = (H * 0.92 - t * H * 0.88) - scrollOff * 0.022;

        // Core fraction peaks at t≈0.50 (galactic centre)
        const cf = Math.max(0, 1 - Math.abs(t - 0.50) * 2.2);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        const rx = W * 0.10;
        const ry = H * 0.125;
        const R  = Math.max(rx, ry);

        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, R);

        // Very centre: warm gold-white (galactic core)
        grd.addColorStop(0,    `rgba(255, 248, 220, ${cf * 0.07 + 0.018})`);
        // Inner ring: blueish-white star cloud
        grd.addColorStop(0.18, `rgba(210, 222, 255, ${cf * 0.055 + 0.015})`);
        // Mid: violet dust
        grd.addColorStop(0.42, `rgba(140, 100, 230, ${cf * 0.030 + 0.008})`);
        // Outer: deep blue
        grd.addColorStop(0.70, `rgba(60,  80,  200, ${cf * 0.012})`);
        grd.addColorStop(1,    'rgba(0,0,0,0)');

        ctx.scale(rx / R, ry / R);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Extra warm glow at galactic-centre (t≈0.5)
      const gcx = W * 0.08 + 0.50 * W * 0.84;
      const gcy = (H * 0.92 - 0.50 * H * 0.88) - scrollOff * 0.022;
      const coreGrd = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, W * 0.18);
      coreGrd.addColorStop(0,   'rgba(255, 240, 180, 0.06)');
      coreGrd.addColorStop(0.4, 'rgba(180, 140, 255, 0.025)');
      coreGrd.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrd;
      ctx.fillRect(0, 0, W, H);
    }

    // ─────────────────────────────────────────────────────────────
    //  DRAW: Nebula clouds
    // ─────────────────────────────────────────────────────────────
    function drawNebulas(scrollOff, t) {
      for (const n of nebulas) {
        const cx = n.x + Math.sin(t * 0.05 + n.flickPhase ?? 0) * 8;
        const cy = n.y - scrollOff * 0.018 + Math.cos(t * 0.04) * 5;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(n.rotation + t * 0.003);

        const R   = Math.max(n.rx, n.ry);
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
        grd.addColorStop(0,   `rgba(${n.r},${n.g},${n.b},${n.alpha})`);
        grd.addColorStop(0.5, `rgba(${n.r},${n.g},${n.b},${n.alpha * 0.45})`);
        grd.addColorStop(1,   'rgba(0,0,0,0)');

        ctx.scale(n.rx / R, n.ry / R);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ─────────────────────────────────────────────────────────────
    //  DRAW: Stars (4 layers, scroll + mouse parallax)
    // ─────────────────────────────────────────────────────────────
    //  Scroll factors: further = smaller delta (moves less per scroll)
    const S_SCROLL = [0.018, 0.045, 0.085, 0.150];
    //  Mouse parallax strength (as fraction of viewport)
    const S_MOUSE  = [0.004, 0.010, 0.018, 0.030];

    function drawStars(t, scrollSmth, scrollSlw) {
      for (let li = 0; li < 4; li++) {
        // Ultra-far uses the slower-smoothed scroll so it trails more
        const sOff = li < 2 ? scrollSlw * S_SCROLL[li] : scrollSmth * S_SCROLL[li];
        const mx   = S_MOUSE[li];

        for (const s of starLayers[li]) {
          const px = s.baseX + mouseX * mx * W;
          const py = s.baseY - sOff + mouseY * mx * H;

          if (px < -4 || px > W + 4 || py < -4 || py > H + 4) continue;

          const twk   = 0.48 + 0.52 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
          const alpha = s.alpha * twk;

          ctx.save();
          ctx.globalAlpha = alpha;

          // Soft halo for mid/near larger stars (NO shadowBlur — radial gradient instead)
          if (s.size > 0.85 && li >= 2) {
            const hr  = s.size * (li === 3 ? 5.5 : 4.0);
            const hgd = ctx.createRadialGradient(px, py, 0, px, py, hr);
            hgd.addColorStop(0, `rgba(${s.r},${s.g},${s.b},0.45)`);
            hgd.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = hgd;
            ctx.beginPath();
            ctx.arc(px, py, hr, 0, Math.PI * 2);
            ctx.fill();
          }

          // Core dot
          ctx.fillStyle = `rgb(${s.r},${s.g},${s.b})`;
          ctx.beginPath();
          ctx.arc(px, py, s.size, 0, Math.PI * 2);
          ctx.fill();

          // 4-point diffraction spike — only on near large stars
          if (li === 3 && s.size > 1.8) {
            const arm = s.size * 5;
            ctx.globalAlpha = alpha * 0.45;
            ctx.strokeStyle = `rgb(${s.r},${s.g},${s.b})`;
            ctx.lineWidth   = 0.6;
            ctx.beginPath();
            ctx.moveTo(px - arm, py); ctx.lineTo(px + arm, py);
            ctx.moveTo(px, py - arm); ctx.lineTo(px, py + arm);
            ctx.stroke();
          }

          ctx.restore();
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    //  DRAW: Buildings
    // ─────────────────────────────────────────────────────────────
    // Scroll factors per layer (buildings move much less than stars)
    const B_SCROLL = [0.002, 0.010, 0.028, 0.060];
    // Mouse horizontal shift per layer (near buildings drift left/right most)
    const B_MOUSE  = [0.003, 0.007, 0.013, 0.022];
    // Overall opacity per layer
    const B_ALPHA  = [0.55,  0.72,  0.88,  0.97];
    // Atmosphere tint strength (far buildings have more blue haze)
    const B_HAZE   = [0.55,  0.35,  0.15,  0.0];

    // Side-lighting RGB per tint variant
    const FACE_LIGHT = [
      [80, 50, 180],    // violet ambient (from galaxy)
      [40, 70, 160],    // blue ambient
      [30, 120, 130],   // teal
    ];

    function drawBuildings(scrollSmth, t) {
      for (let li = 0; li < 4; li++) {
        const sOff   = scrollSmth * B_SCROLL[li];
        const mxOff  = mouseX * B_MOUSE[li] * W;   // horizontal mouse drift
        const alpha  = B_ALPHA[li];
        const haze   = B_HAZE[li];

        for (const b of bldLayers[li]) {
          // Compute positions
          const bx     = b.x + mxOff;
          const bottom = b.baseY - sOff;
          const top    = bottom - b.h;

          if (bottom < 0 || top > H + 30) continue;

          ctx.save();
          ctx.globalAlpha = alpha;

          // ── Building silhouette with profile ─────────────────
          // Base dark body gradient (top → bottom)
          const bodyGrd = ctx.createLinearGradient(0, top, 0, bottom);
          // Slightly lighter at very top (open sky bounce light)
          bodyGrd.addColorStop(0,   'rgba(8, 3, 22, 0.93)');
          bodyGrd.addColorStop(0.08,'rgba(5, 1, 15, 0.97)');
          bodyGrd.addColorStop(0.55,'rgba(4, 1, 12, 0.98)');
          bodyGrd.addColorStop(1,   'rgba(3, 0, 9,  0.99)');
          ctx.fillStyle = bodyGrd;

          // Draw profile shape
          ctx.beginPath();
          if (b.profile === 1) {
            // Double-step Art Deco setback
            const s1w = b.w * 0.18;
            const s1h = b.h * 0.12;
            const s2w = b.w * 0.10;
            const s2h = b.h * 0.08;
            ctx.rect(bx,             top + s1h + s2h, b.w,         b.h - s1h - s2h);
            ctx.rect(bx + s1w,       top + s2h,       b.w - s1w*2, s1h + 4);
            ctx.rect(bx + s1w + s2w, top,             b.w - (s1w+s2w)*2, s2h + 4);
          } else if (b.profile === 2) {
            // Single-step
            const sw = b.w * 0.22;
            const sh = b.h * 0.16;
            ctx.rect(bx,      top + sh, b.w,       b.h - sh);
            ctx.rect(bx + sw, top,      b.w - sw*2, sh + 3);
          } else if (b.profile === 3) {
            // Slight taper — trapezoid using polygon
            const taper = Math.min(b.w * 0.08, 10);
            ctx.moveTo(bx + taper,     top);
            ctx.lineTo(bx + b.w - taper, top);
            ctx.lineTo(bx + b.w,       bottom);
            ctx.lineTo(bx,             bottom);
            ctx.closePath();
          } else {
            // Flat top
            ctx.rect(bx, top, b.w, b.h);
          }
          ctx.fill();

          // ── Side-shading for 3-D depth ────────────────────────
          // Left face: shadow strip (darker)
          const shadowGrd = ctx.createLinearGradient(bx, 0, bx + b.w * 0.25, 0);
          shadowGrd.addColorStop(0, 'rgba(0,0,0,0.35)');
          shadowGrd.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = shadowGrd;
          ctx.fillRect(bx, top, b.w * 0.25, b.h);

          // Right face: ambient light bounce from galaxy (very subtle)
          const [lr, lg, lb] = FACE_LIGHT[b.faceTint];
          const lightGrd = ctx.createLinearGradient(bx + b.w * 0.75, 0, bx + b.w, 0);
          lightGrd.addColorStop(0, 'rgba(0,0,0,0)');
          lightGrd.addColorStop(1, `rgba(${lr},${lg},${lb},0.10)`);
          ctx.fillStyle = lightGrd;
          ctx.fillRect(bx + b.w * 0.75, top, b.w * 0.25, b.h);

          // ── Atmospheric haze for far layers ───────────────────
          if (haze > 0.02) {
            ctx.fillStyle = `rgba(30, 25, 80, ${haze * 0.18})`;
            ctx.fillRect(bx, top, b.w, b.h);
          }

          // ── Windows — dim interior rectangles, NO glow ────────
          const padX = Math.max(3, (b.w - b.cols * (b.ww + 4)) / 2);
          const padY = 8;

          for (const win of b.windows) {
            const wx = bx  + padX + win.c * (b.ww + 4);
            const wy = top + padY + win.r * (b.wh + 6);
            if (wy + b.wh > bottom - 3 || wy < top + 4) continue;

            // Very slow dim flicker — interior light feel
            const flicker = win.baseBright + 0.04 *
              Math.sin(t * win.flickSpeed + win.flickPhase);
            // Clamp to keep it subtle
            const wa = Math.min(0.25, Math.max(0.0, flicker));

            // NO shadowBlur — just a flat rect with slight inner gradient
            ctx.fillStyle = `rgba(${win.wr},${win.wg},${win.wb},${wa})`;
            ctx.fillRect(wx, wy, b.ww, b.wh);

            // Tiny top highlight on window (like reflection) for mid/near only
            if (li >= 2 && wa > 0.10) {
              ctx.fillStyle = `rgba(255,255,255,${wa * 0.25})`;
              ctx.fillRect(wx, wy, b.ww, 1);
            }
          }

          // ── Rooftop antenna — thin line + tiny dot ─────────────
          if (b.hasAntenna) {
            const ax = bx + b.w / 2;
            const ay = top - b.antennaH;

            // Antenna pole — very thin, no glow
            ctx.globalAlpha = alpha * 0.55;
            ctx.strokeStyle = 'rgba(100, 90, 130, 0.7)';
            ctx.lineWidth   = li >= 3 ? 1.0 : 0.6;
            ctx.beginPath();
            ctx.moveTo(ax, top);
            ctx.lineTo(ax, ay);
            ctx.stroke();

            // Signal blink — tiny dot, colour only, NO shadowBlur
            const blink = Math.max(0, Math.sin(t * 1.5 + b.x * 0.08));
            if (blink > 0.3) {
              ctx.globalAlpha = blink * alpha * 0.75;
              ctx.fillStyle = `rgba(${b.sigR},${b.sigG},${b.sigB},${blink})`;
              const dotR = li >= 3 ? 1.8 : 1.2;
              ctx.beginPath();
              ctx.arc(ax, ay, dotR, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.restore();
        }
      }

      // ── City horizon glow (where buildings meet sky) ──────────
      const hY   = H * 0.96;
      const hGrd = ctx.createLinearGradient(0, hY - H * 0.18, 0, hY);
      hGrd.addColorStop(0,   'rgba(0,0,0,0)');
      hGrd.addColorStop(0.55,'rgba(70, 20, 140, 0.06)');
      hGrd.addColorStop(0.80,'rgba(40, 60, 180, 0.05)');
      hGrd.addColorStop(1,   'rgba(30, 10,  80, 0.10)');
      ctx.fillStyle = hGrd;
      ctx.fillRect(0, hY - H * 0.18, W, H * 0.18 + 4);

      // ── Ground reflection — ultra-subtle colour spread ─────────
      const gGrd = ctx.createLinearGradient(0, hY, 0, H);
      gGrd.addColorStop(0,   'rgba(50, 20, 100, 0.08)');
      gGrd.addColorStop(0.4, 'rgba(20, 40, 120, 0.04)');
      gGrd.addColorStop(1,   'rgba(0,0,0,0.15)');
      ctx.fillStyle = gGrd;
      ctx.fillRect(0, hY, W, H - hY);
    }

    // ─────────────────────────────────────────────────────────────
    //  DRAW: Shooting stars
    // ─────────────────────────────────────────────────────────────
    let nextShooter = rand(4, 9);

    function updateShooters(dt) {
      nextShooter -= dt;
      if (nextShooter <= 0) {
        shooters.push(makeShooter(W, H));
        nextShooter = rand(4, 12);
      }
      shooters = shooters.filter(s => s.life > 0);
      for (const s of shooters) {
        s.x   += s.vx;
        s.y   += s.vy;
        s.life -= s.decay;
      }
    }

    function drawShooters() {
      for (const s of shooters) {
        const spd  = Math.hypot(s.vx, s.vy);
        const tx   = s.x - (s.vx / spd) * s.len;
        const ty   = s.y - (s.vy / spd) * s.len;

        const grd  = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grd.addColorStop(0,   'rgba(255,255,255,0)');
        grd.addColorStop(0.45,`rgba(200,220,255,${s.life * 0.40})`);
        grd.addColorStop(1,   `rgba(255,255,255,${s.life})`);

        ctx.save();
        ctx.strokeStyle = grd;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = 'round';
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Head sparkle — radial gradient (no shadowBlur)
        const hgrd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
        hgrd.addColorStop(0, `rgba(255,255,255,${s.life * 0.9})`);
        hgrd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = hgrd;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // ─────────────────────────────────────────────────────────────
    //  RENDER LOOP
    // ─────────────────────────────────────────────────────────────
    let lastT = 0;
    function render(ts) {
      // Skip frames for performance (render every Nth frame)
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      frameCount++;
      if (frameCount % FRAME_SKIP !== 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dt = Math.min((ts - lastT) / 1000, 0.1);
      lastT = ts;
      time += dt;

      // ── Two-stage scroll smoothing ────────────────────────────
      scrollSmooth   += (scrollTarget   - scrollSmooth)   * 0.060;
      scrollSmoother += (scrollSmooth   - scrollSmoother) * 0.040;

      // ── Mouse smoothing ───────────────────────────────────────
      mouseX += (mxTarget - mouseX) * 0.038;
      mouseY += (myTarget - mouseY) * 0.038;

      // ── Clear + base ──────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(1, 0, 7, 0.32)';
      ctx.fillRect(0, 0, W, H);

      // ── Draw order ────────────────────────────────────────────
      drawNebulas(scrollSmoother, time);
      drawGalaxy(scrollSmoother);
      drawStars(time, scrollSmooth, scrollSmoother);

      updateShooters(dt);
      drawShooters();

      drawBuildings(scrollSmooth, time);

      animId = requestAnimationFrame(render);
    }

    // ─────────────────────────────────────────────────────────────
    //  EVENTS
    // ─────────────────────────────────────────────────────────────
    const onMouse  = (e) => {
      mxTarget = (e.clientX / W) - 0.5;
      myTarget = (e.clientY / H) - 0.5;
    };
    const onScroll = () => { scrollTarget = window.scrollY; };
    const onResize = () => { init(); };

    // Pause canvas when not visible (e.g. user is on another tab)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    // Also pause when page is hidden (tab switch)
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    init();
    window.addEventListener('mousemove', onMouse,  { passive: true });
    window.addEventListener('scroll',    onScroll, { passive: true });
    window.addEventListener('resize',    onResize);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('resize',    onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -3,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
