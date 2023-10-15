import { i18n } from '@/utils'

export function t(key: string | number) {
  return i18n.global.t(key)
}
