import { SettingItem, type SettingItemChildren } from '@/types'

const showLunarList: SettingItemChildren<boolean> = [
  { name: () => t('settings.common.show'), key: 'Show', value: true },
  { name: () => t('settings.common.hide'), key: 'Hide', value: false },
]

export const showLunar = new SettingItem({
  name: () => t('settings.showLunar.title'),
  key: 'ShowLunar',
  children: showLunarList,
  defaultKey: 'Hide',
})
