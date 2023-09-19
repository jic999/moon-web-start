<script setup lang="ts">
import draggable from 'vuedraggable'
import { DEFAULT_FAVICON, getFaviconUrl } from '@/utils'
import type { Group, Site } from '@/stores/site'

const modalStore = useModalStore()
const siteStore = useSiteStore()
const route = useRoute()

function handleSiteClick(url: string, groupIndex: number, siteIndex: number) {
  if (route.name === 'setting') {
    modalStore.showModal('update', 'site', groupIndex, siteIndex)
  } else {
    window.open(url, '_blank')
  }
}
function handleGroupClick(groupIndex: number) {
  if (route.name === 'setting') {
    modalStore.showModal('update', 'group', groupIndex)
  }
}

const addGroupVisible = computed(() => route.name === 'setting' && siteStore.data.length > 0)
const { draggableOptions, handleStart, handleEnd } = useDrag()

const settingStore = useSettingStore()

const { iconStyle } = useIconStyle()
</script>

<template>
  <section py-24 text-14>
    <draggable
      :list="siteStore.data[siteStore.cateIndex].groupList"
      item-key="id"
      handle=".group__handle"
      drag-class="dragging"
      :delay="1"
      :fallbackTolerance="3"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
      }"
      v-bind="draggableOptions"
      @start="handleStart"
      @end="handleEnd"
    >
      <template #item="{ element: group, index: i }: { element: Group, index: number }">
        <div class="group__header--mobile" :class="{ 'group--setting': settingStore.isSetting }" flex style="align-items: center;">
          <!-- Group header -->
          <div flex class="group__header--all">
            <span class="group__handle" @click="handleGroupClick(i)" :class="{
                'cursor-pointer ': settingStore.isSetting,
                'group__header--setting': settingStore.isSetting,
                'hover:bg-$site-hover-c': settingStore.isSetting && !settingStore.isDragging,
              }" px-0 py-4 style="white-space: nowrap; color: #888;">
              {{ group.name }}
            </span>
          </div>
          <!-- Group content -->
          <div flex class="group__content--all">
            <draggable
              :list="siteStore.data[siteStore.cateIndex].groupList[i].siteList"
              item-key="id"
              group="site"
              handle=".site__handle"
              drag-class="dragging"
              :component-data="{
                tag: 'div',
                type: 'transition-group',
                class: 'grid grid-cols-3 gap-8 lg:grid-cols-6 md:grid-cols-6',
              }"
              v-bind="draggableOptions"
              @start="handleStart"
              @end="handleEnd"
              :delay="1"
              :fallbackTolerance="3"
              flex
              style="flex: 0 0 100%;"
            >
              <template #item="{ element: site, index }: { element: Site, index: number }">
                <div>
                  <!-- Site item -->
                  <div
                    class="site__handle"
                    :class="{ 'site--setting': settingStore.isSetting, 'hover:bg-$site-hover-c': !settingStore.isDragging }"
                    :href="site.url" target="_blank"
                    inline-flex cursor-pointer items-center gap-x-4 px-8 py-8 max-w-100p
                    @click="handleSiteClick(site.url, i, index)"
                    style="margin: 0 2px;"
                  >
                    <img
                      :src="site.favicon || getFaviconUrl(site.url)"
                      :style="iconStyle"
                      h-22 w-22
                      @error="(e: any) => e.target.src = DEFAULT_FAVICON"
                    >
                    <span whitespace-nowrap text-14 overflow-hidden>{{ site.name }}</span>
                  </div>
                </div>
              </template>
              <template #footer>
                <div v-if="settingStore.isSetting && siteStore.data[siteStore.cateIndex].groupList[i].siteList.length < 6" min-h-38>
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
    width: 3px;
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
  margin-bottom: 12px !important;
  padding: 12px 6px;
}

.group__header--setting {
  background-color: var(--category-c);
  margin: 0 2px;
  padding: 4px;
  font-size: 13px;
}

.group__header--all {
  max-width: 10%;
  overflow: hidden;
  align-items: center;
  flex: 0 0 10%;
}

.group__content--all {
  flex: 0 0 90%;
  max-width: 90%;
}

.group__header--mobile {
  margin-bottom: 10rem;
}

@media screen and (max-width: 600px) {
  .group__header--all {
    max-width: 15%;
    flex: 0 0 15%;
  }

  .group__content--all {
    flex: 0 0 85%;
    max-width: 85%;
  }

  .group__header--mobile {
    margin-bottom: 12px;
  }

  .group--setting {
    padding: 0px !important;
  }
}
</style>
