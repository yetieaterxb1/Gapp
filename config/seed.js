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

function makeRandomString(minLen, maxLen){
  const alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  const iter = Math.ceil(Math.random() * maxLen)
  let randomString = ''
  for(let i = minLen; i<=maxLen; i++){
    randomString = randomString + alpha[Math.floor(Math.random() * alpha.length)]
  }
  return randomString
}

function makeRandomUsers(nUsers){
  const arroba = ['@gmail.com','@hotmail.com', '@yahoo.com', '@ru.com']
  const randomUsers = Array.from({length: nUsers}).map(function(x){
    return {
      username: makeRandomString(3, 20),
      email: makeRandomString(3, 20) + arroba[1],/*arroba[ Math.floor(Math.random() * arroba.length) ],*/
      password: 'password'
    }
  })
  return randomUsers
}

exports.User = function(clear, callback){
  const admin = [{
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'password'
    }]
  const seeds = makeRandomUsers(100).concat(admin)
  clearCollection(User, clear).then(function(){
    User.create(seeds, callback)
  })
}

async function getUserIDs(model, nUserIDs, idField='_id'){
  const uids = await model.find({}, idField, { limit: nUserIDs })
  return(uids)
}

async function updateUserIDs(userIDs, csvPath, parserParams, idCol='User'){
  const asArray = await csvtojson(parserParams).fromFile(csvPath)
  const updatedArray = asArray.map(function(obj){
    obj[idCol] = userIDs[ parseInt(obj[idCol]) ]
    return(obj)
  })
  return(updatedArray)
}

async function getStrainIDs(model, nStrainIDs, idField='_id'){
  const sids = await model.find({}, idField, { limit: nStrainIDs })
  return(sids)
}

async function updateStrainIDs(strainIds, csvPath, parserParams, idCol='Strain'){
  const asArray = await csvtojson(parserParams).fromFile(csvPath)
  const updatedArray = asArray.map(function(obj){
    obj[idCol] = strainIds[ parseInt(obj[idCol]) ]
    return(obj)
  })
  return(updatedArray)
}

exports.Rating = function(clear, callback){
  clearCollection(Rating, clear).then(function(){
    getUserIDs(User, 100)
    .then(function(userIDs){
      updateUserIDs(userIDs, RATINGS_CSV_PATH, PARSER_PARAMS)
        .then(function(/*jsonSeed*/ userUpdate){
          getStrainIDs(Strain, 100).then(function(strainIDs){
            updateStrainIDs(strainIDs, RATINGS_CSV_PATH, PARSER_PARAMS)
              .then(function(/*jsonSeed*/ strainUpdate){
                const seed = strainUpdate
                for(i in seed){
                  const user = userUpdate[i].User
                  const strain = strainUpdate[i].Strain
                  if(user && strain){
                    seed[i].User = user._id
                    seed[i].Strain = strain._id
                  }
                }
                Rating.create(seed, callback) 
              })  
          })
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
