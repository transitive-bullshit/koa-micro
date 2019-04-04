'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudTrace')) {
    const traceAgent = require('@google-cloud/trace-agent')
    if (typeof traceAgent.start === 'function') {
      return traceAgent.start(config.get('cloudTrace'))
    }
  }

  return {
    runInRootSpan: () => null,
    createChildSpan: () => ({
      addLabel: () => null,
      endSpan: () => null
    })
  }
})()
