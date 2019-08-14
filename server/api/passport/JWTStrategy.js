const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../../models/User.js')

const config = require('../../../config/config.js')

const cookieExtractor = function(req) {
  let token = null
  if (req && req.cookies) token = req.cookies['jwt']
  return token;
}

const opts = config.passport.jwt
opts.jwtFromRequest = ExtractJwt.fromExtractors([ ExtractJwt.fromHeader('authorization'), cookieExtractor ])
exports.Strategy = [
  'jwt',
  new JwtStrategy(
    opts,
    function(jwt_payload, done){
      User.findOne({ _id: jwt_payload.id }, function(err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          if (Date.now() > jwt_payload.expires) {
            return done('JWT expired.', false)
          }
          return done(null, user)
        } else {
          return done(null, false)
        }
      })
    }
  )
]

exports.signJWT = function(user, secret = config.jwt.secret, opts = config.jwt.opts){
  const payload = {
    id: user._id,
    expires: opts.expires
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


