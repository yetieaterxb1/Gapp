const mongoose = require('mongoose')
const csvtojson= require('csvtojson')

async function getRowConstructors(csvPath, parserParams){
  const asArray = await csvtojson(parserParams).fromFile(csvPath) 
  const constructors = asArray.map(function(obj){
    const tmpObj = {}
    Object.keys(obj).forEach(function(key){
      const val = obj[key]
      tmpObj[key] = val.constructor
    })
    return(tmpObj)
  })
  return constructors
}

const ratingSchema = new mongoose.Schema({}, {strict: false})
const Rating = mongoose.model('rating', ratingSchema)

module.exports = Rating



