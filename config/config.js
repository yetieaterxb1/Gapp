const path = require('path')

const root = process.cwd()

module.exports = {
  root: root,
  port: 8000,
  static: {
    dir: path.join(root, '/dist/public'),
    // options: {
    //   dotfiles: 'ignore',
    //   etag: false,
      index: 'index.html',
    //   maxAge: '1d',
    //   redirect: true,
      fallthrough: true,
    //   setHeaders: function (res, path, stat) {
    //     res.set('x-timestamp', Date.now())
    //   }
    // }
  },
  passport: {
    jwt: {
      secret: 'secret'
    }
  },
  db: {
    URI: 'mongodb://localhost/users',
    connectionOpts: {
      useNewUrlParser: true, 
      useCreateIndex: true
    }
  }
}