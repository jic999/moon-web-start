import { SettingItem, type SettingItemChildren } from '@/types'

const showFooterList: SettingItemChildren<boolean> = [
  { name: () => t('settings.common.show'), key: 'Show', value: true },
  { name: () => t('settings.common.hide'), key: 'Hide', value: false },
]

export const showFooter = new SettingItem({
  name: () => t('settings.showFooter.title'),
  key: 'ShowFooter',
  children: showFooterList,
  defaultKey: 'Show',
})
