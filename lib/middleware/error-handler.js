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
      console.error(err)

      ctx.err = err
      ctx.status = err.status || err.statusCode || 500

      if (!this.isStream) {
        const body = {
          success: false,
          url: ctx.url,
          path: ctx.path,
          method: ctx.method,
          error: err.message,
          status: ctx.status,
          errors: ctx.errors
        }

        if (exposeStackTraces && err.stack) {
          body.stack = err.stack.split('\n')
        }

        ctx.body = body
      }

      if (ctx.status >= 500) {
        logger.error(ctx.status, ctx.body)
        cloudErrors.report(ctx.err, ctx.req, ctx.body)
      }
    }
  }
}
