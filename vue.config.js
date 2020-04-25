
const path = require('path')

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // pwa: {
  //   iconPaths: {
  //     favicon32: 'favicon.ico',
  //     favicon16: 'favicon.ico',
  //     appleTouchIcon: 'favicon.ico',
  //     maskIcon: 'favicon.ico',
  //     msTileImage: 'favicon.ico'
  //   }
  // },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('public', path.resolve(__dirname, 'public'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('components', path.resolve(__dirname, 'src/components'))
  },
}
