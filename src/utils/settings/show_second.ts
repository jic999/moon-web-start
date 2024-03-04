import { SettingItem, type SettingItemChildren } from '@/types'

const showSecondList: SettingItemChildren<boolean> = [
  { name: () => t('settings.common.show'), key: 'Show', value: true },
  { name: () => t('settings.common.hide'), key: 'Hide', value: false },
]

export const showSecond = new SettingItem({
  name: () => t('settings.showSecond.title'),
  key: 'ShowSecond',
  children: showSecondList,
  defaultKey: 'Hide',
})
