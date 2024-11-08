import type { Context, Next } from 'koa'
import { R } from '../utils'

export function exceptionInterceptor() {
  return async (ctx: Context, next: Next) => {
    try {
      await next()
    }
    catch (e) {
      ctx.body = R.fail(e.message || 'unknown error')
    }
  }
}
