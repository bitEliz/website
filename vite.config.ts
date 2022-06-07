import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import compressionPlugin from "vite-plugin-compression"
import * as path from "path"

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) =>
  defineConfig({
    plugins: [vue(), compressionPlugin()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        },
        scss: {
          additionalData: `@import "~/assets/styles/bootstrap";`
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
    resolve: {
      alias: {
        "/@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./src")
      }
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            let assets = assetInfo.name.split(".")[1]
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(assets)) {
              assets = "img"
            }
            return `assets/${assets}/[name]-[hash][extname]`
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js"
        }
      }
    }
  })
