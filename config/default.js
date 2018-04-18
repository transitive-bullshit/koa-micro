'use strict'

module.exports = {
  api: {
    uri: '',
    proxy: true,
    exposeStackTraces: false,
    enableProcessHooks: true,
    healthCheckPath: '/alive'
  },
  cloudDebug: {
    serviceContext: {
      service: process.env.APP_NAME,
      version: process.env.REVISION
    }
  },
  cloudTrace: {
    serviceContext: {
      service: process.env.APP_NAME,
      version: process.env.REVISION
    }
  },
  cloudErrors: {
    ignoreEnvironmentCheck: true,
    serviceContext: {
      service: process.env.APP_NAME,
      version: process.env.REVISION
    }
  },
  logger: {
    json: true,
    stringify: true
  }
}
