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
      const ratings = req.body.ratings
      const created = new Date(Date.now())
      const project = {
        name: name,
        created: created,
        updated: created,
        ratings: ratings
      }
      return User.findByIdAndUpdate(
        userId,
        { $push: {projects: project} },
        { new: true, safe: true },
        function(err, user){
          if(err){
            res.status(500).json({ message: 'Internal Server error.' })
          }else if(user){
            res.status(302).json({ message: 'Success.', data: user.projects })
          }else{
            res.status(201).json({ message: 'A project with name ' + name + ' already exists.' })
          }
        }
      )
    }
    case 'delete': {
      const user = req.user
      const body = req.body
      const userId = user._id
      const projId = body.id
      if( !userId || !projId ) { return next() }
      return User.findOne( 
        { _id: userId },
        (err, user) => {
          if(err) return res.status(500).json({ message: 'Internal Server error.' })
          if(!user) return res.status(409).json({ message: 'Project not found.' })
          user.projects.id(projId).remove()
          user.save((err, doc) => {
            const projects = doc.projects
            if(!err && projects) return res.status(200).send({ message: 'Success.', data: projects })
            res.status(500).json({ message: 'Internal Server error.' })
          })
        }
      )
    }
  }
}

module.exports = {
  profileController: profileController,
  projectController: projectController
}
