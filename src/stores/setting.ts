import { iconStyleList, searchList, themeList } from '@/utils'
import type { SettingKey, Settings } from '@/_types'
import preset from '@/preset.json'

export function loadSettings(): Settings | undefined {
  const settings = localStorage.getItem('settings')
  return settings ? JSON.parse(settings) : undefined
}

export const settingData = {
  theme: themeList,
  search: searchList,
  iconStyle: iconStyleList,
}

export const useSettingStore = defineStore('theme', () => {
  const route = useRoute()
  const isSetting = computed(() => route.name === 'setting')

  const settingCache = loadSettings()
  const presetSetting = preset.settings
  const settings = reactive<Settings>((() => {
    if (settingCache) {
      // 判断设置项是否变更
      for (const key in presetSetting) {
        if (!settingCache[key as SettingKey])
          return Object.assign(presetSetting, settingCache)
      }
      return settingCache
    }
    return presetSetting
  })())
  function getSettingItem(key: SettingKey) {
    return settingData[key].find(item => item.enName === settings[key])!
  }

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
