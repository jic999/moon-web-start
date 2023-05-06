<script setup lang="ts">
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
      <div flex items-center justify-between flex-shrink-0 w-320>
        <div text="14" inline-block overflow-hidden w-20p w-60 md:w-auto>
          主题
        </div>
        <n-select
          v-model:value="settingStore.settings.theme"
          class="w-240"
          :options="themeList"
          :render-label="renderThemeLabel"
          label-field="name"
          value-field="enName"
          :on-update-value="(theme: string) => toggleTheme(theme)"
        />
      </div>
      <div flex items-center justify-between flex-shrink-0 w-320>
        <div text="14" inline-block overflow-hidden w-20p w-80 md:w-auto>
          搜索引擎
        </div>
        <n-select
          v-model:value="settingStore.settings.search"
          class="w-240"
          :options="searchList"
          label-field="name"
          value-field="enName"
          :on-update-value="(enName: string) => settingStore.setSettings({ search: enName })"
        />
      </div>
    </div>
  </section>
</template>
