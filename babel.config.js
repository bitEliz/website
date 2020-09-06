module.exports = {
  presets: [
    ["@vue/app", { useBuiltIns: "entry" }],
    ["@babel/preset-env", { modules: false }],
  ],
  plugins: [
    "@babel/plugin-proposal-optional-chaining",
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk",
      },
    ],
  ],
};
