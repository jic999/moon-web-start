import type { DialogProviderInst, MessageProviderInst, NotificationProviderInst } from 'naive-ui'

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
