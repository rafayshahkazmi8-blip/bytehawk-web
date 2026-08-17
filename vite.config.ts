import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Exclude model, content, and dynamic asset types to prevent EBUSY locks on Windows
      ignored: [
        '**/model/**',
        '**/content/**',
        '**/*.glb',
        '**/*.gltf',
        '**/*.pdf',
        '**/*.png',
        '**/*.jpg',
        '**/*.jpeg',
        '**/.git/**'
      ],
    },
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
