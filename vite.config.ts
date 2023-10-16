import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, './src/api'),
      constants: path.resolve(__dirname, './src/constants'),
      components: path.resolve(__dirname, './src/components'),
      helpers: path.resolve(__dirname, './src/helpers'),
      hooks: path.resolve(__dirname, './src/hooks'),
      navigation: path.resolve(__dirname, './src/navigation'),
      store: path.resolve(__dirname, './src/store'),
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
