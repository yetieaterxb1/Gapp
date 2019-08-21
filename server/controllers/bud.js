const async = require('async')

const Budr = require('../api/budr')
const Strain = require('../models/Strain')
const Rating = require('../models/Rating')

// const budr = new Budr()

function genEnsembleArgs(req){
  return {
    dist: {
      doMap: function(parms, item, done){
        const likedIds = req.body.project.likedIds
        Strain.find({_id: { $in: likedIds }}, '-Name -__v', function(err, strains){
          Strain.find({}, '-Name -__v', function(err, dfc){
            const budr = new Budr()
            budr.predict({
              model: item,
              dfc: dfc,
              userStrains: strains
            }).call(function(err, data){
              console.log('R result: ' + item + ': ', data)
              console.log('R error: ' + item + ': ', err ? err.toString() : null)
              done(null, data)
            })
          })
        })
      },
      parms: {

      }
    },
    kmr: {
      doMap: function(parms, item, done){
        const id = req.user._id
        Strain.find({}, '-Name -__v', function(err, dfc){
          Rating.find({}, '-Name -__v', function(err, dfr){
            const budr = new Budr()
            budr.predict({
              model: item, 
              dfc: dfc, 
              dfr: dfr,
              id: id
            }).call(function(err, data){
              console.log('R result: ' + item + ': ', data)
              console.log('R error: ' + item + ': ', err ? err.toString() : null)
              done(null, data)
            })
          })
        })
      },
      parms: {

      }
    }
  }
}

function mapModels(models=['dist', 'kmr'], args, callback){
  const iter = function(item, done){ 
    const doMap = args[item].doMap
    const parms = args[item].parms
    doMap(parms, item, done)
  }
  return async.map(models, iter, callback)
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

const strainController = function(req, res, next){
  const params = req.body.params || {}
  let method = 'find', 
      query = {}, 
      project = {}, 
      options = {}, 
      callback = genCallback(req, res, next)
  if(params.id){
    method = 'findById'
    query = params.id
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
  const ensemble = Array.isArray(model) ? model : model.split(',')
  console.log(ensemble)
  if(ensemble){
    const eargs = genEnsembleArgs(req)
    mapModels(ensemble, eargs)
      .then(function(data){
        // No error is thrown here.
        genCallback(req, res, next)(false, data)
      })
      .catch(function(err){
        // The async.map call inside of mapModels throws an error even when async.map([1,2,3], (item, done)=>{ done(true) }).
        // I think the async.map iterator must return a value rather than calling done(value), because I think done() is only used to pass errors.
        // The problem is that the r-script .call() method does not return a value for async.map to poulate its results.
        // The only solution I can think of is to use the r-script .callSync() method, which does return a value. I've not yet tested if this idea works.
        genCallback(req, res, next)(err, null)
      })
  }else{
    genCallback(req,res,next)(true, null)
  }
}

module.exports = {
  strainController: strainController,
  predictController: predictController,
  genCallback: genCallback
}
