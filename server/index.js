const passport = require('passport')

const app = require('./express')

const config = require('../config/config')

const signJWT = require('./api/passport/JWTStrategy.js').signJWT

const  login = require('./controllers/auth').login
const  logout = require('./controllers/auth').logout
const  signup = require('./controllers/auth').signup

app.use('/*', function(req, res, next){
  req.signJWT = signJWT
  next()
})

app.get('/login', function(req,res){res.send()})
app.post('/login', passport.authenticate('local', { session:false }), login)

app.get('/logout', logout)

app.get('/signup', signup)

app.get('/user', 
  passport.authenticate('jwt', { session: false }), 
  function(req,res,next) {
    res.redirect('/#/user')
})
app.post('/user',
  passport.authenticate('jwt', { session: false }), 
  function(req,res,next) {
    res.json({ message: 'Invalid username or password.'})
})

app.use('/*', function(err, req, res, next){
  console.error(err, '\n END')
  if(!res.headerSent)
    res.status(520).json({"error" : err.name + ": " + err.message})
})

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

