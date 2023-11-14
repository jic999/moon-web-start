import type { Language, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const languageList: SettingItemChildren<Language> = [
  { name: () => t('settings.language.system'), key: 'System', value: 'System' },
  { name: () => '简体中文', key: 'zh-CN', value: 'zh-CN' },
  { name: () => 'English', key: 'en', value: 'en' },
  { name: () => '日本語', key: 'ja', value: 'ja' },
]

export const language = new SettingItem({
  name: () => t('settings.language.title'),
  key: 'Language',
  children: languageList,
  defaultKey: 'System',
})
