'use strict'

const config = require('./config')

module.exports = (() => {
  if (config.get('cloudErrors')) {
    const { ErrorReporting } = require('@google-cloud/error-reporting')
    const errors = new ErrorReporting(config.get('cloudErrors'))

    return errors
  }

  return {
    event: () => ({
      setMessage: () => null,
      setUser: () => null
    }),
    report: () => null
  }
})()
