const express = require('express')
const signup = require('../controllers/auth.js').signup
const login = require('../controllers/auth.js').login
const logout = require('../controllers/auth.js').logout
const isAuthenticated = require('../controllers/auth.js').isAuthenticated

const router = express.Router()

router.route('/login')
  .get((req,res,next)=>{
  })
  .post(login)

router.route('/logout')
  .get(logout)
  .post(logout)

router.route('/signup')
  .post(signup)

module.exports = router