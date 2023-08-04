<script setup lang="ts">
import draggable from 'vuedraggable'
import type { Category } from '@/stores/site'

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
    ) return
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
      class="flex gap-x-12"
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
          class="dragging"
          :class="{
            'border-$primary-c text-$primary-c': siteStore.cateIndex === i,
            'hover:text-$primary-c': !settingStore.isSetting,
          }"
          border="b-2 transparent"
          cursor-pointer transition-color duration-300 p-8
          @mouseenter="handleCateClick(i)"
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
