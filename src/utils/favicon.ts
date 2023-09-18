const FAVICON_API = 'https://api.iowen.cn/favicon/'

function getDomain(url: string) {
  const urlRegular = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/ // /^https?:\/\/[\d\w.]+/
  const result = url.match(urlRegular)
  if (!result)
    return ''
  // return result[0].replace(/^https?:\/\//, '') + '.png'
  return `${result[0]}.png`
}

export function getFaviconUrl(url: string) {
  return FAVICON_API + getDomain(url)
}
