'use strict'

const winston = require('winston')
const { LEVEL, MESSAGE, SPLAT } = require('triple-beam')

const normal = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple()
)
const prettyPrint = winston.format.prettyPrint({ colorize: true })

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
    format: winston.format((info, opts) => {
      if (info.message) {
        return normal.transform(info, { })
      } else {
        const { level, ...rest } = info
        const l = info[LEVEL]
        const m = info[MESSAGE]
        const s = info[SPLAT]
        const message = prettyPrint.transform(rest, { colorize: true })

        return normal.transform({
          level,
          [LEVEL]: l,
          [MESSAGE]: m,
          [SPLAT]: s,
          message: message[MESSAGE]
        }, { })
      }
    })()
  }
}
