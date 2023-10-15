import { SettingItem, type SettingItemChildren } from '@/types'

const showDateList: SettingItemChildren<boolean> = [
  { name: () => t('settings.common.show'), key: 'Show', value: true },
  { name: () => t('settings.common.hide'), key: 'Hide', value: false },
]

export const showDate = new SettingItem({
  name: () => t('settings.showDate.title'),
  key: 'ShowLunar',
  children: showDateList,
  defaultKey: 'Show',
})
