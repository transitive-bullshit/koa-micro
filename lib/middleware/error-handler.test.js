'use strict'

const assert = require('chai').assert
const errorHandler = require('./error-handler')

describe('errorHandler(ctx, next)', () => {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = ''

  it('should 404 if status is not set', async () => {
    const ctx = {
      throw: (code) => {
        const err = new Error()
        err.status = code
        throw err
      }
    }

    await errorHandler()(ctx, () => null)
    assert.deepEqual(ctx.status, 404)
    assert.deepEqual(ctx.body.status, 404)
  })

  it('should 500 if next() throws with no status', async () => {
    const ctx = {}
    await errorHandler()(ctx, () => { throw new Error() })
    assert.deepEqual(ctx.status, 500)
    assert.deepEqual(ctx.body.status, 500)
  })

  it('should catch HTTPError thrown from next()', async () => {
    const ctx = {}

    await errorHandler()(ctx, () => {
      const err = new Error()
      err.message = 'error message'
      err.status = 401
      throw err
    })

    assert.deepEqual(ctx.status, 401)
    assert.deepEqual(ctx.body.status, 401)
    assert.deepEqual(ctx.body.error, 'error message')
  })

  it('should setup response correctly', async () => {
    const ctx = {
      url: 'my-url',
      path: 'my-path',
      method: 'GET',
      errors: ['errors']
    }

    const err = new Error()
    err.message = 'error message'
    err.status = 400

    await errorHandler()(ctx, () => { throw err })

    assert.deepEqual(ctx, {
      url: 'my-url',
      path: 'my-path',
      status: 400,
      method: 'GET',
      errors: ['errors'],
      err: err,
      body: {
        success: false,
        url: 'my-url',
        path: 'my-path',
        method: 'GET',
        error: 'error message',
        status: 400,
        errors: ['errors']
      }
    })

    assert.deepEqual(ctx.body.status, 400)
    assert.deepEqual(ctx.body.error, 'error message')
  })

  it('should expose stack trace with `exposeStackTraces`', async () => {
    const ctx = {}
    await errorHandler({ exposeStackTraces: true })(ctx, () => { throw new Error() })
    assert.deepEqual(ctx.status, 500)
    assert.deepEqual(ctx.body.status, 500)
    // different versions of node.js and dependencies can change the stack slightly
    assert.isOk(ctx.body.stack.length >= 13)
  })

  it('should not expose stack trace by default', async () => {
    const ctx = {}
    await errorHandler({})(ctx, () => { throw new Error() })
    assert.deepEqual(ctx.status, 500)
    assert.deepEqual(ctx.body.status, 500)
    assert.deepEqual(ctx.body.stack, undefined)
  })
})
