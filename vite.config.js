import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accept connections from any host
    port: 5173,
    strictPort: false,
    allowedHosts: ['all', 'avi.tooxs.ai'], // Allow all hosts and specific domain
    disableHostCheck: true, // Disable host checking completely
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: ['all', 'avi.tooxs.ai'], // Allow all hosts and specific domain
    disableHostCheck: true, // Disable host checking completely
  },
  define: {
    global: 'globalThis',
  }
})