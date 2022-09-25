import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import importPlugin from 'unplugin-auto-import/vite'
import componentPlugin from 'unplugin-vue-components/vite'
import pagesPlugin from 'vite-plugin-pages'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vuePlugin(),
    vueJsxPlugin(),
    importPlugin({
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
      dirs: ['src/composables', 'src/store'],
      dts: 'types/auto-imports.d.ts',
      vueTemplate: true
    }),
    componentPlugin({
      directoryAsNamespace: true,
      dts: 'types/auto-components.d.ts'
    }),
    pagesPlugin()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/styles/_preprocess.bootstrap.scss';`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let dirname = assetInfo.name.split('.').pop()
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(dirname)) {
            dirname = 'img'
          }
          return `assets/${dirname}/[name]-[hash][extname]`
        },
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: '[name].js'
      }
    }
  },
  envPrefix: 'BLOG_'
})
