'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudDebug')) {
    const debugAgent = require('@google-cloud/debug-agent')
    if (typeof debugAgent.start === 'function') {
      return debugAgent.start(config.get('cloudDebug'))
    }
  }

  return {}
})()
