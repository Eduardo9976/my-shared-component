import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
      customElement: true,
    }),
    vueDevTools(),
    ui()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
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
        'shared-button': './src/shared-button.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'shared-button') {
            return 'shared-button.js'
          }
          return '[name].js'
        },
        chunkFileNames: '[name].js',
        assetFileNames: 'shared-button.css'
      }
    },
    // Configurações para web component
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    // Garantir que todos os estilos sejam incluídos
    minify: false,
    // Forçar inclusão de todos os estilos
    cssMinify: false
  }
})
