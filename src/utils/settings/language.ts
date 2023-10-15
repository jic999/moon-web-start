import type { Language, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const languageList: SettingItemChildren<Language> = [
  { name: '跟随系统', key: 'System', value: 'System' },
  { name: '简体中文', key: 'zh-CN', value: 'zh-CN' },
  { name: 'English', key: 'en', value: 'en' },
]

export const language = new SettingItem({
  name: '网站语言',
  key: 'Language',
  children: languageList,
  defaultKey: 'System',
})
