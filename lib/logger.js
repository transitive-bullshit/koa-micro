'use strict'

const winston = require('winston')
const config = require('./config')

const ConsoleTransport = winston.transports.Console

module.exports = winston.createLogger({
  transports: [new ConsoleTransport(config.get('logger'))]
})
