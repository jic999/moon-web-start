import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Router from 'koa-router'
import { R, checkFileExist, encryptId } from '../utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ID_REG = /^\w{5,64}$/

export const router = new Router()

router.post('/sync', async (ctx) => {
  let { id, data, secretId } = ctx.request.body

  if (secretId && (secretId as string).length !== 64)
    throw new Error('illegal secretId')

  if (!ID_REG.test(id))
    throw new Error(`illegal id: ${id}`)

  if (!data.data || !data.settings)
    throw new Error('illegal data')

  id = secretId || encryptId(id)
  await fs.writeFile(
    path.resolve(__dirname, `../../public/data/${id}.json`),
    JSON.stringify(data),
    'utf-8',
  )

  ctx.body = R.ok({ id })
})

router.get('/sync/:id', async (ctx) => {
  let { id } = ctx.params
  if (!ID_REG.test(id))
    throw new Error(`illegal id: ${id}`)

  if (id.length < 64)
    id = encryptId(id)

  const targetPath = path.resolve(__dirname, `../../public/data/${id}.json`)
  const isExist = await checkFileExist(targetPath)
  if (!isExist)
    throw new Error(`id not exist: ${ctx.params.id}`)

  const data = JSON.parse(await fs.readFile(targetPath, 'utf-8'))

  ctx.body = R.ok({ data, id })
})
