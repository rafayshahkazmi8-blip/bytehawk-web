import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:50001',
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: 'http://localhost:50001',
        changeOrigin: true,
        secure: false,
        bypass(req) {
          const path = req.url.split('?')[0];
          const publicFiles = ['/uploads/LOGO.png', '/uploads/logo.png', '/uploads/logodark.png', '/uploads/FAV.png', '/uploads/FAV-r-bg.png', '/uploads/FAV-r-bg-square.png'];
          if (publicFiles.includes(path)) return req.url;
        }
      }
    },
    watch: {
      ignored: [
        '**/*.tmp',
        '**/*.~*',
        '**/public/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  }
})
