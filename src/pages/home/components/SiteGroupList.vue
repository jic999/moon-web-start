<script setup lang="ts">
import draggable from 'vuedraggable'
import Favicon from './Favicon.vue'
import type { Group, Site } from '@/types'

const modalStore = useModalStore()
const siteStore = useSiteStore()
const route = useRoute()

function handleSiteClick(url: string, groupIndex: number, siteIndex: number) {
  if (route.name === 'setting')
    modalStore.showModal('update', 'site', groupIndex, siteIndex)
  else
    window.open(url, '_blank')
}
function handleGroupClick(groupIndex: number) {
  if (route.name === 'setting')
    modalStore.showModal('update', 'group', groupIndex)
}

const addGroupVisible = computed(() => route.name === 'setting' && siteStore.data.length > 0)
const { draggableOptions, handleStart, handleEnd } = useDrag()

const settingStore = useSettingStore()
const renderStore = useRenderStore()
</script>

<template>
  <section :key="renderStore.siteGroupListKey" text-14>
    <draggable
      class="flex flex-col gap-y-12"
      :list="siteStore.data[siteStore.cateIndex].groupList"
      item-key="id"
      handle=".group__handle"
      drag-class="dragging"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
      }"
      v-bind="draggableOptions"
      @start="handleStart"
      @end="handleEnd"
    >
      <template #item="{ element: group, index: i }: { element: Group, index: number }">
        <div :class="{ 'group--setting': settingStore.isSetting, 'flex gap-x-8 items-start': !isXsScreen }">
          <!-- Group header -->
          <div
            :class="{ 'cursor-pointer ': settingStore.isSetting, 'mb-12 w-full': isXsScreen }"
            shrink-0 w-72
            @click="handleGroupClick(i)"
          >
            <div
              class="group__handle"
              :class="{
                'group__header--setting': settingStore.isSetting,
                'hover:bg-$site-hover-c': settingStore.isSetting && !settingStore.isDragging,
              }"
              flex items-center px-6 h-40
            >
              <div
                :class="{ 'group__name pl-16 py-4': isXsScreen }"
                whitespace-nowrap text-15 op-80 overflow-hidden
              >
                {{ group.name }}
              </div>
            </div>
          </div>
          <!-- Group content -->
          <div w-full>
            <draggable
              :list="siteStore.data[siteStore.cateIndex].groupList[i].siteList"
              item-key="id"
              group="site"
              handle=".site__handle"
              drag-class="dragging"
              :component-data="{
                tag: 'div',
                type: 'transition-group',
                class: 'grid grid-cols-3 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
              }"
              v-bind="draggableOptions"
              @start="handleStart"
              @end="handleEnd"
            >
              <template #item="{ element: site, index }: { element: Site, index: number }">
                <div>
                  <!-- Site item -->
                  <div
                    class="site__handle"
                    :class="{ 'site--setting': settingStore.isSetting, 'hover:bg-$site-hover-c': !settingStore.isDragging }"
                    :href="site.url" target="_blank"
                    inline-flex cursor-pointer items-center gap-x-8 px-12 py-8 max-w-100p
                    @click="handleSiteClick(site.url, i, index)"
                  >
                    <Favicon :site="site" :site-index="index" :group-index="i" />
                    <span whitespace-nowrap text-14 overflow-hidden>{{ site.name }}</span>
                  </div>
                </div>
              </template>
              <template #footer>
                <div v-if="settingStore.isSetting" min-h-38>
                  <n-button class="h-full" type="primary" secondary :focusable="false" @click="modalStore.showModal('add', 'site', i)">
                    <template #icon>
                      <div i-carbon:add />
                    </template>
                  </n-button>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </template>
    </draggable>
    <!-- Add group button -->
    <div v-if="addGroupVisible" my-12>
      <n-button type="primary" secondary w-full :focusable="false" @click="modalStore.showModal('add', 'group')">
        <template #icon>
          <div i-carbon:add />
        </template>
      </n-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.site--setting {
  border: 1px dashed var(--setting-border-c);
}
.group__name {
  position: relative;
  &::before {
    content: '';
    width: 4px;
    height: 72%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primary-c);
    border-radius: 2px;
  }
}
.group--setting {
  padding: 12px 6px;
  background: var(--setting-group-bg-c);
}
.group__header--setting {
  border: 1px dashed var(--setting-border-c);
}
</style>
