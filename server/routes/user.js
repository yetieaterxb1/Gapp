const express = require('express')
const passport = require('passport')

const router = express.Router()

router.route('/user')
  .get(passport.authenticate('jwt', { session: false }), function(req,res,next) { res.redirect('/#/user') })
  .post(passport.authenticate('jwt', { session: false }), function(req,res,next) { res.json({ message: 'Invalid username or password.'}) })

module.exports = router