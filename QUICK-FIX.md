# Quick Fix for Production Deployment Issues

## Problem:
1. API calls going to `https://bythawk.com/api/*` instead of backend
2. Images not loading in portfolio
3. 404 errors on login

## Root Cause:
The `dist` folder uploaded to Hostinger contains OLD code. You need to rebuild after the apiConfig changes.

## Solution:

### Step 1: Rebuild Frontend (REQUIRED)
```bash
cd client
npm run build
```

This creates a NEW `dist` folder with the correct backend URL (`https://bythawkadmin.vercel.app`).

### Step 2: Upload to Hostinger
1. **Delete old files** from Hostinger `public_html`
2. **Upload NEW** `dist` folder contents
3. **Upload `.htaccess`** file (for SPA routing)

### Step 3: Verify Backend is Running
Test these URLs in your browser:
- `https://bythawkadmin.vercel.app/api/health` (should show JSON)
- `https://bythawkadmin.vercel.app/api/portfolio` (should show portfolio data)
- `https://bythawkadmin.vercel.app/uploads/logo.png` (should show logo image)

## What Changed:

### Before (OLD dist folder):
```javascript
// API calls went to bythawk.com (WRONG)
fetch('/api/auth/login')  // ❌ Goes to bythawk.com
```

### After (NEW dist folder):
```javascript
// API calls go to backend (CORRECT)
fetch('https://bythawkadmin.vercel.app/api/auth/login')  // ✅ Goes to backend
```

## Important Notes:

1. **DO NOT** upload the `client/src` folder to Hostinger
2. **ONLY** upload the `dist` folder contents
3. **NO** media files needed in Hostinger (all served from backend)
4. Backend URL is hardcoded: `https://bythawkadmin.vercel.app`

## Testing After Deployment:

1. Visit: `https://bythawk.com`
2. Open browser DevTools (F12) → Network tab
3. Click "Staff Login" in footer
4. Login with: `murtazamahmood640@gmail.com` / `Shoaib12$`
5. Check Network tab - API calls should go to `bythawkadmin.vercel.app`

## If Still Not Working:

### Check 1: Verify dist folder is new
```bash
cd client
npm run build
# Check the timestamp - should be today's date
```

### Check 2: Clear browser cache
- Press Ctrl+Shift+R to hard refresh
- Or clear browser cache completely

### Check 3: Verify backend is accessible
```bash
# In browser, visit:
https://bythawkadmin.vercel.app/api/health

# Should return JSON like:
# {"success":true,"data":{"status":"ok",...}}
```

### Check 4: Check CORS
Backend must allow `https://bythawk.com`:
```javascript
// In backend/server.js - already configured ✅
origin: ['*', 'https://bythawk.com', 'https://www.bythawk.com']
```

## Summary:
**The fix is simple: Rebuild the frontend and re-upload the dist folder.**

```bash
cd client && npm run build
# Then upload the NEW dist folder to Hostinger