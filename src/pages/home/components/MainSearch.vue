<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { Search } from '@/utils'
import { getFaviconUrl, searchList } from '@/utils'

const settingStore = useSettingStore()

const keyword = ref('')
// 从settings获取初始index
const currentIndex = ref(0)

function initCurrentIndex() {
  currentIndex.value = searchList.findIndex(search => search.enName === settingStore.settings.search) || 0
}
watch(() => settingStore.settings.search, () => {
  initCurrentIndex()
}, { immediate: true })

function search() {
  if (!keyword.value.trim())
    return
  const currentSearch = searchList[currentIndex.value]
  window.open(`${currentSearch.value.url}?${currentSearch.value.key}=${keyword.value}`)
}
function _getFavicon(search: Search) {
  return search.favicon || getFaviconUrl(search.url)
}
function changeSearch(i: number) {
  currentIndex.value = i
  toggleSelection()
}

const selectionVisible = ref(false)

// Don't use 'useClickOutside' because it will still trigger the click event when the selection is closed
let toggleTimer: NodeJS.Timer | null
function toggleSelection() {
  if (toggleTimer)
    return
  toggleTimer = setTimeout(() => {
    selectionVisible.value = !selectionVisible.value
    toggleTimer = null
  }, 10)
}

const { iconStyle } = useIconStyle()
</script>

<template>
  <div my-24 flex-center>
    <div flex bg-gray-200 h-40 dark="bg-black">
      <div relative flex-center w-40>
        <img
          :src="_getFavicon(searchList[currentIndex].value)"
          :style="iconStyle"
          cursor-pointer circle h-26 w-26
          @click="toggleSelection"
        >
        <div
          v-if="selectionVisible"
          v-on-click-outside="toggleSelection"
          absolute z-9 border bg-fff l-0 t-100p w-200
          dark="border-gray-8 bg-black"
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
              <img :src="_getFavicon(item.value)" :style="iconStyle" circle h-20 w-20>
              <div>{{ item.name }}</div>
            </div>
            <div v-if="currentIndex === i " i-carbon:checkmark text-18 />
          </div>
        </div>
      </div>
      <input v-model="keyword" bg-inherit text="16 text-$text-c-1" dark="text-$text-dark-c-1" w-260 @keydown.enter="search">
      <button flex-center gap-x-4 w-72 btn @click="search">
        <span i-carbon:search inline-block text-14 />
        搜索
      </button>
    </div>
  </div>
</template>
