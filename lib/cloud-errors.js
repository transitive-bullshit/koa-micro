'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudErrors')) {
    return require('@google-cloud/error-reporting')(config.get('cloudErrors'))
  }

  return {
    report: () => null
  }
})()
