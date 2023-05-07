import type { IconStyle } from '@/utils'

export function useIconStyle() {
  const settingStore = useSettingStore()
  const iconStyle = computed(() => (settingStore.getSettingItem('iconStyle').value as IconStyle).style)

  return {
    iconStyle,
  }
}
