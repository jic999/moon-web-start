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
const { draggableOptions } = useDrag()

function handleDragEnd(e: any) {
  removeCursorStyle()
  if (e.oldIndex === siteStore.cateIndex && e.newIndex !== siteStore.cateIndex)
    siteStore.setCateIndex(e.newIndex)
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
      @start="addCursorStyle"
      @end="handleDragEnd"
    >
      <template #item="{ element: cate, index: i }: { element: Category, index: number }">
        <div
          class="dragging-cate"
          :class="{ 'border-$primary-c text-$primary-c': siteStore.cateIndex === i }"
          border="b-2 transparent"
          cursor-pointer transition-color duration-300 p-8
          hover="text-$primary-c"
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
