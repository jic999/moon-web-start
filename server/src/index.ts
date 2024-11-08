import path from 'node:path'
import Koa from 'koa'
import { koaBody } from 'koa-body'
import koaStatic from 'koa-static'
import { router } from './router'
import { exceptionInterceptor, faviconInterceptor } from './middleware'

const app = new Koa()

app.use(exceptionInterceptor())
  .use(koaBody())
  .use(faviconInterceptor())
  .use(router.routes())
  .use(koaStatic(path.resolve(import.meta.dirname, '../public')))

app.listen(1889)
