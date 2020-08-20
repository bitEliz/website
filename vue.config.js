/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  publicPath: '/',
  assetsDir: 'assets',

  chainWebpack: (config) => {
    config.plugins.delete('prefetch');

    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@router', path.resolve(__dirname, 'src/router'))
      .set('@utils', path.resolve(__dirname, 'src/utils'))
      .set('@views', path.resolve(__dirname, 'src/views'))
      .set('@assets', path.resolve(__dirname, 'src/assets'))
      .end();
  }
};
