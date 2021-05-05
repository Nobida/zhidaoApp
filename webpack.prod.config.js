var webpack = require('webpack');
var base = require('./webpack.config');

base.devtool = '';

base.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    output: {
      comments: false,  // remove all comments
    },
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),

);

module.exports = base
