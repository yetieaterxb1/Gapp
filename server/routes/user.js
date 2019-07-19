const express = require('express')
const isAuthenticated = require('passport').isAuthenticated
const 

const router = express.Router()

router.route('/user/:username')
  .get(isAuthenticated, (req,res,next)=>{
    
  })

module.exports = router