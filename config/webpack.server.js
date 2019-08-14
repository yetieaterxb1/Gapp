const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  name: 'server',
  mode: 'development',
  entry: './server/index.js',
  target: 'node',
  externals: [ nodeExternals() ],
  output: {
    path: path.join(process.cwd(), '/dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
  },
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
  }
}