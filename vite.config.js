import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite + React config. Deliberately NOT Next.js — plain React,
// static output, ready for Vercel as a static/SPA build.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
