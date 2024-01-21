<script setup lang="ts">
import type { PropType } from 'vue'
import Favicon from './Favicon.vue'
import type { Site, TagMode } from '@/types'

defineProps({
  site: {
    type: Object as PropType<Site>,
    required: true,
  },
  type: {
    type: String as PropType<TagMode>,
    required: true,
  },
  isSetting: {
    type: Boolean,
    required: false,
  },
  isDragging: {
    type: Boolean,
    default: false,
  },
  target: {
    type: String,
    default: '_blank',
  },
})
</script>

<template>
  <a
    v-if="type === 'Concise'"
    class="site__handle"
    :class="{ 'site--setting': isSetting, 'hover:bg-$site-hover-c': !isDragging }"
    :href="site.url" :target="target"
    inline-flex cursor-pointer items-center gap-x-8 px-12 transition-300 h-40 max-w-100p
  >
    <KeepAlive>
      <component :is="Favicon" :site="site" />
    </KeepAlive>
    <span whitespace-nowrap text-14 overflow-hidden>{{ site.name }}</span>
  </a>
  <a
    v-else
    class="site__handle"
    :class="{ 'site--setting': isSetting, 'hover:bg-$site-hover-c': !isDragging }"
    :href="site.url" :target="target"
    bg="white dark:dark-800"
    w-full inline-flex cursor-pointer items-center gap-x-8 transition-300 p-10
  >
    <KeepAlive>
      <component :is="Favicon" :site="site" />
    </KeepAlive>
    <div>
      <div text-13 font-600 ellipsis-1>{{ site.name }}</div>
      <div text="13 $text-c-1" mt-6 ellipsis-1>{{ site.desc ?? site.name }}</div>
    </div>
  </a>
</template>
