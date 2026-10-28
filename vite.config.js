import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/scratch/**', '**/.git/**', '**/public/assets/**', '**/*.mp4', '**/*.pdf']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
        }
      }
    }
  }
})
