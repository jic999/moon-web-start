import { useI18n } from 'vue-i18n'

export function t(key: string | number) {
  return useI18n().t(key)
}
