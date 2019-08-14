const User = require('../models/User')

function profileController(req, res, next){
  User.findOne({ _id: req.user._id }, '-password_hash').exec(function(err, user){
    if(err) res.status(203).json({ message: 'Internal Server error.' })
    if(!err && user){
      res.status(302).json({ message: 'Success.', data: user })
    }else{
      res.status(204).json({ message: 'User not found.' })
    }
  })
}

function projectController(req, res, next){
  const method = req.body.method
  switch(method){
    case 'create': {
      const userId = req.user._id
      const name = req.body.name
      if(!name) return next() // TODO:: send error status instead
      const created = new Date(Date.now())
      const project = {
        name: name,
        created: created,
        updated: created
      }
      return User.findByIdAndUpdate(
        userId,
        { $push: {projects: project} },
        { new: true },
        function(err, user){
          if(err){
            res.status(500).json({ message: 'Internal Server error.' })
          }else if(user){
            res.status(302).json({ message: 'Success.', data: user.projects })
          }else{
            res.status(203).json({ message: 'A project with name ' + name + ' already exists.' })
          }
        }
      )
    }
    case 'delete': {
      const userId = req.user._id
      const id = req.body.id
      if(!id) return next()
      return User.findByIdAndDelete( id, { new: true }, function(err, user){
          if(err){
            res.status(500).json({ message: 'Internal Server error.' })
          }else if(user){
            res.status(302).json({ message: 'Success.', data: user.projects })
          }else{
            res.status(203).json({ message: 'A project with name ' + name + ' already exists.' })
          }
        }
      )
    }
  }
}

module.exports = {
  profileController: profileController,
  projectController: projectController
}
