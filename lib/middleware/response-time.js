'use strict'

module.exports = () => async (ctx, next) => {
  const start = Date.now()
  await next()
  ctx.responseTime = Date.now() - start

  if (!ctx.isStream) {
    ctx.set('X-Response-Time', `${ctx.responseTime}ms`)
  }
}
