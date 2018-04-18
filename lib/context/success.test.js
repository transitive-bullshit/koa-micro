'use strict'

const assert = require('chai').assert
const success = require('./success')

describe('ctx.success()', () => {
  const ctx = { }

  it('should call assert correctly', () => {
    success.call(ctx)
    assert.deepEqual(ctx.body, { success: true })
  })
})
