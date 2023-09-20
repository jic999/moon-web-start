<script setup lang="ts">
import draggable from 'vuedraggable'
import type { Category } from '@/types'

const modalStore = useModalStore()
const siteStore = useSiteStore()
const route = useRoute()

function handleCateClick(cateIndex: number) {
  if (route.name === 'setting' && siteStore.cateIndex === cateIndex)
    modalStore.showModal('update', 'cate')
  else
    siteStore.setCateIndex(cateIndex)
}
const settingStore = useSettingStore()
const { draggableOptions, handleStart, handleEnd } = useDrag()

function handleDragEnd(e: any) {
  handleEnd()
  const { oldIndex, newIndex } = e
  const { cateIndex } = siteStore
  // 若移动了当前分类 跟随移动
  if (oldIndex === cateIndex && newIndex !== cateIndex) {
    siteStore.setCateIndex(newIndex)
  }
  // 若移动其他分类
  else {
    // 若在同一侧移动 不会改变当前分类
    if (
      (oldIndex < cateIndex && newIndex < cateIndex)
      || (oldIndex > cateIndex && newIndex > cateIndex)
    )
      return
    if (oldIndex < cateIndex)
      siteStore.setCateIndex(cateIndex - 1)
    else if (oldIndex > cateIndex)
      siteStore.setCateIndex(cateIndex + 1)
  }
}
</script>

<template>
  <section flex-center text-14>
    <draggable
      class="nav w-auto flex-center gap-x-12 w-90p sm:max-w-480"
      :list="siteStore.data"
      item-key="id"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
      }"
      v-bind="draggableOptions"
      @start="handleStart"
      @end="handleDragEnd"
    >
      <template #item="{ element: cate, index: i }: { element: Category, index: number }">
        <div
          class="dragging nav__item shrink-0"
          :class="{
            'hover:text-$primary-c': !settingStore.isSetting,
            'nav__item--active': siteStore.cateIndex === i,
          }"
          cursor-pointer px-8 py-10 transition-color duration-300
          @click="handleCateClick(i)"
        >
          {{ cate.name }}
        </div>
      </template>
    </draggable>
    <n-button
      v-if="settingStore.isSetting"
      class="ml-12"
      type="primary"
      size="small"
      :focusable="false"
      secondary circle
      @click="modalStore.showModal('add', 'cate')"
    >
      <template #icon>
        <div i-carbon:add />
      </template>
    </n-button>
  </section>
</template>

<style lang="scss" scoped>
.nav {
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
}
.nav__item {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background-color: var(--primary-c);
    transition: all .3s;
    left: 50%;
    transform: translateX(-50%);
  }
  &--active {
    color: var(--primary-c);
    &::after {
      width: 100%;
    }
  }
}
</style>
