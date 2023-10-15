import { SettingItem, type SettingItemChildren } from '@/types'

const showTimeList: SettingItemChildren<boolean> = [
  { name: '显示', key: 'Show', value: true },
  { name: '隐藏', key: 'Hide', value: false },
]

export const showTime = new SettingItem({
  name: '显示时间',
  key: 'ShowTime',
  children: showTimeList,
  defaultKey: 'Show',
})
