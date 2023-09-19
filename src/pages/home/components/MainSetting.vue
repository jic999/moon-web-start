<script setup lang="ts">
import SettingSelection from './SettingSelection.vue'
import type { Settings } from '@/stores/setting'
import type { Category } from '@/stores/site'
import type { ThemeSetting } from '@/utils'
import { iconStyleList, searchList, themeList, siteStyleList } from '@/utils'
import ResetModal from './ResetModal.vue'
import preset from '@/preset.json'
import router from '@/router'
import { toggleSiteSytle } from '@/composables/dark'

const resetStore = useResetModalStore()
const settingStore = useSettingStore()

/* ThemeSetting */
function renderThemeLabel(option: ThemeSetting): VNode {
  const currentTheme = themeList.find(item => item.enName === option.enName)!
  const buttonColor = currentTheme!.value.buttonC
  const darkConfig = isDark.value ? { style: { color: '#ffffff' } } : {}
  return h('div', { class: 'flex items-center gap-x-8' },
    [
      h('div', { class: 'w-16 h-16 circle border-1 border-fff', style: { backgroundColor: buttonColor } }),
      h('div', darkConfig , option.name),
    ],
  )
}

/* render color */
function renderColor(option: any): VNode {
  const darkConfig = isDark.value ? { style: { color: '#ffffff' } } : {}
  return h('div', { class: 'flex items-center gap-x-8' },
    [
      h('div', darkConfig, option.name),
    ],
  )
}

/* Icon Style */

/* import and export */
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
  a.download = `COMECOME_Data_${new Date().toLocaleString()}.json`
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
        toggleSiteSytle()
      }
      catch (error) {
        window.$notification.error({ content: '请导入合法的数据文件', duration: 3000 })
      }
    }
  })
  inputElement.click()
}

function resetData() {
  resetStore.title = '重置确认'
  resetStore.content = '是否确认要重置所有设置?'
  resetStore.resetVisible = true
  resetStore.afterCommit = () => {
    router.back()
  }
  resetStore.finishCommit = () => {
    // console.log("finishCOmmit", preset)
    const clonedPreset = JSON.parse(JSON.stringify(preset))
    // console.log("clonedPreset", clonedPreset)

    const data = clonedPreset as CacheData
    siteStore.setData(data.data)
    settingStore.setSettings(data.settings)
    toggleTheme(data.settings.theme)
    toggleSiteSytle()
    siteStore.cateIndex = 0
  }
}

</script>

<template>
  <section v-if="settingStore.isSetting" px="md:60 lg:120" mt-10>
    <div grid grid-cols-2 gap-24 lg:grid-cols-2 md:grid-cols-2>
      <SettingSelection
        v-model="settingStore.settings.theme"
        title="风格样式"
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
        :render-label="renderColor"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ search: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.iconStyle"
        title="图标颜色"
        :options="iconStyleList"
        :render-label="renderColor"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => settingStore.setSettings({ iconStyle: enName })"
      />
      <SettingSelection
        v-model="settingStore.settings.siteStyle"
        title="主题模式"
        :options="siteStyleList"
        :render-label="renderColor"
        label-field="name"
        value-field="enName"
        :on-update-value="(enName: string) => {
          settingStore.setSettings({ siteStyle: enName })
          toggleSiteSytle()
        }"
      />
    </div>
    <div mt-24 flex justify-center gap-x-24>
      <n-button @click="resetData">
        重置数据
      </n-button>
      <n-button @click="importData">
        导入数据
      </n-button>
      <n-button @click="exportData">
        导出数据
      </n-button>
    </div>
    <div my-24 mb-48 flex-center gap-x-24>
      <n-button type="primary" text-color='#ffffff' size="large" @click="$router.back()">
        返回
      </n-button>
    </div>
  </section>
  <ResetModal />
</template>
