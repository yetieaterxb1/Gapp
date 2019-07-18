const User = require('../models/User')

function login(req, res, next){
  console.log('LOGIN', req.isAuthenticated())
  const userCreds = {
    username: req.body.username,
    password: req.body.password
  }
  req.login(userCreds, function(err){
    console.log(err)
    const isAuthed = req.isAuthenticated()
    if(err){ 
      next(err)
    }else if(isAuthed){ 
      req.signJWT(req.user)
      .then(function(result){
        console.log('JWT Result:', result)
        console.log('Is Authed:', isAuthed)
        const response = {
          jwt: result,
          isAuthenticated: isAuthed,
          message: 'Login successful.'
        }
        if(result.error){
          res.status(500).send(response) // User is logged in but cant be tokenized...?
        }else{
          res.status(200).send(response)
        }
      }).catch(function(err){console.error(err)})
    }else{
      res.status(401).send({
        jwt: null,
        isAuthenticated: isAuthed,
        message: 'Incorrect username or password.'
      })
    }
  })
}

function logout(req, res, next){
  console.log('LOGOUT', req.isAuthenticated())
  const isAuthed = req.isAuthenticated()
  console.log('req.logout', req.logout())
  if(isAuthed){
    res.status(500).json({isAuthentiated: isAuthed, message: 'Logout NOT successful.'})
  }else{
    res.status(205).json({isAuthentiated: isAuthed, message: 'Logout successful.'})
  }
  console.log(req.isAuthenticated)
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
        res.status(200).json({message: 'Signup successful'})
      })  
    }else{
      res.status(200).json({message: 'That user already exists'})
    }
  })
}

module.exports = {
  login,
  logout,
  signup
}