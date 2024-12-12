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
      '@': '/src',
      'react-icons': 'react-icons/fa', // Adjusted to point to the correct directory
    },
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});



