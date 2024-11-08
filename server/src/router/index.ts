import { promises as fs } from 'node:fs'
import path from 'node:path'
import Router from 'koa-router'
import { R, checkFileExist, encryptId } from '../utils'

const ID_REG = /^\w+$/

export const router = new Router()

router.post('/sync', async (ctx) => {
  let { id, data } = ctx.request.body
  if (!ID_REG.test(id))
    throw new Error(`illegal id: ${id}`)

  id = encryptId(id)
  await fs.writeFile(
    path.resolve(import.meta.dirname, `../../public/data/${id}.json`),
    JSON.stringify(data),
    'utf-8',
  )

  ctx.body = R.ok({ id })
})

router.get('/sync/:id', async (ctx) => {
  let { id } = ctx.params
  if (!ID_REG.test(id))
    throw new Error(`illegal id: ${id}`)

  id = encryptId(id)
  const targetPath = path.resolve(import.meta.dirname, `../../public/data/${id}.json`)
  const isExist = checkFileExist(targetPath)
  if (!isExist)
    throw new Error(`file not exist: ${id}`)

  const data = JSON.parse(await fs.readFile(targetPath, 'utf-8'))

  ctx.body = R.ok(data)
})
