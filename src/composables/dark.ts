import type { WebStyle } from '@/utils'
import { usePreferredColorScheme } from '@vueuse/core'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export function useSiteStyle() {
    const settingStore = useSettingStore()
    const siteStyle = computed(() => (settingStore.getSettingItem('siteStyle').value as WebStyle).enName as string)
  
    return {
        siteStyle,
    }
}

export function toggleSiteSytle() {
    const { siteStyle } = useSiteStyle()
    if (siteStyle.value == 'auto') {
    const colorScheme = usePreferredColorScheme()
    if (colorScheme.value == "light") {
        isDark.value = false
    } else if (colorScheme.value === 'dark') {
        isDark.value = true
    }
    } else if (siteStyle.value == 'dark') {
        isDark.value = true
    } else {
        isDark.value = false
    }
}