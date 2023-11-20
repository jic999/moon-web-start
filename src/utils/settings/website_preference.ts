import type { SettingItemChildren, WebsitePreference } from '@/types'
import { SettingItem } from '@/types'

const websitePreferenceList: SettingItemChildren<WebsitePreference> = [
  { name: () => t('settings.sitePreference.auto'), key: 'Auto', value: 'Auto' },
  { name: () => t('settings.sitePreference.chineseMainland'), key: 'ChineseMainland', value: 'ChineseMainland' },
  { name: () => t('settings.sitePreference.global'), key: 'Global', value: 'Global' },
  { name: () => t('settings.sitePreference.customize'), key: 'Customize', value: 'Customize' },
]

export const websitePreference = new SettingItem({
  name: () => t('settings.sitePreference.title'),
  key: 'WebsitePreference',
  children: websitePreferenceList,
  defaultKey: 'Auto',
})
