import type { SettingItemChildren, WebsitePreference } from '@/types'
import { SettingItem } from '@/types'

const websitePreferenceList: SettingItemChildren<WebsitePreference> = [
  { name: '自动', key: 'Auto', value: 'Auto' },
  { name: '中国大陆', key: 'ChineseMainland', value: 'Chinese Mainland' },
  { name: '全球', key: 'Global', value: 'Global' },
  { name: '自定义', key: 'Customize', value: 'Customize' },
]

export const websitePreference = new SettingItem({
  name: '网站偏好',
  key: 'WebsitePreference',
  children: websitePreferenceList,
  defaultKey: 'Auto',
})
