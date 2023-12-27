import type { SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const linkStrategyList: SettingItemChildren<string> = [
  { name: () => t('settings.linkStrategy.currentTab'), key: 'currentTab', value: '_self' },
  { name: () => t('settings.linkStrategy.newTab'), key: 'newTab', value: '_blank' },
]

export const linkStrategy = new SettingItem({
  name: () => t('settings.linkStrategy.title'),
  key: 'LinkStrategy',
  children: linkStrategyList,
  defaultKey: 'newTab',
})
