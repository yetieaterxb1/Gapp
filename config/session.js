// const Keygrip = require('keygrip')
// const randomstring = require('randomstring')



// export default {
//   keys: new Keygrip(['SEKRIT2', 'SEKRIT1'], 'sha256', 'hex'),
//   // secret: randomstring.generate(),
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: expiryDate,
//     maxAge: 10 ** 6
//   }
// }

let expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
const genuuid = require('uid-safe')
const randomstring = require('randomstring')

module.exports = function(mongoose, mongoStore){
  return(
    {
      secret: randomstring.generate(),
      genid: function(req) {
        return genuuid(10) // use UUIDs for session IDs
      },
      resave: false,
      saveUninitialized: true,
      cookie: {
          expires: 600000
      },
      store: new mongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions' // default
      })
    }
  )
}