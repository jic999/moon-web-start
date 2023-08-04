import type { SettingItem } from '@/stores/setting'

export interface Search {
  name: string
  enName: string
  url: string
  key: string
  favicon: string
  s: string
}
export type SearchSetting = SettingItem<Search>
export const searchList: SearchSetting[] = [
  {
    name: '必应',
    enName: 'Bing',
    value: { name: '必应', enName: 'Bing', url: 'https://www.bing.com/search', key: 'q', favicon: '/svg/bing.svg', s: 'bi' },
  },
  {
    name: '百度',
    enName: 'Baidu',
    value: { name: '百度', enName: 'Baidu', url: 'https://www.baidu.com/s', key: 'wd', favicon: '/svg/baidu.svg', s: 'bd' },
  },
  {
    name: '谷歌',
    enName: 'Google',
    value: { name: '谷歌', enName: 'Google', url: 'https://www.google.com/search', key: 'q', favicon: '/svg/google.svg', s: 'gg' },
  },
  {
    name: '搜狗',
    enName: 'Sougou',
    value: { name: '搜狗', enName: 'Sougou', url: 'https://www.sogou.com/web', key: 'query', favicon: '/svg/sogou.svg', s: 'sg' },
  },
  // { name: '必应', enName: 'Bing', url: 'https://www.bing.com/search', key: 'q', favicon: '/svg/bing.svg' },
  // { name: '百度', enName: 'Baidu', url: 'https://www.baidu.com/s', key: 'wd', favicon: '/svg/baidu.svg' },
  // { name: '谷歌', enName: 'Google', url: 'https://www.google.com/search', key: 'q', favicon: '/svg/google.svg' },
  // { name: '搜狗', enName: 'Sougou', url: 'https://www.sogou.com/web', key: 'query', favicon: '/svg/sogou.svg' },
]
