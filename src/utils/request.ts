export function objToQuery(obj: { [key: string]: any }): string {
  const queryString = Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')

  return queryString
}
