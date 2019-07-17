const express = require('express')
const isAuthenticated = require('passport').isAuthenticated
const 

const router = express.Router()

router.route('/user/:username')
  .get(isAuthenticated, (req,res,next)=>{
    console.log('USER: ', req.params.user)
    console.log('Is AUTHED: ', req.isAuthenticated())
    
  })

module.exports = router