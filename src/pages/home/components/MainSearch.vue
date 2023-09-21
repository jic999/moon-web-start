<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components'
import type { Search } from '@/types'
import { debounce, getFaviconUrl, search as searchSetting } from '@/utils'
import searchEngine from '@/utils/search-engine'

const settingStore = useSettingStore()

const searchList = searchSetting.children

const keyword = ref('')

const curSearchIndex = ref(0)

const showKeyDownSel = ref(false)

const noticeKeyList = ref<string[]>([])

const selectedIndex = ref(0)

const searchInputRef = ref<HTMLInputElement>()

function initcurSearchIndex() {
  curSearchIndex.value = searchList.findIndex(search => search.enName === settingStore.settings.search) || 0
}

watch(() => settingStore.settings.search, () => {
  initcurSearchIndex()
}, { immediate: true })

function search() {
  if (!keyword.value.trim())
    return

  const currentSearch = searchList[curSearchIndex.value]
  window.open(`${currentSearch.value.url}?${currentSearch.value.key}=${keyword.value}`)
  clearNoticeKey()
  searchInputRef.value?.blur()
}

function _getFavicon(search: Search) {
  return search.favicon || getFaviconUrl(search.url)
}

function changeSearch(i: number) {
  curSearchIndex.value = i
  toggleSelection()
}

const selectionVisible = ref(false)

// Don't use 'useClickOutside' because it will still trigger the click event when the selection is closed
function toggleSelection() {
  selectionVisible.value = !selectionVisible.value
}

function handleKeydown(e: KeyboardEvent) {
  // - 快捷切换搜索引擎
  if (e.key === '#' && !keyword.value.length)
    selectionVisible.value = true
  const target = (keyword.value + e.key).match(/^#[a-z]+/)
  if (target) {
    const s = target[0].replace('#', '')
    const index = searchList.findIndex(item => item.value.s === s)
    if (index === -1)
      return
    e.preventDefault()
    changeSearch(index)
    keyword.value = ''
    selectionVisible.value = false
  }
  // 关闭搜索引擎选择
  if (keyword.value === '#' && e.key === 'Backspace')
    selectionVisible.value = false
}

const { iconStyle } = useIconStyle()

const requestEngApi = debounce(() => {
  const curSearch = searchList[curSearchIndex.value]
  searchEngine.complete(curSearch.enName, keyword.value, (params: Params) => {
    showKeyDownSel.value = true
    if (keyword.value.trim().length === 0)
      return

    noticeKeyList.value.splice(0, noticeKeyList.value.length || 0)
    noticeKeyList.value.push(keyword.value, ...params.list)
  })
}, 100)

function handleCloseClick() {
  keyword.value = ''
  searchInputRef.value?.focus()
}

function handleInput(_: Event) {
  if (keyword.value.indexOf('#') === 0)
    return
  if (!keyword.value.trim()) {
    clearNoticeKey()
    return
  }
  selectedIndex.value = 0
  requestEngApi()
}

interface Params {
  eng: string
  list: string[]
  wd: string
}

function jumpSearch(i: number) {
  keyword.value = noticeKeyList.value[i]
  search()
}

function clearNoticeKey() {
  showKeyDownSel.value = false
  noticeKeyList.value.splice(0, noticeKeyList.value.length || 0)
  selectedIndex.value = 0
  noticeKeyList.value.push(keyword.value)
}

function keyNext(e: Event) {
  e.preventDefault()
  selectedIndex.value = (selectedIndex.value + 1) % noticeKeyList.value.length || 0
  keyword.value = noticeKeyList.value[selectedIndex.value]
}

function keyPrev(e: Event) {
  e.preventDefault()
  selectedIndex.value = (selectedIndex.value - 1 + noticeKeyList.value.length) % noticeKeyList.value.length || 0
  keyword.value = noticeKeyList.value[selectedIndex.value]
}

function handleKeyRecomend(e: Event) {
  const clickedInput = e.target === searchInputRef.value
  if (clickedInput)
    return

  clearNoticeKey()
}

function handleHover(i: number) {
  selectedIndex.value = i
}

function handleLeave() {
  selectedIndex.value = 0
}

function handleFocus(_: Event) {
  handleInput(new Event('input'))
}

function setActive(i: number) {
  selectedIndex.value = i
}

function setInactive(_: number) {
  selectedIndex.value = 0
}
</script>

<template>
  <div dark="bg-$bg-c" w="full sm:450!" bg="gray-200" relative mx-auto flex h-44>
    <!-- Keyword recommend -->
    <div
      v-show="showKeyDownSel && noticeKeyList.length > 1"
      v-on-click-outside="handleKeyRecomend"
      absolute z-9 w-full h-10em t-100p
      @mouseleave="handleLeave()"
    >
      <!-- keys recommend -->
      <div bg="$main-bg-c" border="2 t-0" z-9 py-6 l-0 t-100p>
        <div
          v-for="(item, i) in noticeKeyList.slice(1)" :key="i + 1" text-15 p-5
          class="cursor-pointer"
          :class="{ 'bg-$site-hover-c': i + 1 === selectedIndex }"
          @mouseover="handleHover(i + 1)"
          @click="jumpSearch(i + 1)"
          @touchstart="setActive(i + 1)"
          @touchend="setInactive(i + 1)"
        >
          <div flex-left gap-x-8 style="margin: 0.75rem; margin-left: 2rem;">
            <div>{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Search engine logo -->
    <div v-on-click-outside="() => selectionVisible = false" relative flex-center shrink-0 w-44>
      <div hover="op-100" h-full w-full flex-center cursor-pointer op="80" transition-300 @click="toggleSelection">
        <img :src="_getFavicon(searchList[curSearchIndex].value)" :style="iconStyle" h-32 w-32>
      </div>
      <!-- search engine selector -->
      <div v-show="selectionVisible" bg="$main-bg-c" border="2 t-0" absolute z-9 l-0 t-100p w-200>
        <div
          v-for="(item, i) in searchList"
          :key="i"
          hover="bg-$site-hover-c"
          flex cursor-pointer items-center justify-between px-12 py-7
          @click="changeSearch(i)"
        >
          <div flex-center gap-x-8 text="15 $text-c-1">
            <img :src="_getFavicon(item.value)" :style="iconStyle" circle h-20 w-20>
            <div>{{ item.name }}</div>
            <div ml-4 font-300>{{ `#${item.value.s}` }}</div>
          </div>
          <div v-if="curSearchIndex === i" i-carbon:checkmark text-18 />
        </div>
      </div>
    </div>
    <!-- Input -->
    <div flex items-center w="full">
      <input
        ref="searchInputRef"
        v-model="keyword"
        text="15 $text-c-1"
        h-full w-full bg-inherit op-80
        @keydown.enter="search"
        @input="handleInput"
        @focus="handleFocus"
        @keydown="handleKeydown"
        @keydown.down.exact="keyNext"
        @keydown.up.exact="keyPrev"
        @keydown.ctrl.n.exact="keyNext"
        @keydown.ctrl.p.exact="keyPrev"
      >
      <div
        v-if="keyword.length > 0"
        hover="op-80"
        i-carbon:close mx-4 cursor-pointer text-20 op-40 transition duration-300
        @click="handleCloseClick"
      />
    </div>
    <!-- Button -->
    <button flex-center shrink-0 gap-x-4 w-72 btn @click="search">
      <span i-carbon:search inline-block text-14 />
      搜索
    </button>
  </div>
</template>
