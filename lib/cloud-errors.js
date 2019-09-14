'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudErrors')) {
    const errorReporting = require('@google-cloud/error-reporting')
    if (typeof errorReporting === 'function') {
      // return errorReporting(config.get('cloudErrors'))
    } else if (typeof errorReporting.start === 'function') {
      // return errorReporting.start(config.get('cloudErrors'))
    }
  }

  return {
    report: () => null
  }
})()
