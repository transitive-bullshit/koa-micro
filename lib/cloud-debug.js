'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudDebug')) {
    return require('@google-cloud/debug-agent').start(config.get('cloudDebug'))
  }

  return {}
})()
