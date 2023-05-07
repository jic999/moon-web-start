<script setup lang="ts">
import SettingSelection from './SettingSelection.vue'
import type { Settings } from '@/stores/setting'
import type { Category } from '@/stores/site'
import type { ThemeSetting } from '@/utils'
import { iconStyleList, searchList, themeList } from '@/utils'

// TODO 设置项完善

const settingStore = useSettingStore()
/* ThemeSetting */
function renderThemeLabel(option: ThemeSetting): VNode {
  const currentTheme = themeList.find(item => item.enName === option.enName)!
  const bgColor = currentTheme!.value.bgC
  return h('div', { class: 'flex items-center gap-x-8' },
    [
      h('div', { class: 'w-16 h-16 circle border-1 border-fff', style: { backgroundColor: bgColor } }),
      h('div', option.name),
    ],
  )
}
/* Icon Style */

/* 导入导出 */
interface CacheData {
  data: Category[]
  settings: Settings
}
const siteStore = useSiteStore()
function exportData() {
  const data = {
    data: siteStore.data,
    settings: settingStore.settings,
  }
  const jsonStr = JSON.stringify(data)
  const blob = new Blob([jsonStr], { type: 'application/json' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.download = `MoonStart_Data_${new Date().toLocaleString()}.json`
  a.href = url
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
}
function importData() {
  const inputElement = document.createElement('input')
  inputElement.type = 'file'
  inputElement.accept = '.json'
  inputElement.addEventListener('change', async () => {
    const file = inputElement.files?.[0]
    if (file) {
      try {
        const jsonStr = await file.text()
        const data = JSON.parse(jsonStr) as CacheData
        if (!data.data || !data.settings)
          throw new Error('非法的数据文件')
        siteStore.setData(data.data)
        settingStore.setSettings(data.settings)
        toggleTheme(data.settings.theme)
      }
      catch (error) {
        window.$notification.error({ content: '请导入合法的数据文件', duration: 3000 })
      }
    }
  })
  inputElement.click()
}
</script>

<template>
  <section v-if="settingStore.isSetting" p-24>
    <div my-16 text="16 $primary-dark-c" italic>
      设置
    </div>
    <div flex flex-wrap justify-between gap-12>
      <SettingSelection
        v-model="settingStore.settings.theme"
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
      <SettingSelection
        v-model="settingStore.settings.iconStyle"
        title="图标风格"
        :options="iconStyleList"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ iconStyle: enName })"
      />
    </div>
    <div mt-24 flex justify-end gap-x-12>
      <n-button type="primary" secondary @click="importData">
        导入数据
      </n-button>
      <n-button type="primary" @click="exportData">
        导出数据
      </n-button>
    </div>
    <div my-24 flex-center>
      <n-button size="large" type="primary" @click="$router.back()">
        完成
      </n-button>
    </div>
  </section>
</template>
