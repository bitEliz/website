import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    buildAssetsDir: "/assets/"
  },
  css: ["bootstrap/scss/bootstrap.scss"],
  srcDir: "src",
  runtimeConfig: {
    api: {
      __baseURL: process.env.NUXT_API_BASE_URL
    },
    public: {
      __uid: process.env.NUXT_API_UID
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/bootstrap";`
        }
      }
    }
  }
})
