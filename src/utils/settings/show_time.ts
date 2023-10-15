import { SettingItem, type SettingItemChildren } from '@/types'

const showTimeList: SettingItemChildren<boolean> = [
  { name: () => t('settings.common.show'), key: 'Show', value: true },
  { name: () => t('settings.common.hide'), key: 'Hide', value: false },
]

export const showTime = new SettingItem({
  name: () => t('settings.showTime.title'),
  key: 'ShowTime',
  children: showTimeList,
  defaultKey: 'Show',
})
