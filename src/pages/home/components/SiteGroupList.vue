<script setup lang="ts">
import draggable from 'vuedraggable'
import Favicon from './Favicon.vue'
import type { Group, Site } from '@/types'

const modalStore = useModalStore()
const siteStore = useSiteStore()
const route = useRoute()

function handleSiteClick(groupIndex: number, siteIndex: number, e: Event) {
  if (route.name === 'setting') {
    e.preventDefault()
    modalStore.showModal('update', 'site', groupIndex, siteIndex)
  }
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
        <div :class="{ 'mb-6': settingStore.isSetting, 'flex gap-x-8 items-start': !isXsScreen }" relative>
          <!-- Group header -->
          <div
            :class="{ 'cursor-pointer bg-$site-hover-c': settingStore.isSetting, 'mb-12 w-full': isXsScreen }"
            shrink-0 w-72
            @click="handleGroupClick(i)"
          >
            <div
              class="group__handle"
              :class="{
                'group__header--setting': settingStore.isSetting,
                'hover:bg-$site-hover-c': settingStore.isSetting,
              }"
              flex items-center justify-between px-6 h-40
            >
              <div
                :class="{ 'group__name pl-16 py-4': isXsScreen }"
                whitespace-nowrap text-15 op-80 overflow-hidden
              >
                {{ group.name }}
              </div>
              <n-button v-if="settingStore.isSetting && isXsScreen" class="btn--add-site" type="primary" circle :focusable="false" @click.stop="modalStore.showModal('add', 'site', i)">
                <template #icon>
                  <div i-carbon:add />
                </template>
              </n-button>
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
                  <a
                    class="site__handle"
                    :class="{ 'site--setting': settingStore.isSetting, 'hover:bg-$site-hover-c': !settingStore.isDragging }"
                    :href="site.url" target="_blank"
                    inline-flex cursor-pointer items-center gap-x-8 px-12 h-40 max-w-100p
                    @click="(e) => handleSiteClick(i, index, e)"
                  >
                    <Favicon class="shrink-0" :site="site" :site-index="index" :group-index="i" />
                    <span whitespace-nowrap text-14 overflow-hidden>{{ site.name }}</span>
                  </a>
                </div>
              </template>
            </draggable>
          </div>
          <div v-if="settingStore.isSetting && !isXsScreen" absolute z-9 flex-center h-40 r-0>
            <n-button class="btn--add-site" type="primary" circle :focusable="false" @click.stop="modalStore.showModal('add', 'site', i)">
              <template #icon>
                <div i-carbon:add />
              </template>
            </n-button>
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
.group__header--setting {
  border: 1px dashed var(--setting-border-c);
}

.btn--add-site {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
</style>
