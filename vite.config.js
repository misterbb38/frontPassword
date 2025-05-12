import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    host: '0.0.0.0', // Pour rendre l'application accessible sur le réseau
    proxy: {
      '/api': {
        // target: 'http://localhost:5001',
        target: 'https://serverpassword.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  // Ajout d'une configuration de construction explicite
  build: {
    outDir: 'dist',
    // Générer des fichiers source map pour faciliter le débogage
    sourcemap: true
  }
});