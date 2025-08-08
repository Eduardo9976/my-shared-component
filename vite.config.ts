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
          // Tratar todos os elementos com hífen como elementos personalizados
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
  build: {
    rollupOptions: {
      input: {
        app: './index.html',
        'shared-button': './src/shared-button.ts'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    assetsInlineLimit: 0,
    cssCodeSplit: false
  }
})
