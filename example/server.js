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
