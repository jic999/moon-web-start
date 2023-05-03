const FAVICON_API = 'https://api.iowen.cn/favicon/'
const DEFAULT_FAVICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0xNyAyMmgydjJoLTJ6IiBmaWxsPSJjdXJyZW50Q29sb3IiPjwvcGF0aD48cGF0aCBkPSJNMTcgMThoMnYyaC0yeiIgZmlsbD0iY3VycmVudENvbG9yIj48L3BhdGg+PHBhdGggZD0iTTE0IDI0aDN2MmgtM3oiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAyYTE0IDE0IDAgMSAwIDE0IDE0QTE0LjAxNiAxNC4wMTYgMCAwIDAgMTYgMnpNNC43IDIwSDZsNC4xNzcgMi42YTEgMSAwIDAgMCAxLjM2LS4yOTRsMS4wMDgtMS41MTJhMSAxIDAgMCAwLS4xMjUtMS4yNjFMMTAgMTcuMTEyTDExIDE0aDUuMzIzYTEgMSAwIDAgMCAuOTI4LS42MjhsMS41ODItMy45NTVhMSAxIDAgMCAwLS4wMzQtLjgxOWwtMi4yODYtNC41NzJBMTEuOTY1IDExLjk2NSAwIDAgMSAyNi4zNzYgMjJIMjNhMSAxIDAgMCAwLTEgMXYzLjM3N0ExMS45NTggMTEuOTU4IDAgMCAxIDQuNyAyMHoiIGZpbGw9ImN1cnJlbnRDb2xvciI+PC9wYXRoPjwvc3ZnPg=='

function getDomain(url: string) {
  const urlRegular = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/ // /^https?:\/\/[\d\w.]+/
  const result = url.match(urlRegular)
  if (!result)
    return ''
  // return result[0].replace(/^https?:\/\//, '') + '.png'
  return `${result[0]}.png`
}

export function getFaviconUrl(url: string) {
  const paramsUrl = getDomain(url)
  if (!paramsUrl)
    return DEFAULT_FAVICON
  return FAVICON_API + getDomain(url)
}
