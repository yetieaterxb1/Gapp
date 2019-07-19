const User = require('../models/User')

function login(req, res, next){
  const userCreds = {
    username: req.body.username,
    password: req.body.password
  }
  req.login(userCreds, function(err){
    const isAuthed = req.isAuthenticated()
    if(err){
      next(err)
    }else if(isAuthed){
      req.signJWT(req.user)
      .then(function(result){
        const response = {
          jwt: result,
          isAuthenticated: isAuthed,
          message: 'Login successful.'
        }
        if(result.error){
          res.status(500).json(response) // User is logged in but cant be tokenized...?
        }else{
          res.status(200).json(response)
        }
      }).catch(function(err){ console.error(err) })
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
  console.log('LOGOUT')
  req.logout()
  const isAuthed = req.isAuthenticated()
  if(isAuthed){
    res.status(500).json({isAuthentiated: isAuthed, message: 'Logout NOT successful.'})
  }else{
    res.status(205).json({isAuthentiated: isAuthed, message: 'Logout successful.'})
  }
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
        if (err) { return next(err) }
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