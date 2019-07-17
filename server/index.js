const app = require('./express')
const config = require('../config/config')

const splashRouter = require('./routes/auth')
const authRouter = require('./routes/auth')

app.use(splashRouter)
app.use(authRouter)

app.use('/*', function(err, req, res, next){
  if(!res.headerSent)
    res.status(520).json({"error" : err.name + ": " + err.message})
})

app.listen(config.port, () => console.log(`Listening on port ${config.port}`))

