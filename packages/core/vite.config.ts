import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import importPlugin from 'unplugin-auto-import/vite'
import componentPlugin from 'unplugin-vue-components/vite'
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
    })
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
          let assets = assetInfo.name.split('.')[1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(assets)) {
            assets = 'img'
          }
          return `assets/${assets}/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/chunk/[name]-[hash].js',
        entryFileNames: '[name].js'
      }
    }
  }
})
