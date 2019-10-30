'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudDebug')) {
    const debugAgent = require('@google-cloud/debug-agent')
    return debugAgent.start(config.get('cloudDebug'))
  }

  return {}
})()
