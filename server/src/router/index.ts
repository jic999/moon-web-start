import Router from 'koa-router'

export const router = new Router()

router.get('/hello', (ctx) => {
  ctx.body = 'hello'
})

router.get('/hi', (ctx) => {
  ctx.body = 'hi'
})
