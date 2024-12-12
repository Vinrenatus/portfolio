import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src', // Alias for src directory
    },
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});

