const express = require('express')
const budController = require('../controllers/bud.js').budController
const isAuthenticated = require('../controllers/auth.js').isAuthenticated

const router = express.Router()

router.route('/api/')
  .get(budController)