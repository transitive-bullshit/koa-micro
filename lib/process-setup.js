'use strict'

const config = require('./config')
const logger = require('./logger')

const cloudErrors = require('./cloud-errors')
require('./cloud-trace')
require('./cloud-debug')

module.exports = () => {
  if (!config.get('api.enableProcessHooks')) return

  const onUncaughtException = (err) => {
    console.error(err)

    logger.error({
      env: process.env.NODE_ENV,
      revision: process.env.REVISION,
      service: process.env.APP_NAME,
      error: err.toString(),
      stack: err.stack && err.stack.split('\n')
    })

    cloudErrors.report(err)
    setTimeout(() => process.exit(1), 5000)
  }

  process
    .on('unhandledRejection', onUncaughtException)
    .on('uncaughtException', onUncaughtException)

  process.on('warning', (warning) => {
    logger.warn({
      env: process.env.NODE_ENV,
      revision: process.env.REVISION,
      service: process.env.APP_NAME,
      warning
    })
  })
}
