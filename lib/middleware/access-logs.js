'use strict'

const config = require('../config')

module.exports = (logger) => async (ctx, next) => {
  const {
    // host metadata
    ip,

    // request metadata
    method,
    path,
    url
  } = ctx

  const defaultLogLevel =
    path === config.get('api.healthCheckPath') ? 'verbose' : 'info'

  logger[defaultLogLevel]('pre-access', {
    ip,
    method,
    path,
    url
  })

  await next()

  const {
    // private response metadata
    responseTime,
    err,
    errors,

    // public response metadata
    status
  } = ctx

  const logLevel = ctx.status < 500 ? defaultLogLevel : 'error'

  const payload = {
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
  }

  if (ctx.status >= 400) {
    if (err) {
      payload.error = err.message
    }

    if (errors) {
      payload.errors = errors
    }
  }

  logger[logLevel]('post-access', payload)
}
