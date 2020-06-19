/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((args) => {
        args.limit = 10240;
        args.esModule = false;
        return args;
      })
      .end();

    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('router', path.resolve(__dirname, 'src/router'))
      .set('utils', path.resolve(__dirname, 'src/utils'))
      .set('views', path.resolve(__dirname, 'src/views'))
      .end();
  },
};
