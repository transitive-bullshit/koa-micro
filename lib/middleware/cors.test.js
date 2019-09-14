'use strict'

const assert = require('chai').assert
const cors = require('./cors')

describe('cors(ctx, next)', () => {
  const ctx = {
    vary: () => null,
    get: (header) => header,
    set: (header, value) => { ctx.headers[header] = value },
    method: 'OPTIONS',
    headers: {}
  }

  it('should set cors headers correctly', () => {
    cors()(ctx, () => Promise.resolve())

    assert.deepEqual(ctx.headers, {
      'Access-Control-Allow-Headers': 'Access-Control-Request-Headers',
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,POST,DELETE,PATCH',
      'Access-Control-Allow-Origin': 'Origin'
      /*
      'access-control-allow-origin': 'origin',
      'access-control-allow-methods': 'access-control-request-method',
      'access-control-allow-headers': 'access-control-request-headers',
      'access-control-allow-credentials': false,
      'access-control-max-age': 0
      */
    })
  })
})
