'use strict'

const readdirSync = require('fs').readdirSync
const toCamelCase = require('to-camel-case')

readdirSync(__dirname)
  .filter((fileName) => !fileName.endsWith('.test.js'))
  .forEach((fileName) => {
    const middlewareName = toCamelCase(fileName.replace('.js', ''))
    module.exports[middlewareName] = require(`./${fileName}`)
  })
