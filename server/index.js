const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const koaBody = require('koa-bodyparser')
const koaJwt = require('koa-jwt')

const routerLogin = require('./interface/login.js')
const routerCity = require('./interface/city.js')

const app = new Koa()
app.use(koaBody())
// token驗證
app.use(async (ctx, next) => {
  await next().catch((err) => {
    console.log(err)
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        data: null,
        message: 'token无效',
        status: false
      }
    } else {
      throw err
    }
  })
})
// logger
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

// 使用新建接口路由
app.use(routerLogin.routes()).use(routerLogin.allowedMethods())
app.use(routerCity.routes()).use(routerCity.allowedMethods())

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 8000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
