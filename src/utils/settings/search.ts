import type { Search, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const searchList: SettingItemChildren<Search> = [
  {
    name: '必应',
    key: 'Bing',
    value: { name: '必应', key: 'Bing', url: 'https://www.bing.com/search', wd: 'q', favicon: '/svg/bing.svg', s: 'bi' },
  },
  {
    name: '百度',
    key: 'Baidu',
    value: { name: '百度', key: 'Baidu', url: 'https://www.baidu.com/s', wd: 'wd', favicon: '/svg/baidu.svg', s: 'bd' },
  },
  {
    name: '谷歌',
    key: 'Google',
    value: { name: '谷歌', key: 'Google', url: 'https://www.google.com/search', wd: 'q', favicon: '/svg/google.svg', s: 'gg' },
  },
  {
    name: '搜狗',
    key: 'Sogou',
    value: { name: '搜狗', key: 'Sogou', url: 'https://www.sogou.com/web', wd: 'wd', favicon: '/svg/sogou.svg', s: 'sg' },
  },
  {
    name: '维基',
    key: 'Wikipedia',
    value: { name: '维基百科', key: 'Wikipedia', url: 'https://zh.wikipedia.org/w/index.php', wd: 'search', favicon: '/svg/wikipedia.svg', s: 'vk' },
  },
]

export const search = new SettingItem({
  name: '搜索引擎',
  key: 'Search',
  children: searchList,
  defaultKey: 'Bing',
})
