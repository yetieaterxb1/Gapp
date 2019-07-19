// https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d

const bcrypt = require('bcrypt')
const User = require('../../models/User')
const LocalStrategy = require('passport-local').Strategy

exports.Strategy = [
'local',
  new LocalStrategy(function(username, password, done){
    User.findOne({username: username}, function(err, user){
      if(!err && user){
        user.authenticate(password).then(function(res) {
          if(res){
            done(null, user)
          }else{
            done(null, false, { message: 'Wrong password' })
          }
        })
      }else{
        return(done(err, false, { message: 'Error finding user ' + username }))
      }
    })
  })
]
