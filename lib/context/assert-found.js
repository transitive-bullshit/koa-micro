'use strict'

module.exports = function assertFound (obj, type, query) {
  this.assert(obj, 404, `${type} not found [${query}]`)
}
