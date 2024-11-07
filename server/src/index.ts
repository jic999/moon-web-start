import Koa from 'koa'

const app = new Koa()

app.use((ctx) => {
  ctx.body = 'hello'
})

app.listen(1889)
