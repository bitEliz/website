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
        dts: './types/auto-imports.d.ts'
      }),
      componentPlugin({
        directoryAsNamespace: true,
        dts: './types/components.d.ts'
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
    }
  })
