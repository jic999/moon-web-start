import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

function target(wd) {
  return 'https://www.qiuwenbaike.cn/index.php?search=' + encodeURIComponent(wd)
}

function complete(wd, callback) {
  axios.get('https://www.qiuwenbaike.cn/api.php', {
    params: {
      action: 'opensearch',
      format: 'json',
      formatversion: 2,
      limit: 10,
      search: wd,
    },
    adapter: jsonpAdapter,
  }).then(resposnse => {
    callback({
      eng: 'qiuwenbaike',
      wd: resposnse.data[0],
      list: resposnse.data[1],
    })
  }).catch(error => console.error(error))
}

export default {
  target,
  complete,
}
