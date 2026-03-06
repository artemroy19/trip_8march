import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pigeon-maps/marker': '/src/pigeon-marker-shim.ts',
    },
  },

  base: '/trip_on_8march/',
});