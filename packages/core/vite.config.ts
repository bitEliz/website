import { defineConfig, loadEnv } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import importPlugin from 'unplugin-auto-import/vite'
import componentPlugin from 'unplugin-vue-components/vite'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    plugins: [
      vuePlugin(),
      vueJsxPlugin(),
      importPlugin({
        imports: ['vue', 'vue-router', '@vueuse/core', 'pinia'],
        dts: './src/types/auto-imports.d.ts'
      }),
      componentPlugin({
        directoryAsNamespace: true,
        dts: './src/types/components.d.ts'
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
    server: {
      proxy: {
        '/api/': {
          target: loadEnv(mode, process.cwd()).API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let assets = assetInfo.name.split('.')[1]
            if (/png|jpe?g|svg|tiff|bmp|ico/i.test(assets)) {
              assets = 'img'
            }
            return `assets/${assets}/[name]-[hash][extname]`
          },
          chunkFileNames: 'assets/js/[name].[hash].js'
          // entryFileNames: 'assets/js/[name].[hash].js'
        }
      }
    }
  })
