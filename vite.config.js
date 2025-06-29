import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';
import VitePreload from 'vite-plugin-preload';
// import { VitePWA } from 'vite-plugin-pwa';
import imp from 'vite-plugin-imp';
import path from 'path';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import vitePluginSvgr from 'vite-plugin-svgr';
import { analyzer } from 'vite-bundle-analyzer';

const compressionOpts = {
  threshold: 10240,
  filter: /\.(js|css|html|svg|json|txt|xml|wasm)$/,
};
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    imp({
      libList: [
        {
          libName: 'react-icons',
          libDirectory: '',
          camel2DashComponentName: false,
        },
      ],
    }),
    vitePluginSvgr(),
    viteCompression({
      ...compressionOpts,
      algorithm: 'brotliCompress',
      ext: '.br',
      compressionOptions: { level: 11 },
    }),
    viteCompression({
      ...compressionOpts,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    ViteImageOptimizer({
      jpeg: { quality: 75 },
      png: { quality: 75 },
      svg: { multipass: true },
      gif: { optimizationLevel: 3 },
      webp: { quality: 75 },
    }),
    VitePreload({
      rel: 'modulepreload',
      include: ['**/*.js'],
    }),
    // analyzer(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: false,
    //   },
    // workbox: {
    //   runtimeCaching: [
    //     {
    //       urlPattern: /\/src\//,
    //       handler: 'NetworkOnly',
    //     },

    //     {
    //       urlPattern: /\/node_modules\//,
    //       handler: 'NetworkOnly',
    //     },
    //     {
    //       urlPattern: /.*\.(png|jpg|jpeg|svg|mp3|woff2)/,
    //       handler: 'CacheFirst',
    //       options: {
    //         cacheName: 'assets-cache',
    //         expiration: {
    //           maxEntries: 50,
    //           maxAgeSeconds: 60 * 60 * 24 * 7,
    //         },
    //       },
    //     },
    //     {
    //       urlPattern: /\/$/,
    //       handler: 'NetworkFirst',
    //       options: {
    //         cacheName: 'html-cache',
    //         expiration: {
    //           maxEntries: 10,
    //           maxAgeSeconds: 60 * 60 * 24,
    //         },
    //       },
    //     },
    //     {
    //       urlPattern: /\/assets\//,
    //       handler: 'CacheFirst',
    //       options: {
    //         cacheName: 'assets-cache',
    //         expiration: {
    //           maxEntries: 50,
    //           maxAgeSeconds: 60 * 60 * 24 * 30,
    //         },
    //       },
    //     },
    //   ],
    // },
    // manifest: {
    //   name: 'SharkFlow',
    //   short_name: 'TF',
    //   description: 'Список задач',
    //   start_url: '/?utm_source=homescreen',
    //   scope: '/',
    //   display: 'standalone',
    //   background_color: '#FFFFFF',
    //   theme_color: '#111111',
    //   lang: 'ru-RU',
    //   icons: [
    //     {
    //       src: '/icons/pwa-192x192.png',
    //       sizes: '192x192',
    //       type: 'image/png',
    //       purpose: 'any maskable',
    //     },
    //     {
    //       src: '/icons/pwa-512x512.png',
    //       sizes: '512x512',
    //       type: 'image/png',
    //       purpose: 'any maskable',
    //     },
    //   ],
    //   // screenshots: [
    //   //   {
    //   //     src: "/screenshots/app-mobile.png",
    //   //     sizes: "540x720",
    //   //     type: "image/png",
    //   //     form_factor: "narrow",
    //   //   },
    //   //   {
    //   //     src: "/screenshots/app-desktop.png",
    //   //     sizes: "1024x768",
    //   //     type: "image/png",
    //   //     form_factor: "wide",
    //   //   },
    //   // ],
    //   categories: ['social', 'communication'],
    // },
    // }),
  ],
  optimizeDeps: {
    include: ['framer-motion', 'react-icons', 'react-toastify'],
  },
  server: {
    historyApiFallback: true,
    watch: {
      usePolling: true,
    },
    logLevel: 'info',
  },
  resolve: {
    alias: {
      '@features': path.resolve(__dirname, 'src/features'),
      '@common': path.resolve(__dirname, 'src/common'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@validators': path.resolve(__dirname, 'src/validators'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      'hljs-langs': path.resolve(
        __dirname,
        'node_modules/highlight.js/lib/languages',
      ),
    },
  },
  build: {
    target: 'esnext',
    mode: 'production',
    minify: 'terser',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      output: {
        comments: false,
      },
    },
    modulePreload: {
      polyfill: true,
    },

    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop();

          if (['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif'].includes(extType)) {
            return 'images/[name].[hash][extname]';
          }

          if (['css'].includes(extType)) {
            return 'css/[name].[hash][extname]';
          }

          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },
});
