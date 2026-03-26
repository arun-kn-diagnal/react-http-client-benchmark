import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  base: './',
  optimizeDeps: {
    include: ['react-redux'],
  },
  plugins: [
    react(),
    visualizer({
      filename: './dist/report.html',
      template: 'treemap', 
      gzipSize: true,
      brotliSize: true,

    }),
    babel({
      babelConfig: {
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    legacy({
      renderModernChunks: false,
      targets: ['chrome >= 53', "not dead"],
      modernPolyfills: true,
      renderLegacyChunks: true,
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime',
        'core-js/modules/es.promise.js',
        'core-js/modules/es.object.assign.js',
        'core-js/modules/es.symbol.js',
        'whatwg-fetch'
      ]
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: 'inline',
    minify: 'terser',
    cssMinify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const packageName = id.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
            if (packageName) {
              return packageName;
            }
          }
        },
      },
    },
  },
})