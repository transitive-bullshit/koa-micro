'use strict'

const config = require('../config')

module.exports = (logger) => async (ctx, next) => {
  await next()

  const {
    // host metadata
    ip,

    // request metadata
    method,
    path,
    url,

    // private response metadata
    responseTime,
    err,
    errors,

    // public response metadata
    status
  } = ctx

  const defaultLogLevel = path === config.get('api.healthCheckPath') ? 'verbose' : 'info'
  const logLevel = ctx.status < 500 ? defaultLogLevel : 'error'

  const payload = JSON.parse(JSON.stringify({
    // host metadata
    env: process.env.NODE_ENV,
    revision: process.env.REVISION,
    app: process.env.APP_NAME,
    ip,

    // request metadata
    method,
    url,

    // private response metadata
    responseTime,

    // public response metadata
    status
  }))

  if (ctx.status >= 400) {
    payload.error = err && err.toString()
    payload.errors = errors

    if (err) {
      logger.log(logLevel, err)
    }
  }

  logger.log(logLevel, payload)
}
