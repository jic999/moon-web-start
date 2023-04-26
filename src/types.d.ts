import { LoadingBarProviderInst, DialogProviderInst, MessageProviderInst, NotificationProviderInst } from 'naive-ui';
import { HTMLAttributes } from 'vue'


export {}

declare module 'vue' {
  interface HTMLAttributes {
    [key: string]: unknown
  }
}

declare global {
  interface Window {
    $loadingBar: LoadingBarProviderInst
    $dialog: DialogProviderInst
    $message: MessageProviderInst
    $notification: NotificationProviderInst
  }
}