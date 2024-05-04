import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: '/src/assets',
  server: {
    hmr: {
      protocol: 'ws',
    }
  },
  build: {
    target: ['esnext'],
    rollupOptions: {
      input: {
        app: './public/index.html',
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: `${path.resolve('src')}`
      },
      {
        find: '@css',
        replacement: `${path.resolve('src', 'assets', 'css')}`
      },
      {
        find: '@img',
        replacement: `${path.resolve('src', 'assets', 'img')}`
      },
      {
        find: '@js',
        replacement: `${path.resolve('src', 'assets', 'js')}`
      }
    ]
  },
});