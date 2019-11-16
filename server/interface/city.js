const Router = require('koa-router')
const routerCity = new Router({ prefix: '/city' })
const SQLconfig = require('../')

routerCity.get('/list', async (ctx) => {
  console.log(ctx.request.method)
  ctx.body = {
    list: ['北京', '上海', '菏泽']
  }
})

module.exports = routerCity
