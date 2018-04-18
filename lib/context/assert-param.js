'use strict'

module.exports = function assertParam (obj, name) {
  this.assert(obj, 400, `Parameter "${name}" is mandatory`)
}
