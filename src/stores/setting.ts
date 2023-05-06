export interface Settings {
  theme: string
  search: String
}
export function loadSettings(): Settings | undefined {
  const settings = localStorage.getItem('settings')
  return settings ? JSON.parse(settings) : undefined
}
export const useSettingStore = defineStore('theme', () => {
  const route = useRoute()
  const isSetting = computed(() => route.name === 'setting')

  const settings = reactive<Settings>(loadSettings() || {
    theme: 'EarlySpring',
    search: 'Bing',
  })
  watch(settings, () => {
    localStorage.setItem('settings', JSON.stringify(toRaw(settings)))
  }, { deep: true })

  const isDragging = ref(false)
  function setIsDragging(status: boolean) {
    isDragging.value = status
  }
  function setSettings(newSettings: Partial<Settings>) {
    Object.assign(settings, newSettings)
  }

  return {
    isSetting,
    settings,
    isDragging,
    setIsDragging,
    setSettings,
  }
})
