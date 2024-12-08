import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Development server port
    host: true, // Allows access from local network
  },
  build: {
    rollupOptions: {
      input: './index.html', // Ensures the entry point is correct
    },
  },
});



