const Router = require('koa-router')
const sql = require('mssql')
const jwt = require('jsonwebtoken')
const secret = 'WFT_DSA'

const SQLconfig = require('../config')
const routerLogin = new Router({ prefix: '/api' })
//驗證帳號有無重複
routerLogin.get('/login', async (ctx) => {
  let regAccount = ctx.query.regAccount
  console.log(regAccount)
  await (async function() {
    try {
      await sql.connect(SQLconfig)
      const result = await sql.query`select * from login where  account = ${regAccount} ` //sql 回傳資料
      ctx.body = {
        notice: '帳號重複',
        message: false,
        regAccount: result.recordset[0].account //這筆資料找不到會跳到catch
      }
    } catch (e) {
      ctx.body = {
        notice: '帳號沒有重複',
        message: true
      }
    }
    sql.close()
  })()
})
// 驗證登入
routerLogin.post('/login', async (ctx) => {
  // console.log(ctx.request.body)
  let username = ctx.request.body.id
  let userpassword = ctx.request.body.password
  await (async function() {
    try {
      // console.log(this)
      await sql.connect(SQLconfig)
      const result = await sql.query`select * from login where  account = ${username} and passname = ${userpassword}` //sql 回傳資料
      try {
        //回傳狀態碼 與 使用者名稱
        ctx.body = {
          userName: result.recordset[0].name,
          message: true,
          token: jwt.sign(
            {
              data: 'aa',
              // 设置 token 过期时间
              exp: 3000
            },
            secret
          )
        }
      } catch (e) {
        console.log(e)
        ctx.body = {
          message: '帳號密碼錯誤'
        }
      }
      //for JSON AUTO
      sql.close()
      // ctx.body = result.recordsets
    } catch (e) {
      console.log(e)
    }
  })()
})
//修改帳號

//刪除帳號
routerLogin.delete('/login', async (ctx) => {
  let deleteAccount = ctx.query.deleteAccount
  console.log(ctx.query)
  await (async function() {
    try {
      await sql.connect(SQLconfig)
      const delResult = await sql.query`delete from login where account = ${deleteAccount}`
      console.log(delResult)
      ctx.body = {
        message: delResult
      }
    } catch (e) {
      console.log(e)
    }
  })()
})
//註冊
routerLogin.post('/reg', async (ctx) => {
  // console.log(ctx.request)
  console.log(ctx.request.body)
  let userName = ctx.request.body.userName,
    account = ctx.request.body.account,
    password = ctx.request.body.password
  if (userName.length == 0 || account.length == 0 || password.length == 0) {
    ctx.body = {
      message: '名稱帳號或密碼不得為空'
    }
    return
  }
  //連結資料庫
  await (async function() {
    try {
      // console.log(this)
      await sql.connect(SQLconfig)
      const result = await sql.query`select * from login where account = ${account} or name = ${userName}`
      if (result.recordset.length == 0) {
        console.log('沒有重複')
        const test = await sql.query`insert login values(${userName}, ${account}, ${password})`
        ctx.body = {
          message: true
        }
      } else {
        ctx.body = { message: '有相同帳號密碼' }
      }
      sql.close()
    } catch (e) {
      console.log(e)
    }
  })()
})

module.exports = routerLogin
