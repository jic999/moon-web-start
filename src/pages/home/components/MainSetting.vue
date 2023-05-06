<script setup lang="ts">
import SettingSelection from './SettingSelection.vue'
import type { Theme } from '@/utils'
import { searchList, themeList } from '@/utils'

// TODO 完善设置

const settingStore = useSettingStore()
/* Theme */
function renderThemeLabel(option: Theme): VNode {
  const currentTheme = themeList.find(item => item.enName === option.enName)!
  const bgColor = currentTheme!.theme.bgC
  return h('div', { class: 'flex items-center gap-x-8' },
    [
      h('div', { class: 'w-16 h-16 circle border-1 border-fff', style: { backgroundColor: bgColor } }),
      h('div', option.name),
    ],
  )
}
/* Search */
</script>

<template>
  <section v-if="settingStore.isSetting" p-24>
    <div my-16 text="16 $primary-dark-c" italic>
      设置
    </div>
    <div flex flex-wrap justify-between gap-12>
      <SettingSelection
        v-model:value="settingStore.settings.theme"

        title="主题"
        :options="themeList"
        :render-label="renderThemeLabel"
        label-field="name"
        value-field="enName"
        :on-update-value="(theme: string) => toggleTheme(theme)"
      />
      <SettingSelection
        v-model="settingStore.settings.search"
        title="搜索引擎"
        :options="searchList"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ search: enName })"
      />
    </div>
  </section>
</template>
