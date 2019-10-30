'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudTrace')) {
    const traceAgent = require('@google-cloud/trace-agent')

    return traceAgent.start({
      ignoreUrls: [/^\/consumers\/projects\/.*/],
      ignoreMethods: ['options'],
      ...config.get('cloudTrace')
    })
  }

  return {
    runInRootSpan: () => null,
    createChildSpan: () => ({
      addLabel: () => null,
      endSpan: () => null
    })
  }
})()
