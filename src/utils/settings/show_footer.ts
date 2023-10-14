import { SettingItem, type SettingItemChildren } from '@/types'

const showFooterList: SettingItemChildren<boolean> = [
  { name: '显示', enName: 'Show', value: true },
  { name: '隐藏', enName: 'Hide', value: false },
]

export const showFooter = new SettingItem({
  name: '显示页脚',
  enName: 'Show Footer',
  children: showFooterList,
  defaultKey: 'Show',
})
