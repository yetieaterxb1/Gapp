const User = require('../models/User')

function isAuthenticated(req, res, next) {
  return req.isAuthenticated() ?
    next() :
    res.redirect('/login');
}

function login(req, res, next){
  const userCreds = {
    username: req.body.username,
    password: req.body.password
  }
  req.login(userCreds)
}

function logout(req, res, next){
  req.logout()
}

function signup(req,res,next){  
  const userCreds = {
    username:req.body.username, 
    password:req.body.password
  }
  User.findOne({ username: userCreds.username }, function(err, user){
    if(err){
      return done(err)
    }
    if(!user){
      var user = new User(userCreds)
      user.save()
      req.login(userCreds, function(err){
        if (err) { return next(err); }
        console.log('Is authed ' + req.isAuthenticated())
        res.status(200).json({message: 'Signup successful'})
      })
    }
  })
}

module.exports = {
  isAuthenticated,
  login,
  logout,
  signup
}