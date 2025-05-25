import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/movies-vite/', // Для GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
