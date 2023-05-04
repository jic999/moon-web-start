<script setup lang="ts">
import type { ThemeName } from '@/composables/theme'
import { presetThemeList } from '@/utils'

interface ThemeOption {
  name: string
  enName: string
}
const themeOptions: ThemeOption[] = [
  { name: '初春', enName: 'earlySpring' },
  { name: '瀚海', enName: 'vastOcean' },
  { name: '大漠', enName: 'theDesert' },
  { name: '月白', enName: 'moonWhite' },
]
const settingStore = useSettingStore()
function renderThemeLabel(option: ThemeOption): VNode {
  const bgColor = presetThemeList[option.enName as ThemeName].bgC
  return h('div', { class: 'flex items-center gap-x-8' },
    [
      h('div', { class: 'w-16 h-16 circle border-1', style: { backgroundColor: bgColor } }),
      h('div', option.name),
    ],
  )
}
</script>

<template>
  <div v-if="$route.name === 'setting'" p-24>
    <n-select
      v-model:value="settingStore.settings.theme"
      :options="themeOptions"
      :render-label="renderThemeLabel"
      label-field="name"
      value-field="enName"
      w-300
      :on-update-value="(theme: string) => toggleTheme(theme as ThemeName)"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
