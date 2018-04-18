'use strict'

const assert = require('chai').assert
const options = require('./options')

describe('options(ctx, next)', () => {
  it('should 200 if method is OPTIONS', async () => {
    const ctx = { method: 'OPTIONS' }
    await options()(ctx, () => { throw Error('bad!') })
    assert.deepEqual(ctx.status, 200)
  })

  it('should pass through for other requests', async () => {
    const ctx = { method: 'GET' }
    await options()(ctx, () => null)
    assert.deepEqual(ctx.status, undefined)
  })
})
