'use strict'

const cloudErrors = require('../cloud-errors')
const logger = require('../logger')

module.exports = (opts = {}) => {
  const { exposeStackTraces } = opts

  return async (ctx, next) => {
    try {
      await next()

      if (undefined === ctx.status && !ctx.isStream) {
        ctx.throw(404)
      }
    } catch (err) {
      ctx.err = err
      ctx.status = err.status || err.statusCode || 500

      if (!this.isStream) {
        ctx.body = {
          success: false,
          url: ctx.url,
          path: ctx.path,
          method: ctx.method,
          error: err.message,
          status: ctx.status,
          errors: ctx.errors
        }

        if (exposeStackTraces && err.stack) {
          ctx.body = Object.assign({ stack: err.stack.split('\n') }, ctx.body)
        }
      }

      if (ctx.status >= 500) {
        logger.error(ctx.status, ctx.body)
        cloudErrors.report(ctx.err, ctx.req, ctx.body)
      }
    }
  }
}
