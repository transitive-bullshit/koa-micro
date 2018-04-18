'use strict'

const Winston = require('winston')
const config = require('./config')

const Logger = Winston.Logger
const ConsoleTransport = Winston.transports.Console

module.exports = new Logger({
  transports: [new ConsoleTransport(config.get('logger'))]
})
