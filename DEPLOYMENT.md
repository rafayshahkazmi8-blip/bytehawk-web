# ByteHawk Frontend Deployment Guide

## Production Build

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