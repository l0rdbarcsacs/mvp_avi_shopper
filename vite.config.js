import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Accept connections from any host
    port: 5173,
    strictPort: false,
    allowedHosts: ['all', 'df91d9569da5.ngrok-free.app', '.ngrok-free.app'], // Allow all hosts and specific ngrok domains
    disableHostCheck: true, // Disable host checking completely
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: ['all', 'df91d9569da5.ngrok-free.app', '.ngrok-free.app'], // Allow all hosts and specific ngrok domains
    disableHostCheck: true, // Disable host checking completely
  },
  define: {
    global: 'globalThis',
  }
})