import type { Language, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const languageList: SettingItemChildren<Language> = [
  { name: '跟随系统', enName: 'System', value: 'System' },
  { name: '简体中文', enName: 'zh-CN', value: 'zh-CN' },
  { name: 'English', enName: 'en', value: 'en' },
]

export const language = new SettingItem({
  name: '网站语言',
  enName: 'Language',
  children: languageList,
  defaultKey: 'System',
})
