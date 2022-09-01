import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  telemetry: false,
  app: {
    buildAssetsDir: 'assets/'
  },
  css: ['@/_assets/styles/bootstrap.scss'],
  srcDir: 'src',
  runtimeConfig: {
    api: {
      __baseURL: process.env.NUXT_API_BASE_URL || 'http://127.0.0.1:8080'
    },
    public: {
      __uid: process.env.NUXT_API_UID || '__uid'
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/_assets/styles/_preprocess.bootstrap.scss";`
        }
      }
    }
  }
})
