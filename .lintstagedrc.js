module.exports = {
  "*.{js,json,ts,tsx,html,md}": ["prettier --write"],
  "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
  "*.vue": ["stylelint --custom-syntax postcss-html --fix", "prettier --write"],
  "*.{scss,less,styl}": ["stylelint --custom-syntax postcss-html --fix", "prettier --write"]
}
