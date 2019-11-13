'use strict'

const util = require('util')
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
      // useful for debugging the logging messages
      // console.log('LOG', util.inspect(info), util.inspect(opts))

      if (info.message && typeof info.message !== 'object') {
        if (info[SPLAT]) {
          info.message = `${info.message} ${util.inspect(...info[SPLAT])}`
        }

        return normal.transform(info, {})
      } else {
        let { level, ...rest } = info
        const l = info[LEVEL]
        const s = info[SPLAT]

        if (Object.keys(rest).length === 1 && rest.message) {
          rest = rest.message
        }

        const pretty = prettyPrint.transform(rest, { colorize: true })
        const message = pretty[MESSAGE]

        return normal.transform(
          {
            level,
            [LEVEL]: l,
            [MESSAGE]: message,
            [SPLAT]: s,
            message
          },
          {}
        )
      }
    })()
  }
}
