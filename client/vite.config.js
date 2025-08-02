import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    host: '0.0.0.0', // This allows access from any IP
    port: 5173,       // Ensure it's the same port you are using
  },
})


