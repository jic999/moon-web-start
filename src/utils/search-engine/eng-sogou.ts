import fetchJsonp from 'fetch-jsonp'
import { objToQuery } from '../request'

function target(wd: string) {
  return `https://www.sogou.com/web?query=${encodeURIComponent(wd)}`
}

function complete(wd: string, callback: Function) {
  const url = `https://wap.sogou.com/web/sugg/${encodeURIComponent(wd)}`
  const query = objToQuery({
    vr: 1,
    s: 1,
    source: 'wapsearch',
    encrypt: 0,
    cb: 'sug',
  })

  window.sug = (res: any) => {
    callback({
      eng: 'sogou',
      wd: res.q,
      list: res.s ? res.s.map((s: any) => s.q) : [],
    })
  }
  // TODO: 会报错请求超时，但不影响使用，暂时先这样处理
  fetchJsonp(`${url}?${query}`, { jsonpCallback: 'sug' })
    .catch(error => error)
}

export default {
  target,
  complete,
}
