const R = require('r-script')
const config = require('../../../config/config.js')

DEFAULT_PATH = config.budr.path.rpath

function Budr(path=DEFAULT_PATH) {
  this.path = path
  this.R = R(path)
  this.predict = function(data){ return this.R.data(data) }
  Object.defineProperty(this, 'path', {
    set(value) {
      this.path = value
      this.R = R(value)
    }
  })
}

module.exports = Budr