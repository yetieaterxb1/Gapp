const Budr = require('../api/budr')
const Strain = require('../models/Strain')
const Rating = require('../models/Rating')

const budr = new Budr()

function _genCallback(req, res, next, errStatus=204, errMessage='Server error.', okStatus=302, okMessage='Query successful.') {
  return function(err, docs){
    if(!err){
      res.status(okStatus).json({ mesage: okMessage, data: docs })
    }else{
      res.status(errStatus).json({ message: errMessage, data: null })
    }
  }
}

const strainController = function(req, res, next){
  let method = 'find', query = {}, project = {}, options = {}, callback = _genCallback(req, res, next) // If req.body.params == null --> run the query Strains.find({}) --> send resulting docs to client
  const params = req.body.params || {}
  if(params.id){
    method = 'findById'
    query = params.id
    callback = genCallback(req, res, next)
  } else if(params.name){
    method = 'find'
    query = { Name: params.name }
    project = '_id'
  } else if(params.query || params.options){
    method = 'find'
    if(params.query) query = params.query 
    if(params.options) options = params.options
  }
  Strain[method](query, project, options, callback)
}

const predictController = function(req, res, next){
  const model = req.body.model
  const project = req.body.project
  const strainIds = req.body.strainIds
  const userId = req.user._id
  const predictCallback = function(err, out){
    console.log('R STDERR:: ', err)
    console.log('R STDOUT:: ', out)
    if(err){
      res.status(204).json({ message: 'Server error.', data: null })
    }else{
      res.status(302).json({ message: 'Success.', data: out })
    }
  }
  switch(model){
    case 'dist': {
      const likedIds = project.likedIds || strainIds
      Strain.find({_id: { $in: likedIds }}, function(err, userStrains){
        Strain.find({}, function(err, dfc){
          budr.predict({
            model,
            dfc,
            userStrains
          }).call(predictCallback)
        })
      })
    }
    case 'knn':
      null
    case 'kmr':
      Strain.find({}, function(err, dfc){
        Rating.find({}, function(err, dfr){
          budr.predict({
            model,
            dfc,
            dfr,
            userId
          }).call(predictCallback)
        })
      })
    case 'vae':
      null
  }
}

module.exports = {
  strainController: strainController,
  predictController: predictController
}
