const path = require('path')

const root = process.cwd()

const JWT_SECRET = 'secret'

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
      redirect: false,
      fallthrough: false,
    //   setHeaders: function (res, path, stat) {
    //     res.set('x-timestamp', Date.now())
    //   }
    // }
  },
  passport: {
    jwt: {
      secretOrKey: JWT_SECRET
    }
  },
  jwt: {
    opts:{
      expires: Math.round((new Date().getTime())) + 30000
      // expires: 3600
    },
    secret: JWT_SECRET
  },
  db: {
    URI: 'mongodb://localhost/Gapp',
    connectionOpts: {
      useNewUrlParser: true, 
      useCreateIndex: true
    }
  }
}