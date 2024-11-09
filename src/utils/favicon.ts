const FAVICON_API = import.meta.env.VITE_WITH_SERVER ? import.meta.env.VITE_FAVICON_API : 'https://api.iowen.cn/favicon'

const siteToUrl: Map<string, string> = new Map()
const sites: string[] = [
  'clougence.com',
  'jd.com',
  'taobao.com',
  'pinduoduo.com',
]

sites.forEach((e: string) => {
  siteToUrl.set(e, `/site/${e}.svg`)
})

export function getDomainName(url: string) {
  let domain = url.replace(/(^\w+:|^)\/\//, '')
  domain = domain.replace(/^www\./, '')

  const matches = domain.match(/([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/)

  if (matches && matches.length > 1)
    return matches[1]

  return null
}

export function getFaviconUrl(url: string) {
  const paramsUrl = getDomainName(url)
  if (paramsUrl == null)
    return ''

  const optUrl = siteToUrl.get(paramsUrl)
  if (optUrl)
    return optUrl

  return `${FAVICON_API}/${paramsUrl}.png`
}
