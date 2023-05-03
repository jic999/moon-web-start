<script setup lang="ts">
import type { ThemeName } from '@/composables/theme'

const themeOptions = [
  { name: '初春', enName: 'earlySpring' },
  { name: '大漠', enName: 'theDesert' },
  { name: '瀚海', enName: 'vastOcean' },
  { name: '月白', enName: 'moonWhite' },
]
const settingStore = useSettingStore()
</script>

<template>
  <div v-if="$route.name === 'setting'" p-24>
    <n-select
      v-model:value="settingStore.settings.theme"
      :options="themeOptions"
      label-field="name"
      value-field="enName"
      w-300
      :on-update-value="(theme: string) => toggleTheme(theme as ThemeName)"
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
