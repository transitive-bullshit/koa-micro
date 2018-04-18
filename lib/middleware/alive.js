'use strict'

module.exports = (path) => async (ctx, next) => {
  if (ctx.path !== path) {
    return next()
  }

  ctx.body = {
    name: process.env.APP_NAME,
    revision: process.env.REVISION,
    status: 'ok'
  }
}
