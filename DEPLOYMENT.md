# ByteHawk Frontend Deployment Guide

## Production Build

### 0. Coolify Deployment (vtuberdesign.com)

This project uses **Vite 8**, which requires **Node.js 22.12+** (and npm that correctly installs native bindings for rolldown). The build container **must** use Node 24.

> ⚠️ **Required**: If you deploy via Coolify/Nixpacks, set `NIXPACKS_NODE_VERSION=24` in your Coolify environment variables. Without this, the build container defaults to Node 22.11.0 and the build fails with:
> ```
> You are using Node.js 22.11.0. Vite requires Node.js version 20.19+ or 22.12+. Please upgrade your Node.js version.
> Cannot find module '../rolldown-binding.linux-x64-gnu.node'
> ```

#### Steps in Coolify
1. Open your application (**Murtazamahmood640/vutberdesign:main**).
2. Go to **Environment Variables**.
3. Add:
   ```
   NIXPACKS_NODE_VERSION=24
   ```
4. **Redeploy**.

The `engines` field in `package.json` (`node >= 22.13.0`) and `.npmrc` (`engine-strict=true`) will fail the build immediately with a clear error if the Node version is ever set too low again.

#### Backend CORS (Important)
The frontend is served at `vtuberdesign.com` but the API lives at `bythawkadmin.vercel.app` (cross-origin). The backend **must** include the exact live origin in its CORS allowlist.

> ⚠️ **Note**: The backend CORS list once contained `https://vutuberdesign.com` (misspelled with an extra "u"). The correct domain is `https://vtuberdesign.com`. Always keep the spelling in sync with the actual Coolify domain.

To allow the live site to fetch the portfolio/API:
1. Edit `../backend/server.js` → CORS `origin` array must include:
   ```
   https://vtuberdesign.com, https://www.vtuberdesign.com
   ```
2. Commit & push to `https://github.com/Murtazamahmood640/bythawkadmin`.
3. Redeploy the backend on Vercel (`bythawkadmin.vercel.app`).
4. Verify:
   ```bash
   curl -s -i -H "Origin: https://vtuberdesign.com" https://bythawkadmin.vercel.app/api/portfolio
   ```
   The response must include `Access-Control-Allow-Origin: https://vtuberdesign.com`.

### 1. Build the frontend
```bash
cd client
npm run build
```

This will create a `dist` folder with optimized production files.

### 2. Deploy to Hostinger

#### Option A: Upload via File Manager
1. Login to your Hostinger control panel
2. Open File Manager
3. Navigate to your domain's public directory (usually `public_html` or `htdocs`)
4. Upload all files from the `dist` folder
5. Make sure `.htaccess` file is uploaded (if present)

#### Option B: Upload via FTP
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger FTP account
3. Upload contents of `dist` folder to `/public_html` or your domain directory

### 3. Configure Backend URL

The frontend is already configured to use the production backend:
- **Backend URL**: `https://bythawkadmin.vercel.app`
- **API Endpoints**: All `/api/*` routes are proxied to the backend
- **Website Domain**: `https://bythawk.com`

### 4. Important Notes

#### CORS Configuration
Ensure your backend at `https://bythawkadmin.vercel.app` has CORS enabled for your Hostinger domain:
```javascript
// In backend/server.js
app.use(cors({
  origin: ['https://bythawk.com', 'https://www.bythawk.com'],
  exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type']
}));
```

#### SSL Certificate
- Hostinger provides free SSL certificates
- Ensure HTTPS is enabled for your domain
- The backend URL uses HTTPS, so mixed content warnings will be avoided

#### File Uploads
- All media files (images, videos) are served from the backend
- No need to upload media files to Hostinger
- Backend serves: `/uploads/*` routes

### 5. Testing

After deployment, test these endpoints:
1. **Homepage**: `https://bythawk.com`
2. **Login**: `https://bythawk.com/#staff/login`
3. **API Health**: `https://bythawkadmin.vercel.app/api/health`
4. **Admin Dashboard**: `https://bythawk.com/#admin` (requires login)

### 6. Build Configuration

Current build settings (in `vite.config.js`):
- **Output**: `dist/` folder
- **Minification**: Terser with console removal
- **Code Splitting**: Vendor chunks for React, Framer Motion, Lucide React
- **Sourcemaps**: Disabled for production
- **Asset Optimization**: Enabled

### 7. Troubleshooting

#### 404 Errors on Refresh
If you get 404 errors when refreshing pages, add this `.htaccess` file to your Hostinger `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### CORS Errors
- Verify backend CORS settings include your Hostinger domain
- Check that backend is running and accessible at `https://bythawkadmin.vercel.app`

#### Media Files Not Loading
- Ensure backend is running and serving `/uploads/*` routes
- Check browser console for CORS or 404 errors
- Verify media URLs are pointing to `https://bythawkadmin.vercel.app/uploads/*`

### 8. Domain Configuration

Your website domain is: **https://bythawk.com**

Make sure to:
1. Update DNS settings in Hostinger to point to your hosting
2. Enable SSL certificate for `bythawk.com` and `www.bythawk.com`
3. Update backend CORS to include both domains:
   - `https://bythawk.com`
   - `https://www.bythawk.com`

### 9. Environment Variables

No environment variables needed for frontend deployment. The production backend URL is hardcoded in `apiConfig.js`.

### 10. Performance Optimization

The build includes:
- ✅ Code splitting (vendor chunks)
- ✅ Minification (Terser)
- ✅ Console/logger removal
- ✅ Asset optimization
- ✅ Tree shaking

### 11. Support

For issues:
1. Check browser console for errors
2. Verify backend is running: `https://bythawkadmin.vercel.app/api/health`
3. Test API endpoints directly
4. Check network tab for failed requests