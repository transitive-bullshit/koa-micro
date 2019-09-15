'use strict'

module.exports = require('@koa/cors')

/*
module.exports = () => async (ctx, next) => {
  if (ctx.get('origin')) {
    ctx.set('access-control-allow-origin', ctx.get('origin'))
  }

  if (ctx.get('access-control-request-method')) {
    ctx.set('access-control-allow-methods', ctx.get('access-control-request-method'))
  }

  if (ctx.get('access-control-request-headers')) {
    ctx.set('access-control-allow-headers', ctx.get('access-control-request-headers'))
  }

  ctx.set('access-control-allow-credentials', false)
  ctx.set('access-control-max-age', 0)

  if (ctx.method === 'OPTIONS') {
    // preflight request
    ctx.status = 204
    return
  }

  await next()
}
*/
