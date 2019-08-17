const express = require('express')
const passport = require('passport')

const profileController = require('../controllers/user.js').profileController
const projectController = require('../controllers/user.js').projectController

const User = require('../models/User')

const router = express.Router()

router.route('/user')
  .get(passport.authenticate('jwt', { session: false }), function(req,res,next) { res.redirect('/#/user') }) // Might handle authorization/authentication requests here
  .post(passport.authenticate('jwt', { session: false }), function(req,res,next) { res.json({ message: 'NULL'}) }) // Might handle authorization/authentication requests here

router.route('/user/profile')
  .get(
    passport.authenticate('jwt', { session: false }),
    profileController
  )

router.route('/user/project')
  .post(
    passport.authenticate('jwt', { session: false }),
    projectController
  )

module.exports = router