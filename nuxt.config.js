import appConfig from "./src/config/app.config";

export default {
  srcDir: "src/",
  dir: {
    pages: "views",
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: `${appConfig.meta.title}`,
    titleTemplate: `%s | ${appConfig.meta.title}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "keywords", name: "keywords", content: appConfig.meta.keywords },
      {
        hid: "description",
        name: "description",
        content: appConfig.meta.description,
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    noscript: [{ innerHTML: "This website requires JavaScript." }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/scss/common.scss"
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/element-ui", "~/plugins/filters"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
  ],

  bootstrapVue: {
    css: false,
    bvCSS: false,
    componentPlugins: ["CollapsePlugin"],
    directivePlugins: ["VBScrollspyPlugin"],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_BASE_URL,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    babel: {
      configFile: true,
    },
    styleResources: {
      scss: [
        "~/assets/scss/_functions.scss",
        "~/assets/scss/_mixins.scss",
        "~/assets/scss/_variables.scss",
      ],
    },
    extractCSS: true,
    optimizeCSS: true,
  },
};
