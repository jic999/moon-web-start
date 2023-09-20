import type { StyleValue } from 'vue'
import type { IconStyle } from '@/types'

export function useIconStyle() {
  const settingStore = useSettingStore()
  const iconStyle = computed(() => (settingStore.getSettingItem('iconStyle').value as IconStyle).style as StyleValue)

  return {
    iconStyle,
  }
}
