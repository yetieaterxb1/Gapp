const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const config = require('../../../config/config.js')

const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

const opts = config.passport.jwt
opts.jwtFromRequest = ExtractJwt.fromExtractors([ExtractJwt.fromHeader('authorization'), cookieExtractor])

exports.Strategy = [
  'jwt',
  new JwtStrategy(
    opts,
    function(jwt_payload, done){
      User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
          if (Date.now() > jwt_payload.expires) {
            return done('jJWT expired.')
          }
          return done(null, user)
        } else {
            // Or create a new account
            return done(null, false)
        }
      })
      
    }
  )
]


exports.signJWT = function(user, secret = config.jwt.secret, otps = config.jwt.opts){
  const payload = {
    id: user._id,
  }
  return new Promise(function(resolve, reject){
    jwt.sign(payload, secret,
      function(err, token) {
      if (err) {
        reject({ error: err, success: false, token: null })
      }else{
        resolve({ 
          error: null,
          success: true,
          token: token
        })
      }
    })  
  })
}



// exports.authenticateJWT = function(req, res, next){
//   return passport.authenticate('jwt', {session: false})(req, res, next)
// }

