import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Configure proxy so API calls to "/api" go to your backend
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
