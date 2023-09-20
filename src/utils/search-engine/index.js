import engBaidu from './eng-baidu'
import engGoogle from './eng-google'
import engBing from './eng-bing'
import engQiuwenbaike from './eng-qiuwenbaike'
import engWikipedia from './eng-wikipedia'
import engSogou from './eng-sogou'

const ENGINES = {
  Baidu: engBaidu,
  Google: engGoogle,
  Bing: engBing,
  Qiuwenbaike: engQiuwenbaike,
  Wikipedia: engWikipedia,
  Sogou: engSogou,
}

function target(eng, wd) {
  return ENGINES[eng].target(wd)
}

function complete(eng, wd, callback) {
  return ENGINES[eng].complete(wd, callback)
}

export default {
  target,
  complete,
}
