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
    const tmpObj = {}
    Object.keys(obj).forEach(function(key){
      const val = obj[key]
      tmpObj[key] = val.constructor
    })
    return(tmpObj)
  })
  return(constructors) // E.g. when matrix has uniform types in each column [{a:String, b:Number}, {a:String, b:Number}] or if matrix is non-uniform [{a:String, b:Number}, {a:Number, b:Number}]
}

const strainSchema = new mongoose.Schema({}, {strict: false})
const Strain = mongoose.model('Strain', strainSchema)

module.exports = Strain


