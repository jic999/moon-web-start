import type { DialogProviderInst, MessageProviderInst } from 'naive-ui'

import type {
  ComponentCustomOptions as _ComponentCustomOptions,
  ComponentCustomProperties as _ComponentCustomProperties,
} from 'vue'

export {}

declare module 'vue' {
  interface HTMLAttributes {
    [key: string]: unknown
  }
}

declare global {
  const $dialog: DialogProviderInst
  const $message: MessageProviderInst

  interface Window {
    $dialog: DialogProviderInst
    $message: MessageProviderInst

    sug?: Function
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends _ComponentCustomProperties {}
  interface ComponentCustomOptions extends _ComponentCustomOptions {}
}
