import { iconStyleList, searchList, themeList } from '@/utils'

export interface Settings {
  theme: string
  search: String
  iconStyle: String
}
export interface SettingItem<T> {
  name: string
  enName: string
  value: T
}
export type SettingKey = keyof Settings
export function loadSettings(): Settings | undefined {
  const settings = localStorage.getItem('settings')
  return settings ? JSON.parse(settings) : undefined
}

export const settingData: { [K in SettingKey]: SettingItem<any>[] } = {
  theme: themeList,
  search: searchList,
  iconStyle: iconStyleList,
}

export const useSettingStore = defineStore('theme', () => {
  const route = useRoute()
  const isSetting = computed(() => route.name === 'setting')

  const settingCache = loadSettings()
  const presetSetting = {
    theme: 'EarlySpring',
    search: 'Bing',
    iconStyle: 'Vivid',
  }
  const settings = reactive<Settings>((() => {
    if (settingCache) {
      // 判断设置项是否变更
      for (const key in presetSetting) {
        if (!settingCache[key as SettingKey])
          return Object.assign(settingCache, presetSetting)
      }
      return settingCache
    }
    return presetSetting
  })())
  function getSettingItem(key: SettingKey) {
    return settingData[key].find(item => item.enName === settings[key])!
  }
  console.log(getSettingItem('iconStyle'))

  function setSettings(newSettings: Partial<Settings>) {
    Object.assign(settings, newSettings)
  }
  watch(settings, () => {
    localStorage.setItem('settings', JSON.stringify(toRaw(settings)))
  }, { deep: true })

  const isDragging = ref(false)
  function setIsDragging(status: boolean) {
    isDragging.value = status
  }

  return {
    isSetting,
    settings,
    isDragging,
    setSettings,
    setIsDragging,
    getSettingItem,
  }
})
