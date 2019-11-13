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
      // console.log('LOG', util.inspect(info))

      if (info.message && typeof info.message === 'string') {
        return normal.transform(info, {})
      } else {
        let { level, ...rest } = info
        const l = info[LEVEL]
        const m = info[MESSAGE]
        const s = info[SPLAT]

        if (Object.keys(rest).length === 1 && rest.message) {
          rest = rest.message
        }

        const message = prettyPrint.transform(rest, { colorize: true })

        return normal.transform(
          {
            level,
            [LEVEL]: l,
            [MESSAGE]: m,
            [SPLAT]: s,
            message: message[MESSAGE]
          },
          {}
        )
      }
    })()
  }
}
