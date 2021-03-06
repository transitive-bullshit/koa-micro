# koa-micro

> [Koa 2](http://koajs.com/) microservices with batteries included.

[![NPM](https://img.shields.io/npm/v/koa-micro.svg)](https://www.npmjs.com/package/koa-micro) [![Build Status](https://travis-ci.com/transitive-bullshit/koa-micro.svg?branch=master)](https://travis-ci.com/transitive-bullshit/koa-micro) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
  * Logger supporting [Google Cloud Trace](https://cloud.google.com/trace/)
  * Error handler middleware with [Google Cloud Errors](https://cloud.google.com/error-reporting/)
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

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
