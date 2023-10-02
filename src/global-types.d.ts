import type { DialogProviderInst, NotificationProviderInst } from 'naive-ui'

export {}

declare module 'vue' {
  interface HTMLAttributes {
    [key: string]: unknown
  }
}

declare global {
  interface Window {
    $dialog: DialogProviderInst
    $notification: NotificationProviderInst
  }
}
