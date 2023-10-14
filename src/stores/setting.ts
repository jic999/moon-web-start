import * as settingData from '@/utils/settings'
import type { Settings } from '@/types'
import { deepClone } from '@/utils'

export type SettingKey = keyof Settings

export function loadSettings(): Settings | undefined {
  const settings = localStorage.getItem('settings')
  return settings ? JSON.parse(settings) : undefined
}

const defaultSetting: Settings = Object.fromEntries(
  Object.keys(settingData).map(key => [key, settingData[key as SettingKey].defaultKey]),
) as Settings

export const useSettingStore = defineStore('setting', () => {
  const route = useRoute()
  const isSetting = ref(false)

  watch(route, () => {
    if (route.name === 'setting')
      isSetting.value = true
    else
      isSetting.value = false
  }, { immediate: true })

  const settingCache = loadSettings()

  const settings = reactive<Settings>((() => {
    const _defaultSetting = deepClone(defaultSetting)
    let settings: Settings
    if (settingCache)
      settings = Object.assign(_defaultSetting, settingCache)
    else
      settings = _defaultSetting
    // 排除非法值
    Object.keys(settings).forEach((key) => {
      if (!settingData[key as SettingKey].children.find(item => item.enName === settings[key as SettingKey]))
        settings[key as SettingKey] = settingData[key as SettingKey].defaultKey
    })
    return settings
  })())
  watch(settings, () => {
    localStorage.setItem('settings', JSON.stringify(toRaw(settings)))
  }, { deep: true })

  function getSettingItem(key: keyof typeof settingData) {
    return settingData[key].children.find(item => item.enName === settings[key])!
  }
  function getSettingValue(key: keyof typeof settingData) {
    return getSettingItem(key).value
  }

  function setSettings(newSettings: Partial<Settings>) {
    Object.assign(settings, newSettings)
  }
  function restoreSettings() {
    Object.assign(settings, defaultSetting)
  }

  // ----------------- 拖拽 -----------------
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
    getSettingValue,
    restoreSettings,
  }
})
