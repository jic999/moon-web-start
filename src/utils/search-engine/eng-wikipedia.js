import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

function target(wd) {
  return `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(wd)}`
}

function complete(wd, callback) {
  axios.get('https://zh.wikipedia.org/w/api.php', {
    params: {
      action: 'opensearch',
      format: 'json',
      formatversion: 2,
      limit: 10,
      search: wd,
    },
    adapter: jsonpAdapter,
  }).then((response) => {
    callback({
      eng: 'wikipedia',
      wd: response.data[0],
      list: response.data[1],
    })
  }).catch(error => console.error(error))
}

export default {
  target,
  complete,
}
