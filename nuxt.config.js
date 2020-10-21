export default {
  globalName: "rt",
  srcDir: "src/",
  dir: {
    pages: "views",
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "JUNFENG ZHANGE",
    titleTemplate: `%s`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "keywords", name: "keywords", content: "" },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    noscript: [{ innerHTML: "This website requires JavaScript." }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["node_modules/prettify/scss/prettify.scss"],

  styleResources: {
    scss: [
      "prettify/scss/_functions.scss",
      "prettify/scss/_mixins.scss",
      "prettify/scss/_variables.scss"
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/element-ui", "~/plugins/filters", "~/plugins/http"],

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
    icons: false,
    componentPlugins: ["CollapsePlugin"],
    directivePlugins: ["VBScrollspyPlugin"],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL ?? "http://localhost:8080",
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
    babel: {
      configFile: true
    }
  },
};
