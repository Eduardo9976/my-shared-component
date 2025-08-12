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
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        'shared-button': './src/components/SharedButton/shared-button.ts',
        'card-xpto': './src/components/CardXPTO/card-xpto.ts'
      },
      output: {
        entryFileNames: chunkInfo => {
          if (chunkInfo.name === 'shared-button') {
            return 'shared-button.js'
          }
          if (chunkInfo.name === 'card-xpto') {
            return 'card-xpto.js'
          }
          return '[name].js'
        },
        chunkFileNames: '[name].js',
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'shared-button.css') {
            return 'shared-button.css'
          }
          if (assetInfo.name === 'card-xpto.css') {
            return 'card-xpto.css'
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
