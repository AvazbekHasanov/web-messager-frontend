import { fileURLToPath, URL } from 'url'; // Keep using this for URL manipulation
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcss from 'postcss';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'path': 'path-browserify',
      'url': 'url',
    },
  }
});
