import type { SettingItemChildren, WebsitePreference } from '@/types'
import { SettingItem } from '@/types'

const websitePreferenceList: SettingItemChildren<WebsitePreference> = [
  {
    name: '自动',
    enName: 'Auto',
    value: 'Auto',
  },
  {
    name: '中国大陆',
    enName: 'Chinese Mainland',
    value: 'Chinese Mainland',
  },
  {
    name: '全球',
    enName: 'Global',
    value: 'Global',
  },
  {
    name: '自定义',
    enName: 'Customize',
    value: 'Customize',
  },
]

export const websitePreference = new SettingItem({
  name: '网站偏好',
  enName: 'Website Preference',
  children: websitePreferenceList,
  defaultKey: 'Auto',
})
