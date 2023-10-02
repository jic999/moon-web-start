<script setup lang="ts">
import SettingSelection from './SettingSelection.vue'
import type { Category, SettingItem, Settings, Theme } from '@/types'
import { deepClone, iconStyle, search, showLunar, theme } from '@/utils'
import presetData from '@/preset.json'

// TODO 设置项完善
const settingStore = useSettingStore()
const renderStore = useRenderStore()

/* ThemeSetting */
function renderThemeLabel(option: SettingItem<Theme>): VNode {
  const currentTheme = theme.children.find(item => item.enName === option.enName)!
  const bgColor = currentTheme!.value.bgC
  return h('div', { class: 'flex items-center gap-x-8' }, [
    h('div', { class: 'w-16 h-16 circle border-1 border-fff', style: { backgroundColor: bgColor } }),
    h('div', option.name),
  ])
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
  window.$notification.success({ content: '已导出~', duration: 3000 })
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
          throw new Error('请导入合法的数据文件')
        loadData(data)
        window.$notification.success({ content: '导入成功~', duration: 3000 })
      }
      catch (err: any) {
        window.$notification.error({ content: err.message, duration: 3000 })
      }
    }
  })
  inputElement.click()
}

function resetData() {
  window.$dialog.warning({
    title: '提示',
    content: '数据重置后无法恢复，你确认要重置数据吗？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick() {
      loadData(deepClone(presetData))
      window.$notification.success({ content: '已重置~', duration: 3000 })
      // 重置分类索引
      siteStore.setCateIndex(0)
      // 重新渲染 site group list，否则自定义图标的背景色会丢失
      renderStore.refreshSiteGroupList()
    },
  })
}

function loadData(data: any) {
  siteStore.setData(data.data)
  settingStore.setSettings(data.settings)
  toggleTheme(data.settings.theme)
}
</script>

<template>
  <section v-if="settingStore.isSetting" px="md:32 lg:64">
    <div my-16 text="16 $text-c-1" italic>
      设置
    </div>
    <div flex flex-wrap sm="grid grid-cols-2" justify-between gap-12>
      <SettingSelection
        v-model="settingStore.settings.theme"
        :title="theme.name"
        :options="theme.children"
        :render-label="renderThemeLabel"
        label-field="name"
        value-field="enName"
        :on-update-value="(theme: string) => toggleTheme(theme)"
      />
      <SettingSelection
        v-model="settingStore.settings.search"
        :title="search.name"
        :options="search.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ search: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.iconStyle"
        :title="iconStyle.name"
        :options="iconStyle.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ iconStyle: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.showLunar"
        :title="showLunar.name"
        :options="showLunar.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ showLunar: enName })"
      />
    </div>
    <div mt-24 flex sm="justify-center" justify-between gap-x-12>
      <n-button type="primary" secondary @click="resetData">
        重置数据
      </n-button>
      <n-button type="success" secondary @click="importData">
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
