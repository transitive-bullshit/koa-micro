'use strict'

module.exports = () => async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 200
  } else {
    await next()
  }
}
