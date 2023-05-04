<script setup lang="ts">
// TODO 搜索框
import { vOnClickOutside } from '@vueuse/components'
import { getFaviconUrl } from '@/utils'

interface Search {
  name: string
  url: string
  key: string
  favicon: string
}

const currentIndex = ref(0)
const keyword = ref('')
const searchList: Search[] = [
  { name: '必应', url: 'https://www.bing.com/search', key: 'q', favicon: '/svg/bing.svg' },
  { name: '百度', url: 'https://www.baidu.com/s', key: 'wd', favicon: '/svg/baidu.svg' },
  { name: '谷歌', url: 'https://www.google.com/search', key: 'q', favicon: '/svg/google.svg' },
  { name: '搜狗', url: 'https://www.sogou.com/web', key: 'query', favicon: '/svg/sogou.svg' },
]
function search() {
  if (!keyword.value.trim())
    return
  const currentSearch = searchList[currentIndex.value]
  window.open(`${currentSearch.url}?${currentSearch.key}=${keyword.value}`)
}
function _getFavicon(search: Search) {
  return search.favicon || getFaviconUrl(search.url)
}
function changeSearch(i: number) {
  currentIndex.value = i
  toggleSelection()
}

const selectionVisible = ref(false)

let toggleTimer: NodeJS.Timer | null
function toggleSelection() {
  if (toggleTimer)
    return
  toggleTimer = setTimeout(() => {
    selectionVisible.value = !selectionVisible.value
    toggleTimer = null
  }, 50)
}
</script>

<template>
  <div my-24 flex-center>
    <div flex bg-gray-200 h-40 dark="bg-black">
      <div relative flex-center w-40>
        <img
          :src="_getFavicon(searchList[currentIndex])"
          cursor-pointer circle h-26 w-26
          @click="toggleSelection"
        >
        <div
          v-if="selectionVisible"
          v-on-click-outside="toggleSelection"
          dark="border-gray-6 bg-black" absolute z-9 border bg-fff l-0 t-100p
          w-200
        >
          <div
            v-for="(item, i) in searchList"
            :key="i"
            :class="{ 'text-$primary-c': currentIndex === i }"
            flex cursor-pointer items-center justify-between text-14 p-5
            hover="bg-$site-hover-c"
            @click="changeSearch(i)"
          >
            <div flex items-center gap-x-8>
              <img :src="_getFavicon(item)" circle h-20 w-20>
              <div>{{ item.name }}</div>
            </div>
            <div v-if="currentIndex === i " i-carbon:checkmark text-18 />
          </div>
        </div>
      </div>
      <input v-model="keyword" bg-inherit text-16 w-260 @keydown.enter="search">
      <button flex-center gap-x-4 w-72 btn @click="search">
        <span i-carbon:search inline-block text-14 />
        搜索
      </button>
    </div>
  </div>
</template>
