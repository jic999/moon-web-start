import { SettingItem, type SettingItemChildren } from '@/types'

const showFooterList: SettingItemChildren<boolean> = [
  { name: '显示', key: 'Show', value: true },
  { name: '隐藏', key: 'Hide', value: false },
]

export const showFooter = new SettingItem({
  name: '显示页脚',
  key: 'ShowFooter',
  children: showFooterList,
  defaultKey: 'Show',
})
