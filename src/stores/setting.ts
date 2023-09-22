import * as settingData from '@/utils/settings'
import preset from '@/preset.json'
import type { Settings } from '@/types'

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
  const presetSetting = preset.settings

  const settings = reactive<Settings>((() => {
    let settings: Settings
    if (settingCache)
      settings = Object.assign(presetSetting, { ...defaultSetting, ...settingCache })
    else
      settings = Object.assign(defaultSetting, presetSetting)
    // 排除非法值
    Object.keys(settings).forEach((key) => {
      if (!settingData[key as SettingKey].children.find(item => item.enName === settings[key as SettingKey]))
        settings[key as SettingKey] = settingData[key as SettingKey].defaultKey
    })
    return settings
  })())

  function getSettingItem(key: keyof typeof settingData) {
    return settingData[key].children.find(item => item.enName === settings[key])!
  }
  function getSettingValue(key: keyof typeof settingData) {
    return getSettingItem(key).value
  }

  function setSettings(newSettings: Partial<Settings>) {
    Object.assign(settings, newSettings)
  }
  watch(settings, () => {
    localStorage.setItem('settings', JSON.stringify(toRaw(settings)))
  }, { deep: true })

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
  }
})
