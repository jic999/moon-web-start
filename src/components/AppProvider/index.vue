<script setup lang="ts">
import {
  darkTheme,
  dateZhCN,
  useDialog,
  useNotification,
  zhCN,
} from 'naive-ui'

defineOptions({
  name: 'AppProvider',
})

const {
  primaryC,
  primaryLightC,
  primaryDarkC,
} = themeVars

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
  window.$dialog = useDialog()
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
    style="position: relative;"
  >
    <n-dialog-provider>
      <n-notification-provider>
        <slot />
        <NaiveProviderContent />
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
