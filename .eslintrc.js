module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier"
  ],
  plugins: ["vue", "nuxt", "prettier"],
  // add your custom rules here
  rules: {
    "quotes": [1, "double"]
  }
}
