const path = require('path')

const root = path.resolve(__dirname + '/../')

const JWT_SECRET = 'secret'

module.exports = {
  root: root,
  port: 8000,
  static: {
    dir:'./dist/public',
    index: 'index.html',
    redirect: false,
    fallthrough: false
  },
  api: {
    path: {
      root: 'http://localhost:8000'
    }
  },
  budr: {
    path: {
      rpath: './server/api/budr/src/cli.R'
    }
  },
  passport: {
    jwt: {
      secretOrKey: JWT_SECRET
    }
  },
  jwt: {
    opts:{
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) * 10000000000
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