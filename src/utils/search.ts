export interface Search {
  name: string
  enName: string
  url: string
  key: string
  favicon: string
}

export const searchList: Search[] = [
  { name: '必应', enName: 'Bing', url: 'https://www.bing.com/search', key: 'q', favicon: '/svg/bing.svg' },
  { name: '百度', enName: 'Baidu', url: 'https://www.baidu.com/s', key: 'wd', favicon: '/svg/baidu.svg' },
  { name: '谷歌', enName: 'Google', url: 'https://www.google.com/search', key: 'q', favicon: '/svg/google.svg' },
  { name: '搜狗', enName: 'Sougou', url: 'https://www.sogou.com/web', key: 'query', favicon: '/svg/sogou.svg' },
]
