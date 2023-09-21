import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

function target(wd) {
  return `https://www.sogou.com/web?query=${encodeURIComponent(wd)}`
}

function complete(wd, callback) {
  const url = `https://wap.sogou.com/web/sugg/${encodeURIComponent(wd)}`
  window.sug = function (response) {
    callback({
      eng: 'sogou',
      wd: response.q,
      list: response.s
        ? response.s.map(s => s.q)
        : [],
    })
  }
  axios.get(url, {
    params: {
      vr: 1,
      s: 1,
      source: 'wapsearch',
      encrypt: 0,
      cb: 'sug',
    },
    adapter: jsonpAdapter,
  }).catch(error => console.error(error))
}

export default {
  target,
  complete,
}
