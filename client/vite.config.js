import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose on the local network (prints a Network URL)
    port: 5174,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Split heavy vendors into their own chunks for faster loads.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          animation: ['framer-motion', 'gsap', 'lenis'],
          three: ['three', '@react-three/fiber'],
        },
      },
    },
  },
});
