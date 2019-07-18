const passport = require('passport')

const app = require('./express')

const config = require('../config/config')

const signJWT = require('./api/passport/JWTStrategy.js').signJWT

const  login = require('./controllers/auth').login
const  logout = require('./controllers/auth').logout
const  signup = require('./controllers/auth').signup

app.use('/*', function(req, res, next){
  console.log('Is Authed: ', req.isAuthenticated())
  req.signJWT = signJWT
  next()
})

// app.get('/', function(req, res, next){
//   res.status(200).json({})
// })

app.get('/login', passport.authenticate('local', { session:true }), function(req,res){res.send()})
app.post('/login', login)

app.get('/logout', logout)

app.get('/signup', signup)


app.get('/user/:username', function(req,res,next) {
  console.log('USER: ', req.params.user)
  console.log('Is AUTHED: ', req.isAuthenticated())
  res.send()
})

app.use('/*', function(err, req, res, next){
  console.error(err, '\n END')
  if(!res.headerSent)
    res.status(520).json({"error" : err.name + ": " + err.message})
})

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

