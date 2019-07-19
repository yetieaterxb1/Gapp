const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const mongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const passport = require('passport')
const logger = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const glob = require('glob')
const path = require('path')

const config = require('../config/config')
const sessionConfig = require('../config/session')

const app = express()

app.use(express.static(config.static.dir, config.static.options))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())
app.use(helmet())
app.use(cors())

mongoose.connect(config.db.URI, config.db.connectionOpts)
mongoose.connection.once('open', () => console.log('MongoDB conection successful.'))
mongoose.connection.on('error', 
  console.error.bind(console, "MongoDB connection error: ")
  // throw new Error('Unable to connect to database at ' + config.db) 
)
app.use(session(sessionConfig(mongoose, mongoStore)))

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})
app.use(passport.initialize())
app.use(passport.session())
glob.sync('./api/passport/*.js').forEach( module => {
  const Strategy = require(path.join(config.root, '/server/api/passport/', module))
})

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  session.cookie.secure = true // serve secure cookies
}


passport.use(...require('../server/api/passport/JWTStrategy.js').Strategy)
passport.use(...require('../server/api/passport/LocalStrategy.js').Strategy)

app.passport = passport

module.exports = app
