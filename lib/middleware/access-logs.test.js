'use strict'

const assert = require('chai').assert
const sinon = require('sinon')
const config = require('../config')
const accessLogs = require('./access-logs')

describe('accessLogs(ctx, next)', () => {
  const env = process.env
  const sandbox = sinon.sandbox.create()

  before(() => {
    process.env = {
      APP_NAME: 'APP_NAME',
      REVISION: 'REVISION',
      NODE_ENV: 'NODE_ENV'
    }
  })

  after(() => {
    process.env = env
    sandbox.restore()
  })

  it('should write logs correctly', async () => {
    const next = sinon.spy()
    const logger = { log: sandbox.spy() }

    await accessLogs(logger)({
      ip: 'ip',
      method: 'method',
      path: '/foo',
      responseTime: 'responseTime',
      status: 200,
      url: 'url'
    }, next)

    assert.ok(next.called)
    assert.deepEqual(logger.log.args[0], [
      'info',
      {
        env: 'NODE_ENV',
        ip: 'ip',
        method: 'method',
        responseTime: 'responseTime',
        revision: 'REVISION',
        app: 'APP_NAME',
        status: 200,
        url: 'url'
      }
    ])
  })

  it('should use correct log level for 500s', async () => {
    const next = sinon.spy()
    const logger = { log: sandbox.spy() }

    await accessLogs(logger)({
      ip: 'ip',
      method: 'method',
      path: '/foo',
      responseTime: 'responseTime',
      status: 500,
      err: 'error',
      errors: 'errors',
      url: 'url'
    }, next)

    assert.ok(next.called)
    assert.deepEqual(logger.log.args[1], [
      'error',
      {
        env: 'NODE_ENV',
        error: 'error',
        errors: 'errors',
        ip: 'ip',
        method: 'method',
        responseTime: 'responseTime',
        revision: 'REVISION',
        app: 'APP_NAME',
        status: 500,
        url: 'url'
      }
    ])
  })

  it('should attach stack trace if available', async () => {
    const next = sinon.spy()
    const logger = { log: sandbox.spy() }

    await accessLogs(logger)({
      ip: 'ip',
      method: 'method',
      path: '/foo',
      responseTime: 'responseTime',
      status: 500,
      err: new Error('Hello there'),
      errors: 'errors',
      url: 'url'
    }, next)

    assert.ok(next.called)
    assert.deepEqual(logger.log.args[0][1].toString(), 'Error: Hello there')
  })

  it('should use correct log level for healthCheckPath', async () => {
    const next = sinon.spy()
    const logger = { log: sandbox.spy() }

    await accessLogs(logger)({
      ip: 'ip',
      method: 'method',
      path: config.get('api.healthCheckPath'),
      responseTime: 'responseTime',
      status: 200,
      url: 'url'
    }, next)

    assert.ok(next.called)
    assert.deepEqual(logger.log.args[0], [
      'verbose',
      {
        env: 'NODE_ENV',
        ip: 'ip',
        method: 'method',
        responseTime: 'responseTime',
        revision: 'REVISION',
        app: 'APP_NAME',
        status: 200,
        url: 'url'
      }
    ])
  })
})
