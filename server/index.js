const app = require('./express')

const config = require('../config/config')

const signJWT = require('./api/passport/JWTStrategy.js').signJWT

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const apiRouter = require('./routes/bud')

app.use('/*', function(req, res, next){
  req.signJWT = signJWT
  next()
})

app.use(authRouter)
app.use(userRouter)
app.use(apiRouter)

app.use('/*', function(err, req, res, next){
  console.error(err, '\n END')
  if(!res.headerSent)
    res.status(520).json({"error" : err.name + ": " + err.message})
})

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

