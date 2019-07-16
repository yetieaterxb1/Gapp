const app = require('./express')
const config = require('../config/config')

const splashRouter = require('./routes/auth')
const authRouter = require('./routes/auth')

app.use(splashRouter)
app.use(authRouter)

app.use('/*', (req, res, next) => {
  console.log('GET /')
  console.log(req.isAuthenticated())
  console.log(req.sessionID)
  console.log(req.user)
  next()
})

// app.use((err, req, res, next) => {
//   res.sendStatus(520).json({"error" : err.name + ": " + err.message})
// })

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

