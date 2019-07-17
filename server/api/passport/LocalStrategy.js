// https://medium.com/@evangow/server-authentication-basics-express-sessions-passport-and-curl-359b7456003d

const bcrypt = require('bcrypt')
const User = require('../../models/User')
const LocalStrategy = require('passport-local').Strategy

module.exports = LocalStrategy(function(username, password, done){
  User.findOne({username:username}, function(err,user){
    if(!err && user){
      console.log('User findOne !err && user')
      new Promise(function(resolve, reject){
        bcrypt.compare(password, user.password, function(err, res) {
          if(!err){
            if(res===true){
              resolve(res)
            }else{
              reject('Wrong password')
            }
          }else{
            reject(err)
          }
        })
      }).then(function(err, q){
        if(!err && q){
          return(done(null, user))
        }else{
          return(done(null, false, {message: 'Wrong credentials:: ' + err}))
        }
      })
    }else{
      return(done(null,false, { message: 'Wrong credentials'  + err}))
    }
  })
})
