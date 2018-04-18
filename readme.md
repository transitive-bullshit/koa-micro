# koa-micro

> [Koa 2](http://koajs.com/) microservices with batteries included.

[![NPM](https://img.shields.io/npm/v/koa-micro.svg)](https://www.npmjs.com/package/koa-micro) [![Build Status](https://travis-ci.org/transitive-bullshit/koa-micro.svg?branch=master)](https://travis-ci.org/transitive-bullshit/koa-micro) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

```
npm install --save koa-micro
```

This module uses async await and therefore requires node >= 8.

## Usage

```js
'use strict'

// ENV are set upstream at the container level
// we set them here only for demo purposes
process.env.APP_NAME = 'example-service'
process.env.REVISION = 'example-revision'

const config = require('config')
const micro = require('koa-micro')

const app = micro()

app.use(async (ctx, next) => {
  ctx.body = config
})

const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  micro.logger.info(`${process.env.APP_NAME}:${process.env.REVISION} up @ http://localhost:${port}`)
})

process.on('SIGINT', () => server.close())
```

### What's included

  * Koa 2 app
  * Context utility `assertFound`
  * Context utility `assertParam`
  * Context utility `success`
  * Logger supporting [Google Cloud Trace](https://console.cloud.google.com/traces/traces?project=infinite-hope-145120&start=1488614433575&end=1488700833575)
  * Error handler middleware with [Google Cloud Errors](https://console.cloud.google.com/errors?time=PT1H&refresh=off&order=COUNT_DESC&project=infinite-hope-145120)
  * Access logs middleware
  * Response time middleware
  * CORS middleware
  * OPTIONS middleware
  * Gzip middleware
  * Health check endpoint (`/alive` by default)

### Usage & Configuration

This module uses [`config`](https://github.com/lorenwest/node-config) leveraging the [sub-module pattern](https://github.com/lorenwest/node-config/wiki/Sub-Module-Configuration). The base config is available at `./config` and can be overridden upstream by the actual service by simply adding values to the upstream configuration.

The resulting config will be the merged result of `Object.assign(micro-config, upstream-config)`.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
