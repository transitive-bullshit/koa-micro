'use strict'

const assert = require('chai').assert
const delay = require('delay')
const responseTime = require('./response-time')

describe('responseTime(ctx, next)', () => {
  it('should set context and headers', async () => {
    const ctx = {
      set: (header, value) => { ctx.headers[header] = value },
      headers: {}
    }

    await responseTime()(ctx, () => delay(10))

    assert.closeTo(ctx.responseTime, 10, 5)
    assert.deepEqual(ctx.headers['X-Response-Time'], `${ctx.responseTime}ms`)
  })
})
