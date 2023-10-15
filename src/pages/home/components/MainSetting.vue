<script setup lang="ts">
import type { VNode } from 'vue'
import SettingSelection from './SettingSelection.vue'
import type { Category, SettingItem, Settings, Theme, WebsitePreference } from '@/types'
import { getText, loadLanguageAsync } from '@/utils'
import * as S from '@/utils/settings'

const settingStore = useSettingStore()

/* ThemeSetting */
function renderThemeLabel(option: SettingItem<Theme>): VNode {
  const currentTheme = S.theme.children.find(item => item.key === option.key)!
  const bgColor = currentTheme!.value.bgC
  return h('div', { class: 'flex items-center gap-x-8' }, [
    h('div', { class: 'w-16 h-16 circle border-1 border-fff', style: { backgroundColor: bgColor } }),
    h('div', getText(option.name)),
  ])
}

/* Language */
function toggleLanguage(language: string) {
  settingStore.setSettings({ language })
  loadLanguageAsync(language)
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
  window.$message.success(t('messages.exported'))
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
          throw new Error('Invalid data')
        loadData(data)
        settingStore.setSettings({ websitePreference: 'Customize' })
        window.$message.success(t('messages.imported'))
      }
      catch (err: any) {
        window.$message.error(t('messages.warnInvalidImport'))
      }
    }
  })
  inputElement.click()
}

/* 重置预设 */
function resetData() {
  window.$dialog.warning({
    title: t('messages.warnResetData'),
    content: t('messages.warnResetData'),
    positiveText: t('button.confirm'),
    negativeText: t('button.cancel'),
    onPositiveClick() {
      siteStore.restoreData()
      settingStore.restoreSettings()
      toggleTheme(settingStore.settings.theme)
      window.$message.success(t('messages.reseted'))
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
      {{ $t('settings.title') }}
    </div>
    <div grid grid-cols-2 md="grid-cols-3" lg="grid-cols-4" justify-between gap-12>
      <SettingSelection
        v-model="settingStore.settings.theme"
        :title="S.theme.name"
        :options="S.theme.children"
        :render-label="renderThemeLabel"
        label-field="name"
        value-field="key"
        :on-update-value="(theme: string) => toggleTheme(theme)"
      />
      <SettingSelection
        v-model="settingStore.settings.language"
        :title="S.language.name"
        :options="S.language.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => toggleLanguage(key)"
      />
      <SettingSelection
        v-model="settingStore.settings.websitePreference"
        :title="S.websitePreference.name"
        :options="S.websitePreference.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: WebsitePreference) => settingStore.setSettings({ websitePreference: key })"
      />
      <SettingSelection
        v-model="settingStore.settings.search"
        :title="S.search.name"
        :options="S.search.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ search: key })"
      />
      <SettingSelection
        v-model="settingStore.settings.iconStyle"
        :title="S.iconStyle.name"
        :options="S.iconStyle.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ iconStyle: key })"
      />
      <SettingSelection
        v-model="settingStore.settings.showTime"
        :title="S.showTime.name"
        :options="S.showTime.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ showTime: key })"
      />
      <SettingSelection
        v-model="settingStore.settings.showDate"
        :title="S.showDate.name"
        :options="S.showDate.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ showDate: key })"
      />
      <SettingSelection
        v-model="settingStore.settings.showLunar"
        :title="S.showLunar.name"
        :options="S.showLunar.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ showLunar: key })"
      />
      <SettingSelection
        v-model="settingStore.settings.showFooter"
        :title="S.showFooter.name"
        :options="S.showFooter.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ showFooter: key })"
      />
    </div>
    <div mt-24 flex sm="justify-center" justify-between gap-x-12>
      <n-button type="primary" secondary @click="resetData">
        {{ $t('button.resetData') }}
      </n-button>
      <n-button type="success" secondary @click="importData">
        {{ $t('button.importData') }}
      </n-button>
      <n-button type="primary" @click="exportData">
        {{ $t('button.exportData') }}
      </n-button>
    </div>
    <div my-24 flex-center>
      <n-button size="large" type="primary" @click="$router.back()">
        {{ $t('button.complete') }}
      </n-button>
    </div>
  </section>
</template>
