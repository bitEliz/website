module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module"
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier", "plugin:prettier/recommended"]
}
