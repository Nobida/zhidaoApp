var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var routeComponentRegex = /view\/([^\/]+\/?[^\/]+).js$/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const version = '190804-unicom-11'
module.exports = {  
  devtool: false,
  entry: {
    app: path.resolve(__dirname, './src/app.jsx'),
    vendors: [
      'react',
      'react-addons-css-transition-group',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-dom',
      'redux',
      'redux-promise-middleware',
      'prop-types'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: `[name].${version}.js`,
    chunkFilename: `[name].${version}.js`
    // filename: '[name].[hash].js',
    // chunkFilename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        //loaders: ['style-loader', 'css-loader', 'sass-loader'],
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: 'sass-loader'
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        options: {
          babelrc: false,
          presets: ['react','env'],
          plugins: ['syntax-dynamic-import']
        }
      },
      //  {
      //   test: /\.(js|jsx)$/,
      //   include: path.resolve(__dirname, 'src'),
      //   exclude: routeComponentRegex,
      //   loader: 'babel-loader'
      // },
      // run route components through bundle-loader
      // {
      //   test: routeComponentRegex,
      //   include: path.resolve(__dirname, 'src'),
      //   loaders: ['bundle?lazy', 'babel-loader']
      // },
      {
        test: /\.css?$/,
        loaders : [
          'style-loader',
          'css-loader'
        ]
      },
      { test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url-loader',
        query: {limit: 10240}
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.tpl'
    }),
    new CopyWebpackPlugin([
      { from: 'static' }  // files in static folder will be copied to output
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      //filename: 'vendor.[hash].js',
      filename: `vendor.${version}.js`,
    }),  
     new ExtractTextPlugin({ 
        filename:  (getPath) => { 
            return getPath(`css/[name].${version}.css`).replace('css/js', 'css')
        },
        allChunks: true
    })
  ]
};


