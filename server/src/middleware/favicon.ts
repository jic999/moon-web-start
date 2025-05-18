import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { Context, Next } from 'koa'
import ky from 'ky'
import { checkFileExist } from '../utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function faviconInterceptor() {
  return async (ctx: Context, next: Next) => {
    if (ctx.req.url.startsWith('/favicon/')) {
      const id = ctx.req.url.split('/').pop()
      if (!id.endsWith('.png'))
        throw new Error('bad request')

      const isExist = await checkFileExist(path.resolve(__dirname, `../../public/favicon/${id}`))
      if (!isExist) {
        const domain = id.replace('.png', '')
        try {
          const faviconUrl = getFaviconUrl(domain)
          const arrayBuffer = await ky.get(faviconUrl).arrayBuffer()
          fs.writeFileSync(
            path.join(__dirname, `../../public/favicon/${id}`),
            Buffer.from(arrayBuffer),
          )
        }
        catch (error) {
          throw error
        }
      }
    }

    await next()
  }
}

function getFaviconUrl(domain: string) {
  const api = process.env.FAVICON_API

  if (api === 'google')
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${process.env.FAVICON_SIZE || 64}`
  else if (api === '0x3')
    return `https://0x3.com/icon?host=${domain}`
}
