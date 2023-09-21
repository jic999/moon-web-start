import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

function target(wd) {
  return `https://www.baidu.com/s?wd=${encodeURIComponent(wd)}`
}

function complete(wd, callback) {
  axios.get('https://www.baidu.com/sugrec', {
    params: {
      prod: 'wise',
      wd,
    },
    adapter: jsonpAdapter,
  }).then((response) => {
    callback({
      eng: 'baidu',
      wd: response.data.q,
      list: response.data.g
        ? response.data.g.map(g => g.q)
        : [],
    })
  }).catch(error => console.error(error))
}

export default {
  target,
  complete,
}
