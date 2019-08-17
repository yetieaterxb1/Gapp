const async = require('async')

const Budr = require('../api/budr')
const Strain = require('../models/Strain')
const Rating = require('../models/Rating')

const budr = new Budr()

function genEnsembleArgs(req){
  return {
    dist: {
      doMap: function(parms, item, done){
        // TODO::
      },
      parms: {
        // TODO::
      }
    },
    kmr: {
      doMap: function(parms, item, done){
        // TODO::
        Strain.find({}, function(err, dfc){
          Rating.find({}, function(err, dfr){
            budr.predict({
              'kmr',
              dfc,
              dfr,
              req.user._id
            }).call(function(err, data){
              return err ? done(err) : done(data)
            })
          })
        })
      },
      parms: {
        // TODO::
      }
    }
  }
}

function mapModels(models=['dist', 'kmr'], args){
  const doMap = args[v].doMap
  const parms = args[v].parms
  const iter = function(item, done){ doMap(parms, item, done) }
  return new Promise(function(r, j){
    async.map(models, iter, function(err, data){
      if(!!err) return j(data)
      return r(err)
    })
  })
}

function oneModel(model){
  switch(model){
    case 'dist': {
      const likedIds = project.likedIds || strainIds
      Strain.find({_id: { $in: likedIds }}, function(err, userStrains){
        Strain.find({}, function(err, dfc){
          budr.predict({
            model,
            dfc,
            userStrains
          }).call(budrCallback)
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
          }).call(budrCallback)
        })
      })
    case 'vae':
      null
  }
}

function genCallback(req, res, next, errStatus=204, errMessage='Server error.', okStatus=302, okMessage='Query successful.') {
  return function(err, data){
    if(!err){
      res.status(okStatus).json({ mesage: okMessage, data: data })
    }else{
      res.status(errStatus).json({ message: errMessage, data: false })
    }
  }
}

function budrCallback(err, data){
  console.log('R STDERR:: ', err)
  console.log('R STDOUT:: ', data)
  if(err){
    genCallback(req,res,next)(err, null)
  }else{
    genCallback(req,res,next)(null, data)
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
  
  const ensemble = Array.isArray(model) || model.split(',')
  
  if(ensemble){
    // If model is a list of model types do...
    mapModels(model, ENSEMBLE_MODEL_ARGS)
    .then(function(data){
      genCallback(req, res, next)(false, data)
    })
    .catch(function(err){
      genCallback(req, res, next)(err, false)
    })
  }else{
    // If model is a single string do...
    oneModel(model)
  }
}

module.exports = {
  strainController: strainController,
  predictController: predictController,
  genCallback: genCallback
}
