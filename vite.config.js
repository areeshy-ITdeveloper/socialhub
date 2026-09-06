import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'multi-platform-content-calendar',
  server: {
    port: 3000, // Yahan apna marzi ka port number likhein (e.g. 3000, 8080)
  }
})