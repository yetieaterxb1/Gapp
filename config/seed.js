require('regenerator-runtime/runtime')

const csvtojson= require('csvtojson')

const User = require('../server/models/User.js'),
      Rating = require('../server/models/Rating.js'),
      Strain = require('../server/models/Strain.js')

const RATINGS_CSV_PATH = './devdata/ratings.csv'
const STRAINS_CSV_PATH = './devdata/strains.csv'
const PARSER_PARAMS = { noheader:false, trim:true, flatKeys: true, checkType: true }

async function clearCollection(Model, clear=true){
  let result
  if(clear){
    result = await Model.deleteMany({})
  }else{
    result = clear
  }
  return(result)
}


exports.User = function(clear, callback){
  const seeds = [
    {
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password'
    },
    {
      username: 'fake',
      email: 'fake@gmail.com',
      password: 'fake'
    },
    {
      username: 'fake1',
      email: 'fake1@gmail.com',
      password: 'fake1'
    },
    {
      username: 'fake2',
      email: 'fake2@gmail.com',
      password: 'fake2'
    }
  ]
  clearCollection(User, clear).then(function(){
    User.create(seeds, callback)
  })
}


async function getUserIDs(model, nUserIDs, idField='_id'){
  const uids = await model.find({}, idField, { limit: nUserIDs })
  return(uids)
}

async function updateUserIDs(userIDs, csvPath, parserParams, idCol = 'User'){
  const asArray = await csvtojson(parserParams).fromFile(csvPath)
  const updatedArray = asArray.map(function(obj){
    obj[idCol] = userIDs[ parseInt(obj[idCol]) ]
    return(obj)
  })
  return(updatedArray)
}

exports.Rating = function(clear, callback){
  clearCollection(Rating, clear).then(function(){
    getUserIDs(User, 100)
    .then(function(userIDs){
      updateUserIDs(userIDs, RATINGS_CSV_PATH, PARSER_PARAMS)
        .then(function(jsonSeed){
          Rating.create(jsonSeed, callback)       
        })
    })
  })
}

exports.Strain = function(clear, callback){
  clearCollection(Strain, clear).then(function(){
    csvtojson(PARSER_PARAMS)
    .fromFile(STRAINS_CSV_PATH)
    .then(function(jsonObj){
      Strain.create(jsonObj, callback)
    })
  })
}

exports.seedAll = function(callback){
  Object.keys(exports).forEach(function(model){
    if(model !== 'seedAll'){
      exports[model](true, callback)
    }
  })
}
