const express = require('express')
const passport = require('passport')

const strainController = require('../controllers/bud.js').strainController
const predictController = require('../controllers/bud.js').predictController

const router = express.Router()

router.route('/api/strains')
  .get(
    passport.authenticate('jwt', { session:false }),
    strainController
  )

router.route('/api/predict')
  .post(
    passport.authenticate('jwt', { session:false }),
    predictController
  )

module.exports = router