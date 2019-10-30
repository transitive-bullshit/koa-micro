'use strict'

const winston = require('winston')
const config = require('./config')

const ConsoleTransport = winston.transports.Console

const transports = [
  new ConsoleTransport(config.get('logger'))
]

if (config.get('cloudLogging')) {
  const { LoggingWinston } = require('@google-cloud/logging-winston')
  const cloudLogging = new LoggingWinston({
    format: winston.format.json(),
    ...config.get('cloudLogging')
  })
  transports.push(cloudLogging)
}

module.exports = winston.createLogger({
  transports
})
