import type { SettingItemChildren, WebsitePreference } from '@/types'
import { SettingItem } from '@/types'

const websitePreferenceList: SettingItemChildren<WebsitePreference> = [
  { name: () => t('settings.sitePreference.auto'), key: 'Auto' },
  { name: () => t('settings.sitePreference.chineseMainland'), key: 'ChineseMainland' },
  { name: () => t('settings.sitePreference.global'), key: 'Global' },
  { name: () => t('settings.sitePreference.customize'), key: 'Customize' },
]

export const websitePreference = new SettingItem({
  name: () => t('settings.sitePreference.title'),
  key: 'WebsitePreference',
  children: websitePreferenceList,
  defaultKey: 'Auto',
})
