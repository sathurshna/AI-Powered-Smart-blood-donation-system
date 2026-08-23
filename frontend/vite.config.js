import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api gets forwarded to the Express backend
      '/api': 'http://localhost:5001',
    },
  },
})
