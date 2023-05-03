<script setup lang="ts">
import {
  darkTheme,
  dateZhCN,
  useDialog,
  useLoadingBar,
  useMessage,
  useNotification,
  zhCN,
} from 'naive-ui'

const {
  primaryC,
  primaryLightC,
  primaryDarkC,
} = themeVars

defineOptions({
  name: 'AppProvider',
})

const themeOverrides = computed(() => {
  return {
    common: {
      primaryColor: primaryC.value,
      primaryColorHover: primaryLightC.value,
      primaryColorPressed: primaryDarkC.value,
    },
  }
})

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
    :theme="isDark ? darkTheme : undefined"
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
