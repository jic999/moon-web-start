<script setup lang="ts">
import { getFaviconUrl } from '@/utils'

// TODO 拖动排序

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
const isSetting = computed(() => route.name === 'setting')
</script>

<template>
  <section py-24 text-14>
    <div v-for="(group, i) in siteStore.currentCateData.groupList" :key="group.id" :class="{ 'group--setting': isSetting }">
      <!-- Group header -->
      <div px-6>
        <div :class="{ 'group__header--setting mb-12': isSetting }" flex items-center justify-between px-12 py-4>
          <span class="group__name" :class="{ 'cursor-pointer': isSetting }" px-12 py-4 @click="handleGroupClick(i)">
            {{ group.name }}
          </span>
          <div>
            <!-- Add site button -->
            <n-button
              v-if="$route.name === 'setting'"
              type="primary"
              size="small"
              secondary
              circle
              :focusable="false"
              @click="modalStore.showModal('add', 'site', i)"
            >
              <template #icon>
                <div i-carbon:add />
              </template>
            </n-button>
          </div>
        </div>
      </div>
      <!-- Group content -->
      <div grid grid-cols="lg:8 md:6 3" gap-y-8>
        <!-- Site item -->
        <div v-for="(site, index) in group.siteList" :key="site.id" px-6>
          <div
            :class="{ 'site--setting': isSetting }"
            :href="site.url" target="_blank"
            hover="bg-$site-hover-c"
            inline-flex cursor-pointer items-center gap-x-8 px-12 py-8 max-w-100p
            @click="handleSiteClick(site.url, i, index)"
          >
            <img :src="site.favicon ? site.favicon : getFaviconUrl(site.url)" h-20 w-20>
            <span whitespace-nowrap overflow-hidden>{{ site.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Add group button -->
    <div v-if="addGroupVisible" my-12>
      <n-button type="primary" size="small" secondary w-full :focusable="false" @click="modalStore.showModal('add', 'group')">
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
  }
}
.group--setting {
  margin-bottom: 12px;
  padding: 12px 0;
  background: var(--setting-group-bg-c);
}
.group__header--setting {
  border: 1px dashed var(--setting-border-c);
}
</style>
