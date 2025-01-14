import { defineConfig } from 'vite';
const NODE_ENV = process.env.NODE_ENV || 'dev';

export default defineConfig({
  base: NODE_ENV === 'production' ? './' : './',
  server: {
    port: 3000,
    strictPort: true,
    // proxy: {
    //   '/user': {
    //     target: 'https://ya-praktikum.tech/api/v2/resources',
    //     changeOrigin: true,
    //   },
    // },
  },
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        format: 'es',
        strict: false,
        dir: 'dist/',
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  plugins: [],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: `
        // @use "./src/scss/styles.scss" as *;
      `,
      },
    },
  },
});
