'use strict'

const assert = require('chai').assert
const request = require('request-promise-native').defaults({ json: true })
const app = require('./')()

describe('app()', () => {
  let server

  before((done) => { server = app.listen(5002, done) })
  after((done) => server.close(done))

  it('should listen', async () => {
    const response = await request.get({
      uri: 'http://localhost:5002',
      resolveWithFullResponse: true,
      simple: false
    })

    assert.equal(response.statusCode, 404)
  })
})
