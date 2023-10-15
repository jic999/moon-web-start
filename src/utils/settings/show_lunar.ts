import { SettingItem, type SettingItemChildren } from '@/types'

const showLunarList: SettingItemChildren<boolean> = [
  { name: '显示', key: 'Show', value: true },
  { name: '隐藏', key: 'Hide', value: false },
]

export const showLunar = new SettingItem({
  name: '显示农历',
  key: 'ShowLunar',
  children: showLunarList,
  defaultKey: 'Show',
})
