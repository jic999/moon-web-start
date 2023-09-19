import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

function target(wd) {
  return 'https://www.baidu.com/s?wd=' + encodeURIComponent(wd)
}

function complete(wd, callback) {
  axios.get('https://www.baidu.com/sugrec', {
    params: {
      prod: 'wise',
      wd: wd,
    },
    adapter: jsonpAdapter,
  }).then(resposnse => {
    callback({
      eng: 'baidu',
      wd: resposnse.data.q,
      list: resposnse.data.g ?
        resposnse.data.g.map(g => g.q) : [],
    })
  }).catch(error => console.error(error))
}

export default {
  target,
  complete,
}
