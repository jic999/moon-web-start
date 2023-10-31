<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '@/types'
import { getFaviconUrl } from '@/utils'

defineProps({
  site: {
    type: Object as PropType<Site>,
    required: true,
  },
  size: {
    type: Number,
    default: 24,
  },
  round: {
    type: Boolean,
    default: false,
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
  <div :style="[iconStyle, { width: `${size}px`, height: `${size}px` }]">
    <img
      v-if="!isGen"
      :class="{ 'rounded-full': round }"
      :src="site.favicon || getFaviconUrl(site.url)"
      h-full w-full object-cover object-center
      @error="handleFaviconError"
      @onload="isLoading = false"
    >
    <div v-else :style="{ backgroundColor: 'var(--primary-c)', fontSize: `${size / 2}px` }" h-full w-full flex-center scale-112 rounded-full text-white>
      {{ site.name.toLocaleUpperCase().charAt(0) }}
    </div>
  </div>
</template>
