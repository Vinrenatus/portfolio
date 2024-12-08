import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // Remove this if unnecessary
  },
  server: {
    port: 5173,
    host: true, // Allows access from local network
  },
  build: {
    rollupOptions: {
      input: './index.html', // Ensures Vite knows where the entry point is
    },
  },
});


