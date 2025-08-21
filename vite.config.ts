import {fileURLToPath, URL} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-')
        }
      },
      customElement: true
    }),
    vueDevTools(),
    ui()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['@inertiajs/vue3']
  },
  define: {
    'process.env': {},
    'process.platform': '"browser"',
    'process.version': '"v16.0.0"',
    global: 'globalThis'
  },
  envDir: '.',
  server: {
    proxy: {
      '/do': {
        target: 'https://trunk.me.com.br',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        'the-header': './src/components/TheHeader/the-header.ts'
      },
      output: {
        entryFileNames: chunkInfo => {
          if (chunkInfo.name === 'the-header') {
            return 'the-header.js'
          }
          return '[name].js'
        },
        chunkFileNames: '[name].js',
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') {
            return 'webcomponents-styles.css'
          }
          if (assetInfo.name === 'the-header.css') {
            return 'the-header.css'
          }
          return '[name].[ext]'
        }
      }
    },
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    minify: false,
    cssMinify: false
  }
})
