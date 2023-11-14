import fetchJsonp from 'fetch-jsonp'
import { objToQuery } from '../request'

function target(wd: string) {
  return `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(wd)}`
}

function complete(wd: string, callback: Function) {
  const query = objToQuery({
    action: 'opensearch',
    format: 'json',
    formatversion: 2,
    limit: 10,
    search: wd,
  })
  fetchJsonp(`https://zh.wikipedia.org/w/api.php?${query}`)
    .then(res => res.json())
    .then((data) => {
      callback({
        eng: 'wikipedia',
        wd: data[0],
        list: data[1],
      })
    })
    .catch(error => console.error(error))
}

export default {
  target,
  complete,
}
