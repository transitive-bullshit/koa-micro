'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const alive = require('./alive')

describe('alive(ctx, next)', () => {
  const env = process.env

  before(() => {
    process.env = {
      APP_NAME: 'APP_NAME',
      REVISION: 'REVISION'
    }
  })

  after(() => {
    process.env = env
  })

  it('should set body correctly', async () => {
    const ctx = { path: '/foo' }
    const next = sinon.spy()

    await alive('/foo')(ctx, next)

    assert.deepEqual(next.called, false)
    assert.deepEqual(ctx.body, {
      name: 'APP_NAME',
      revision: 'REVISION',
      status: 'ok'
    })
  })

  it('should pass through', async () => {
    const ctx = { path: '/somethingcoolio' }
    const next = sinon.spy()

    await alive('/foo')(ctx, next)

    assert.deepEqual(ctx.body, undefined)
    assert.deepEqual(next.called, true)
  })
})
