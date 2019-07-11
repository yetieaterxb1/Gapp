const path = require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { GenerateSW } = require('workbox-webpack-plugin')


module.exports = {
  name: 'client',
  mode: 'production',
  entry: {
    app: './client/App.js', 
    test: './client/scripts/index.js'
  },
  output: {
    path: path.join(process.cwd(), '/dist/public'),
    filename: '[name].js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
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
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return
        }
        console.log(message)
      },
      minify: true,
      navigateFallback: '/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    new WebpackPwaManifest({
      name: 'APP TITLE',
      short_name: 'APP',
      description: 'DESCRIPTION',
      background_color: '#ffffff',
      crossorigin: null, // null, use-credentials, anonymous
      icons: [
        {
          src: path.resolve('client/icon.png'),
          size: '2400×2643' // multiple sizes
        }
      ]
    }),
    new ManifestPlugin({
      filename: 'asset-manifest.json',
      publicPath: './dist'
    }),
    new GenerateSW({
      swDest: 'service-worker.js',
      importWorkboxFrom: 'cdn',
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    })
  ]
}