
const FAVICON_API = 'https://api.iowen.cn/favicon/'

export const DEFAULT_FAVICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0xNyAyMmgydjJoLTJ6IiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBkPSJNMTcgMThoMnYyaC0yeiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+PHBhdGggZD0iTTE0IDI0aDN2MmgtM3oiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAyYTE0IDE0IDAgMSAwIDE0IDE0QTE0LjAxNiAxNC4wMTYgMCAwIDAgMTYgMnpNNC43IDIwSDZsNC4xNzcgMi42YTEgMSAwIDAgMCAxLjM2LS4yOTRsMS4wMDgtMS41MTJhMSAxIDAgMCAwLS4xMjUtMS4yNjFMMTAgMTcuMTEyTDExIDE0aDUuMzIzYTEgMSAwIDAgMCAuOTI4LS42MjhsMS41ODItMy45NTVhMSAxIDAgMCAwLS4wMzQtLjgxOWwtMi4yODYtNC41NzJBMTEuOTY1IDExLjk2NSAwIDAgMSAyNi4zNzYgMjJIMjNhMSAxIDAgMCAwLTEgMXYzLjM3N0ExMS45NTggMTEuOTU4IDAgMCAxIDQuNyAyMHoiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPjwvc3ZnPg=='

const siteToUrl: Map<string, string> = new Map()
const sites: string[] = [
  "clougence.com",
  "jd.com",
  "taobao.com",
  "pinduoduo.com"
]
const otherUrls: string[] = [
  'github.com',
  'coding.net',
  '500px.com',
  'themeforest.net'
]

sites.forEach((e: string) => {
  siteToUrl.set(e , '/site/' + e + '.svg')
})

otherUrls.forEach((url: string) => {
  siteToUrl.set(url, 'https://0x3.com/icon?host=' + url)
})

function getDomainName(url: string) {
  var domain = url.replace(/(^\w+:|^)\/\//, '')
  domain = domain.replace(/^www\./, '')

  var matches = domain.match(/([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/)

  if (matches && matches.length > 1) {
    return matches[1]
  }

  return null
}

export function getFaviconUrl(url: string) {
  const paramsUrl = getDomainName(url)
  if (paramsUrl == null) {
    return DEFAULT_FAVICON
  }

  const optUrl = siteToUrl.get(paramsUrl)
  if (optUrl) {
    return optUrl
  }
  
  return FAVICON_API + getDomainName(url) + '.png'
}
