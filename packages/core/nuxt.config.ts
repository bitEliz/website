export default defineNuxtConfig({
  app: {
    buildAssetsDir: '/assets/',
    rootId: '__rt'
  },
  srcDir: 'src',
  runtimeConfig: {
    public: {
      uid: 'paul',
      baseUrl: 'http://localhost:8080'
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
