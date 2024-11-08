import { promises as fs } from 'node:fs'
import crypto from 'node:crypto'

export async function checkFileExist(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  }
  catch (error) {
    return false
  }
}

export function encryptId(id: string) {
  const SALT = 'SALT'
  return crypto.createHash('sha256')
    .update(id + SALT)
    .digest('hex')
}

export class R<T> {
  constructor(
    public code: number,
    public data: T | null,
    public msg: string,
  ) {}

  static ok<T>(data?: T, msg: string = 'ok') {
    return new R(0, data, msg)
  }

  static fail(msg: string = 'fail') {
    return new R(-1, null, msg)
  }
}
