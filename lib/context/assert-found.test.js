'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const assertFound = require('./assert-found')

describe('ctx.assertFound(obj, type, query)', () => {
  const ctx = { assert: sinon.spy() }

  it('should call assert correctly', () => {
    assertFound.call(ctx, 'obj', 'Type', 'query')
    assert.deepEqual(ctx.assert.args[0], [
      'obj', 404, 'Type not found [query]'
    ])
  })
})
