'use strict'

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

  await next()
}
