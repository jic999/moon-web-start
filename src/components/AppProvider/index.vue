<script setup lang="ts" name="AppProvider">
import { defineComponent, h } from 'vue'
import {
  dateZhCN,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'

const themeOverrides = {
  common: {
    primaryColor: '#0d9488',
    primaryColorHover: '#0d9488dd',
    primaryColorPressed: '#0f766e',
    primaryColorSuppl: '#0f766edd',
  },
}

function setupNaiveTools() {
  window.$loadingBar = useLoadingBar()
  window.$dialog = useDialog()
  window.$message = useMessage()
  window.$notification = useNotification()
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools()
  },
  render() {
    return h('div')
  },
})
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    preflight-style-disabled
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot />
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
