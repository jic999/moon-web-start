import type { Search, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const searchList: SettingItemChildren<Search> = [
  {
    name: () => t('settings.searchEngine.bing'),
    key: 'Bing',
    value: { url: 'https://www.bing.com/search', wd: 'q', favicon: '/svg/bing.svg', s: 'bi' },
  },
  {
    name: () => t('settings.searchEngine.baidu'),
    key: 'Baidu',
    value: { url: 'https://www.baidu.com/s', wd: 'wd', favicon: '/svg/baidu.svg', s: 'bd' },
  },
  {
    name: () => t('settings.searchEngine.google'),
    key: 'Google',
    value: { url: 'https://www.google.com/search', wd: 'q', favicon: '/svg/google.svg', s: 'gg' },
  },
  {
    name: () => t('settings.searchEngine.sogou'),
    key: 'Sogou',
    value: { url: 'https://www.sogou.com/web', wd: 'wd', favicon: '/svg/sogou.svg', s: 'sg' },
  },
  {
    name: () => t('settings.searchEngine.wikipedia'),
    key: 'Wikipedia',
    value: { url: 'https://zh.wikipedia.org/w/index.php', wd: 'search', favicon: '/svg/wikipedia.svg', s: 'vk' },
  },
]

export const search = new SettingItem({
  name: () => t('settings.searchEngine.title'),
  key: 'Search',
  children: searchList,
  defaultKey: 'Bing',
})
