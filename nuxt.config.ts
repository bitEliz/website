import { NuxtConfig } from "@nuxt/types";

const __url = process.env.BASE_URL || "http://localhost:8080";

const nuxtConfig: NuxtConfig = {
  globalName: "rt",
  srcDir: "src/",
  dir: {
    pages: "views",
  },
  publicRuntimeConfig: {
    baseURL: __url,
    uid: process.env.USER_ID || "paul",
  },
  privateRuntimeConfig: {},
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: `%s`,
    htmlAttrs: {
      lang: "zh-CN",
    },
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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    noscript: [{ innerHTML: "This website requires JavaScript." }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["prettify/scss/prettify.scss", "~/assets/scss/hl.scss"],

  styleResources: {
    scss: [
      "prettify/scss/_functions.scss",
      "prettify/scss/_variables.scss",
      "prettify/scss/_mixins.scss",
    ],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~/plugins/filters", "~/plugins/http", "~/plugins/antd"],

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

  router: {
    linkActiveClass: "link--active",
    linkExactActiveClass: "link--exact-active",
    prefetchLinks: false,
    linkPrefetchedClass: "link--prefetched",
  },

  bootstrapVue: {
    css: false,
    bvCSS: false,
    icons: false,
    componentPlugins: ["AvatarPlugin", "CollapsePlugin", "ImagePlugin"],
    directivePlugins: ["VBScrollspyPlugin"],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: __url,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      configFile: true,
      compact: true,
    },

    loaders: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
};

module.exports = nuxtConfig;            