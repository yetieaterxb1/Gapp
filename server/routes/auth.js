const express = require('express')
const passport = require('passport')

const signup = require('../controllers/auth.js').signup
const login = require('../controllers/auth.js').login
const logout = require('../controllers/auth.js').logout


const router = express.Router()

router.route('/login')
  .get(function(req, res){ res.redirect('/#/login') })
  .post(
    passport.authenticate('local', { session:false }), 
    login
  )

router.route('/logout')
  .get(logout)
  .post(logout)

router.route('/signup')
  .post(signup)

module.exports = router

