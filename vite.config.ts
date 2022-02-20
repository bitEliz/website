import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import Components from "unplugin-vue-components/vite"
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers"
import path from "path"

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      Components({
        resolvers: [AntDesignVueResolver({ importStyle: "less" })]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      proxy: {
        "^/api/": {
          target: loadEnv(mode, process.cwd()).VITE_API_SERVER,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    build: {
      target: "es2015",
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    resolve: {
      alias: {
        "/@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./src")
      }
    }
  })
