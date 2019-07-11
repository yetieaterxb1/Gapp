const path = require('path')

module.exports = {
  root: path.join(process.cwd()),
  port: 8000,
  db: {
    URI: 'mongodb://localhost/users',
    connectionOpts: {
      useNewUrlParser: true, 
      useCreateIndex: true
    }
  }
}