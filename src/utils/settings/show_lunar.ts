import { SettingItem, type SettingItemChildren } from '@/types'

const showLunarList: SettingItemChildren<boolean> = [
  { name: '显示', enName: 'Show', value: true },
  { name: '隐藏', enName: 'Hide', value: false },
]

export const showLunar = new SettingItem({
  name: '显示农历',
  enName: 'Show Lunar',
  children: showLunarList,
  defaultKey: 'Show',
})
