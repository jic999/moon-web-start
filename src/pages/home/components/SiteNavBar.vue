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
  if (oldIndex === cateIndex && newIndex !== cateIndex) {
    siteStore.setCateIndex(newIndex)
  } else {
    if ((oldIndex < cateIndex && newIndex < cateIndex) ||
          (oldIndex > cateIndex && newIndex > cateIndex)) {
      return
    }

    if (oldIndex < cateIndex) {
      siteStore.setCateIndex(cateIndex - 1)
    } else if (oldIndex > cateIndex) {
      siteStore.setCateIndex(cateIndex + 1)
    }
  }
}
</script>

<template>
  <section flex-center text-14>
    <draggable
      class="flex gap-x-12 "
      :list="siteStore.data"
      item-key="id"
      :delay="1"
      :fallbackTolerance="3"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
      }"
      v-bind="draggableOptions"
      @start="handleStart"
      @end="handleDragEnd"
      style="overflow: scroll; white-space: nowrap;"
    >
      <template #item="{ element: cate, index: i }: { element: Category, index: number }">
        <div
          class="dragging"
          :class="{
            'border-$primary-c text-$primary-c': siteStore.cateIndex === i,
            'hover:text-$primary-c': !settingStore.isSetting,
            'site--setting': settingStore.isSetting,
            'site--select': siteStore.cateIndex === i && settingStore.isSetting
          }"
          border="b-2 transparent"
          cursor-pointer transition-color duration-300 p-4
          v-on:click.native="handleCateClick(i)"
          style="text-align: center;"
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
      secondary
      v-on:click.native="modalStore.showModal('add', 'cate')"
    >
      <template #icon>
        <div i-carbon:add />
      </template>
    </n-button>
  </section>
</template>

<style lang="scss" scoped>
.site--setting {
  border: 1px dashed var(--setting-border-c);
}

.site--select {
  background-color: var(--category-c);
}
</style>
