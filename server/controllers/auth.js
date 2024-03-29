const User = require('../models/User')

function login(req, res, next){
  const isAuthed = req.isAuthenticated()
  if(isAuthed){
    req.signJWT(req.user)
      .then(function(result){
        const response = {
          jwt: result,
          isAuthenticated: isAuthed,
          username: req.user.username,
          message: 'Login successful.'
        }
        if(result.error){
          res.status(500).json(response) 
        }else{
          res.status(200).json(response)
        }
      })
      .catch(function(err){ 
        res.status(500).send()
      })
  }else{
    res.status(401).send({
      jwt: null,
      isAuthenticated: isAuthed || false,
      message: 'Incorrect username or password.'
    })
  }
}

function logout(req, res, next){
  req.logout()
  const isAuthed = req.isAuthenticated()
  if(isAuthed){
    res.status(500).json({ isAuthentiated: isAuthed, message: 'Logout NOT successful.' })
  }else{
    res.status(205).json({ isAuthentiated: isAuthed, message: 'Logout successful.' })
  }
}

function signup(req,res,next){ 
  const creds = {
    email: req.body.email,
    username: req.body.username, 
    password: req.body.password
  }
  User.findOne({$or: [ {email: creds.email}, {username: creds.username} ]}, function(err, user){
    if(err){
      next(err)
    }else if(!user){
      const user = new User(creds)
      user.save(function(err, doc, num) {
        if(!err){
          req.login(creds, function(err){
            const isAuthed = req.isAuthenticated()
            if (err) { 
              next(err) 
            }else{
              req.signJWT(req.user)
              .then(function(result){
                const response = {
                  jwt: result,
                  isAuthenticated: isAuthed,
                  username: req.user.username,
                  message: 'Signup successful.'
                }
                if(result.error){
                  res.status(500).json(response)
                }else{
                  res.status(200).json(response)
                }
              }).catch(function(err){ 
                res.status(500).send()
              })
            }
          })
        }else{
          res.status(200).json({ message: 'Signup unsuccessful.' })
        }
      })  
    }else{
      const clash = creds.email === user.email ? 'email' : 'username'
      res.status(409).json({ message: 'That ' + clash  + ' already exists' })
    }
  })
}

module.exports = {
  login,
  logout,
  signup
}