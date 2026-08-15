// API URL Resolver — Production-ready with environment detection

// ─── FORCE LIVE BACKEND ───────────────────────────────────────────────────────
// Set this to `true` to ALWAYS use the production backend (https://bythawkadmin.vercel.app)
// even when running the frontend locally on Vite dev server.
// Set to `false` to use the local backend (http://localhost:50001) in development.
const USE_LIVE_BACKEND = true;

// Production backend URL
const PROD_API_URL = 'https://bythawkadmin.vercel.app';

// Cache-bust version — increment this whenever media files are updated on disk.
// This forces the browser to treat all media URLs as new and re-fetch fresh copies,
// bypassing any stale entries previously cached with long max-age headers.
const MEDIA_VERSION = 3;

// API URL Resolver
export const getApiUrl = (path) => {
  // If forced to use live backend, always return production URL
  if (USE_LIVE_BACKEND) {
    return `${PROD_API_URL}${path}`;
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const port = typeof window !== 'undefined' ? window.location.port : '';
  
  // Production detection: Check multiple indicators
  const isProduction = import.meta.env.PROD || 
                       hostname === 'bythawk.com' || 
                       hostname === 'www.bythawk.com' ||
                       hostname === 'vutuberdesign.com' ||
                       hostname === 'www.vutuberdesign.com' ||
                       hostname.includes('vercel.app') ||
                       !hostname.includes('localhost');
  
  if (isProduction) {
    return `${PROD_API_URL}${path}`;
  }
  
  // Development: Use local backend
  if (hostname) {
    // If running on Vite dev server (5173 or 3000), use the Express backend on 50001
    if (port === '5173' || port === '3000') {
      return `http://${hostname}:50001${path}`;
    }
    // If backend is running directly on any port, use that
    if (port === '52827' || port === '50001') {
      return `http://${hostname}:${port}${path}`;
    }
  }
  
  // Fallback to production API
  return `${PROD_API_URL}${path}`;
};

// Media URL Resolver — bypasses Vite proxy and goes DIRECTLY to Express backend.
// This is CRITICAL for smooth video streaming: Vite's HTTP proxy does not properly
// forward HTTP Range requests, causing video buffering, lag, and stutter.
// Express.static handles Range requests natively for seamless video playback.
export const getMediaUrl = (path) => {
  // If path is already a complete URL (e.g., Cloudinary URLs), return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    const sep = path.includes('?') ? '&' : '?';
    return `${path}${sep}v=${MEDIA_VERSION}`;
  }

  const sep = path.includes('?') ? '&' : '?';
  const versioned = `${path}${sep}v=${MEDIA_VERSION}`;

  // If forced to use live backend, always return production URL
  if (USE_LIVE_BACKEND) {
    return `${PROD_API_URL}${versioned}`;
  }

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const port = typeof window !== 'undefined' ? window.location.port : '';
  
  // Production detection: Check multiple indicators
  const isProduction = import.meta.env.PROD || 
                       hostname === 'bythawk.com' || 
                       hostname === 'www.bythawk.com' ||
                       hostname === 'vutuberdesign.com' ||
                       hostname === 'www.vutuberdesign.com' ||
                       hostname.includes('vercel.app') ||
                       !hostname.includes('localhost');
  
  if (isProduction) {
    return `${PROD_API_URL}${versioned}`;
  }

  if (hostname) {
    // Dev environment (Vite on 5173) → bypass proxy, go direct to Express on 50001
    if (port === '5173' || port === '3000') {
      return `http://${hostname}:50001${versioned}`;
    }
    // Backend served directly (port 52827 or 50001)
    if (port === '52827' || port === '50001') {
      return `http://${hostname}:${port}${versioned}`;
    }
  }
  
  return versioned;
};