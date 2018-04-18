'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudTrace')) {
    return require('@google-cloud/trace-agent').start(config.get('cloudTrace'))
  }

  return {
    runInRootSpan: () => null,
    createChildSpan: () => ({
      addLabel: () => null,
      endSpan: () => null
    })
  }
})()
