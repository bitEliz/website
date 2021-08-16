import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components, { AntDesignVueResolver } from "vite-plugin-components"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      customComponentResolvers: [AntDesignVueResolver()]
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
        target: "https://api.akii.me",
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
