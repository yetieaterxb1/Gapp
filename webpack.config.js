const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')


const NODE_ENV = process.env.NODE_ENV
const DEV_ENV = process.env.DEV_ENV


const server = require('./config/webpack.server')
const client = NODE_ENV == 'production' ? 
  require('./config/webpack.client') :
  require('./config/webpack.client.dev')

if(DEV_ENV == 'true'){
  const config = client
  const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    open: true
  }

  webpackDevServer.addDevServerEntrypoints(config, options)
  const compiler = webpack(config)
  const devServer = new webpackDevServer(compiler, options)

  devServer.listen(5000, 'localhost', function(){
    console.log('dev server listening on port 5000')
  })
}

module.exports = [
  server,
  client
]
