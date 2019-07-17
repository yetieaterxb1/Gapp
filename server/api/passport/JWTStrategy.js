const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken');

const opts = config.passport.jwt
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken /*|| function(res){ return req.cookie.jwt }*/

module.exports = new JWTStrategy(
  opts,
  function(jwt_payload, done){
    // User.findOne({id: jwt_payload.id}, function(err, user) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          // Or create a new account
          return done(null, false);
      }
    })
    // if (Date.now() > jwt_payload.expires) {
    //   return done('jJWT expired.')
    // }
    // return done(null, jwtPayload)
  }
)

exports.signJWT - function(user, otps={ expiresIn: 36000 }){
  const payload = {
    id: user._id,
    // name: user.username
  }
  return new Promise(function(resolve, reject){
    jwt.sign(payload, secret, opts,
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