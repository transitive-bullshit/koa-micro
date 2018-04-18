'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const assertParam = require('./assert-param')

describe('ctx.assertParam(obj, name)', () => {
  const ctx = { assert: sinon.spy() }

  it('should call assert correctly', () => {
    assertParam.call(ctx, 'obj', 'foo')
    assert.deepEqual(ctx.assert.args[0], [
      'obj', 400, 'Parameter "foo" is mandatory'
    ])
  })
})
