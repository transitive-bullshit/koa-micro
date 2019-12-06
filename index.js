'use strict'

// setup optional process-level cloud error handling and tracing
require('./lib/process-setup')

const Koa = require('koa')
const qs = require('koa-qs')
const compress = require('koa-compress')
const middleware = require('./lib/middleware')
const context = require('./lib/context')
const logger = require('./lib/logger')
const config = require('./lib/config')

module.exports = () => {
  const app = qs(new Koa())

  app.context.assertFound = context.assertFound
  app.context.assertParam = context.assertParam
  app.context.success = context.success

  app.use(middleware.accessLogs(logger))
  app.use(middleware.responseTime())
  app.use(
    middleware.errorHandler({
      exposeStackTraces: config.get('api.exposeStackTraces')
    })
  )
  app.use(middleware.cors())
  app.use(middleware.options())
  app.use(compress())
  app.use(middleware.alive(config.get('api.healthCheckPath')))

  return app
}

module.exports.logger = logger
