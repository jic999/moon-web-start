<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '@/types'
import { getFaviconUrl } from '@/utils'

defineProps({
  site: {
    type: Object as PropType<Site>,
    required: true,
  },
  siteIndex: {
    type: Number,
    required: true,
  },
  groupIndex: {
    type: Number,
    required: true,
  },
})

const { iconStyle } = useIconStyle()

const isGen = ref(false)
const isLoading = ref(true)

function handleFaviconError() {
  isGen.value = true
}
</script>

<template>
  <div :style="iconStyle" h-24 w-24>
    <img
      v-if="!isGen"
      :src="site.favicon || getFaviconUrl(site.url)"
      h-full w-full
      @error="handleFaviconError"
      @onload="isLoading = false"
    >
    <div v-else :style="{ backgroundColor: 'var(--primary-c)' }" h-full w-full flex-center scale-112 rounded-full text="white 12">
      {{ site.name.toLocaleUpperCase().charAt(0) }}
    </div>
  </div>
</template>
