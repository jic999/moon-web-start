import type { ThemeName } from '@/composables/theme'

export interface Settings {
  theme: ThemeName
}
export function loadSettings(): Settings | undefined {
  const settings = localStorage.getItem('settings')
  return settings ? JSON.parse(settings) : undefined
}
export const useSettingStore = defineStore('theme', () => {
  const settings = reactive<Settings>(loadSettings() || {
    theme: 'earlySpring',
  })
  watch(settings, () => {
    localStorage.setItem('settings', JSON.stringify(toRaw(settings)))
  }, { deep: true })

  return {
    settings,
  }
})
