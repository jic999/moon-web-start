<script setup lang="ts">
import type { VNode } from 'vue'
import SettingSelection from './SettingSelection.vue'
import type { Category, SettingItem, Settings, TagMode, Theme, WebsitePreference } from '@/types'
import { WITH_SERVER, getText, isEqual, loadLanguageAsync, secretIdStorage } from '@/utils'
import * as S from '@/utils/settings'
import { reqGetData, reqPostData } from '@/api'

const settingStore = useSettingStore()
const siteStore = useSiteStore()

/* ThemeSetting */
function renderThemeLabel(option: SettingItem<Theme>): VNode {
  const currentTheme = S.theme.children.find(item => item.key === option.key)!
  const bgColor = currentTheme.value!.bgC
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

/* WebsitePreference */
function handleWebsitePreferenceChange(key: WebsitePreference) {
  siteStore.setCateIndex(0)
  settingStore.setSettings({ websitePreference: key })
  settingStore.refreshSiteContainer()
}

/* 导入导出 */
export interface CacheData {
  data: Category[]
  settings: Settings
}

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
  $message.success(t('messages.exported'))
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
        settingStore.refreshSiteContainer()
        $message.success(t('messages.imported'))
      }
      catch (err: any) {
        $message.error(t('messages.warnInvalidImport'))
      }
    }
  })
  inputElement.click()
}

/* 重置预设 */
function resetData() {
  $dialog.warning({
    title: t('messages.tip'),
    content: t('messages.warnResetData'),
    positiveText: t('button.confirm'),
    negativeText: t('button.cancel'),
    onPositiveClick() {
      siteStore.restoreData()
      settingStore.restoreSettings()
      toggleTheme(settingStore.settings.theme)
      loadLanguageAsync(settingStore.settings.language)
      settingStore.refreshSiteContainer()
      $message.success(t('messages.reset'))
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

const secretId = ref(secretIdStorage.get())
const syncId = ref('')

function validateSyncId() {
  if (/^\w{5,20}$/.test(syncId.value))
    return true

  $message.warning(t('messages.warnValidateId'))
  return false
}

function handleSaveData() {
  if (!validateSyncId())
    return

  if (settingStore.getSettingValue('websitePreference') !== 'Customize') {
    $message.warning(t('messages.warnCustomize'))
    return
  }
  const loadingRef = $message.loading(t('messages.saving'), { duration: 0 })
  reqPostData({
    id: syncId.value,
    data: {
      data: siteStore.data,
      settings: settingStore.settings,
    },
  }).then((res: any) => {
    if (res.code !== 0)
      throw new Error(res.msg)

    secretIdStorage.set(res.data.id)
    secretId.value = res.data.id
    syncId.value = ''
    $message.success(t('messages.saveSuccess'))
  }).catch((err: Error) => {
    $message.error(err.message)
  }).finally(() => {
    loadingRef.destroy()
  })
}

function handleReadData() {
  if (!validateSyncId())
    return

  const loadingRef = $message.loading(t('messages.reading'), { duration: 0 })
  reqGetData(syncId.value).then((res: any) => {
    if (res.code !== 0)
      throw new Error(res.msg)

    secretIdStorage.set(res.data.id)
    secretId.value = res.data.id
    syncId.value = ''

    loadData(res.data.data)
    settingStore.setSettings({ websitePreference: 'Customize' })
    settingStore.refreshSiteContainer()
    $message.success(t('messages.readSuccess'))
  }).catch((err: Error) => {
    $message.error(err.message)
  }).finally(() => {
    loadingRef.destroy()
  })
}

function handleStopSync() {
  secretIdStorage.remove()
  secretId.value = ''
}

function replaceLocalData(id: string) {
  reqGetData(id).then((res: any) => {
    if (res.code !== 0)
      throw new Error(res.msg)

    const remoteData = res.data.data
    const localData = {
      data: siteStore.data,
      settings: settingStore.settings,
    }

    if (!isEqual(remoteData, localData)) {
      loadData(remoteData)
      settingStore.refreshSiteContainer()
    }
  }).catch((err) => {
    console.error(err)
  })
}

onMounted(() => {
  const id = secretIdStorage.get()
  if (WITH_SERVER && id)
    replaceLocalData(id)
})
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
        :on-update-value="handleWebsitePreferenceChange"
      />
      <SettingSelection
        v-model="settingStore.settings.tagMode"
        :title="S.tagMode.name"
        :options="S.tagMode.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: TagMode) => settingStore.setSettings({ tagMode: key })"
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
        v-model="settingStore.settings.linkStrategy"
        :title="S.linkStrategy.name"
        :options="S.linkStrategy.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ linkStrategy: key })"
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
        v-model="settingStore.settings.showSecond"
        :title="S.showSecond.name"
        :options="S.showSecond.children"
        label-field="name"
        value-field="key"
        :on-update-value="(key: string) => settingStore.setSettings({ showSecond: key })"
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
    <div v-if="WITH_SERVER" mt-16 flex-center py-12>
      <div flex-center gap-12>
        <n-input v-if="!secretId" v-model:value="syncId" placeholder="输入ID" />
        <n-button v-else type="success" disabled>{{ $t('button.dataInSync') }}</n-button>
        <div v-if="!secretId" flex gap-12>
          <n-button secondary @click="handleSaveData">
            {{ $t('button.save') }}
          </n-button>
          <n-button secondary @click="handleReadData">
            {{ $t('button.read') }}
          </n-button>
        </div>
        <n-button v-else secondary @click="handleStopSync">
          {{ $t('button.stopSync') }}
        </n-button>
      </div>
    </div>
    <div mt-16 flex flex-wrap justify-center gap-12>
      <n-button type="primary" quaternary @click="resetData">
        {{ $t('button.resetData') }}
      </n-button>
      <n-button type="success" tertiary @click="importData">
        {{ $t('button.importData') }}
      </n-button>
      <n-button type="success" secondary @click="exportData">
        {{ $t('button.exportData') }}
      </n-button>
    </div>
    <div my-16 flex-center>
      <n-button size="large" type="primary" @click="$router.back()">
        {{ $t('button.complete') }}
      </n-button>
    </div>
  </section>
</template>
