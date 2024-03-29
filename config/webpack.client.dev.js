const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  name: 'client',
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: './client/App.js', 
    js: './client/scripts/index.js',
    css: './client/styles/whirlpool.css'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader/url' }, 
          { loader: 'file-loader' }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      protectWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      hash: false,
      cache: false,
      inject: true,
      title: 'PRO TITLE',
      filename: 'index.html',
      template: './client/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    path: path.join(process.cwd(), '/dist/public'),
    filename: '[name].js',
  }
}