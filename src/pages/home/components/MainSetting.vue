<script setup lang="ts">
import SettingSelection from './SettingSelection.vue'
import type { Category, SettingItem, Settings, Theme, WebsitePreference } from '@/types'
import * as S from '@/utils/settings'

const settingStore = useSettingStore()

/* ThemeSetting */
function renderThemeLabel(option: SettingItem<Theme>): VNode {
  const currentTheme = S.theme.children.find(item => item.enName === option.enName)!
  const bgColor = currentTheme!.value.bgC
  return h('div', { class: 'flex items-center gap-x-8' }, [
    h('div', { class: 'w-16 h-16 circle border-1 border-fff', style: { backgroundColor: bgColor } }),
    h('div', option.name),
  ])
}

/* 导入导出 */
export interface CacheData {
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
  window.$message.success('已导出~')
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
        settingStore.setSettings({ websitePreference: 'Customize' })
        window.$message.success('导入成功~')
      }
      catch (err: any) {
        window.$message.error(err.message)
      }
    }
  })
  inputElement.click()
}

/* 重置预设 */
function resetData() {
  window.$dialog.warning({
    title: '提示',
    content: '数据重置后无法恢复，确认要重置数据吗？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick() {
      siteStore.restoreData()
      settingStore.restoreSettings()
      toggleTheme(settingStore.settings.theme)
      window.$message.success('已重置~')
      // 重置分类索引
      siteStore.setCateIndex(0)
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
    <div flex flex-wrap md="grid grid-cols-2" lg="grid grid-cols-3" justify-between gap-12>
      <SettingSelection
        v-model="settingStore.settings.theme"
        :title="S.theme.name"
        :options="S.theme.children"
        :render-label="renderThemeLabel"
        label-field="name"
        value-field="enName"
        :on-update-value="(theme: string) => toggleTheme(theme)"
      />
      <SettingSelection
        v-model="settingStore.settings.search"
        :title="S.search.name"
        :options="S.search.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ search: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.websitePreference"
        :title="S.websitePreference.name"
        :options="S.websitePreference.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: WebsitePreference) => settingStore.setSettings({ websitePreference: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.iconStyle"
        :title="S.iconStyle.name"
        :options="S.iconStyle.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ iconStyle: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.showTime"
        :title="S.showTime.name"
        :options="S.showTime.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ showTime: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.showLunar"
        :title="S.showLunar.name"
        :options="S.showLunar.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ showLunar: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.showFooter"
        :title="S.showFooter.name"
        :options="S.showFooter.children"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ showFooter: enName })"
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
