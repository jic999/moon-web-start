<script setup lang="ts">
import {
  darkTheme,
  dateZhCN,
  useDialog,
  useMessage,
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
  window.$message = useMessage()
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
      <n-message-provider>
        <slot />
        <NaiveProviderContent />
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
