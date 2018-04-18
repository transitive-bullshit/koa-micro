'use strict'

const assert = require('chai').assert
const cors = require('./cors')

describe('cors(ctx, next)', () => {
  const ctx = {
    get: (header) => header,
    set: (header, value) => { ctx.headers[header] = value },
    headers: {}
  }

  it('should set cors headers correctly', () => {
    cors()(ctx, () => null)

    assert.deepEqual(ctx.headers, {
      'access-control-allow-origin': 'origin',
      'access-control-allow-methods': 'access-control-request-method',
      'access-control-allow-headers': 'access-control-request-headers',
      'access-control-allow-credentials': false,
      'access-control-max-age': 0
    })
  })
})
