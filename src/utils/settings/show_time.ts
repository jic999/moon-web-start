import { SettingItem, type SettingItemChildren } from '@/types'

const showTimeList: SettingItemChildren<boolean> = [
  { name: '显示', enName: 'Show', value: true },
  { name: '隐藏', enName: 'Hide', value: false },
]

export const showTime = new SettingItem({
  name: '显示时间',
  enName: 'Show Time',
  children: showTimeList,
  defaultKey: 'Show',
})
