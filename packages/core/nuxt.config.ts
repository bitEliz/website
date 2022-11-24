export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assets/',
    rootId: '__rt'
  },
  css: ['@/assets/styles/bootstrap.scss'],
  srcDir: 'src',
  runtimeConfig: {
    api: {
      __baseURL: process.env.BLOG_API_BASE_URL
    },
    public: {
      __uid: process.env.BLOG_API_UID
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/styles/_preprocess.bootstrap.scss";`
        }
      }
    }
  }
})
