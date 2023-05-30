const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  output: {
    path: `${__dirname}/../../EK-extern/plugins`,
    publicPath: '/build/js',
    filename: 'ekeservice.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'Ekeservice'
  },
  mode: 'development',
  module: {},
  devServer: {
    static: './',
    port: 9008,
    devMiddleware: {
      writeToDisk: true
    }
  }
});
