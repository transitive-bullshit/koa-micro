'use strict'

const { getClientIp } = require('request-ip')
const config = require('../config')

module.exports = (logger) => async (ctx, next) => {
  const {
    // request metadata
    method,
    path
  } = ctx

  try {
    ctx.realIP = getClientIp(ctx.request)
  } catch (err) {
    ctx.realIP = ctx.ip
  }

  const ip = ctx.realIP

  const defaultLogLevel =
    path === config.get('api.healthCheckPath') ? 'verbose' : 'info'

  logger[defaultLogLevel]('pre-access', {
    ip,
    method,
    path
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
    ip,

    // request metadata
    method,
    path,

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
