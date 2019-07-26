const mongoose = require('mongoose')
const csvtojson= require('csvtojson')
const path = require('path')

const config = require('../../config/config.js')


const STRAINS_CSV_PATH = path.join(config.root, '/devdata/strains.csv')
const PARSER_PARAMS = {
  noheader:false,
  trim:true,
  flatKeys: true,
  checkType: true
}

async function getRowConstructors(csvPath, parserParams){
  const asArray = await csvtojson(parserParams).fromFile(csvPath) 
  const constructors = asArray.map(function(obj){
    // Should just use Object.entries, but I'm not refactoring because its inconsequential
    const tmpObj = {}
    Object.keys(obj).forEach(function(key){
      const val = obj[key]
      tmpObj[key] = val.constructor
    })
    return(tmpObj)
  })
  return(constructors) // E.g. when matrix has uniform types in each column [{a:String, b:Number}, {a:String, b:Number}] or if matrix is non-uniform [{a:String, b:Number}, {a:Number, b:Number}]
}

const columnConstructors = getRowConstructors(STRAINS_CSV_PATH, PARSER_PARAMS)[0] // For now, just assume all rows have the same type in each column (i.e. the matrix is uniform)

const strainSchema = new mongoose.Schema(columnConstructors)
const Strain = mongoose.model('Strain', strainSchema)

module.exports = Strain

exports.seed = function(){
  csvtojson(parserParams)
    .fromFile(csvPath)
    .then(function(jsonObj){
      Strain.create(jsonObj)
    })
}