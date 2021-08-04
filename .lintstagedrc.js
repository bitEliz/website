module.exports = {
    "*.{js,jsx,ts,tsx}": ["prettier --write"],
    "{!(package)*.json,*.code-snippets,.!(browserslist)*rc}": ["prettier --write--parser json"],
    "package.json": ["prettier --write"],
    "*.vue": ["prettier --write", "stylelint --fix"],
    "*.{scss,less,styl,html}": ["prettier --write", "stylelint --fix"],
    "*.md": ["prettier --write"],
  };
  