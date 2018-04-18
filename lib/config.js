'use strict'

// https://github.com/lorenwest/node-config/wiki/Sub-Module-Configuration
// https://github.com/lorenwest/node-config/wiki/Using-Config-Utilities#loadfileconfigsdirectory

const path = require('path')
const config = require('config')

// load local configuration
const configDir = path.join(__dirname, '..', 'config')
const localConfig = config.util.loadFileConfigs(configDir)

// extend local with upstream
config.util.extendDeep(localConfig, config)
config.util.extendDeep(config, localConfig)

module.exports = config
