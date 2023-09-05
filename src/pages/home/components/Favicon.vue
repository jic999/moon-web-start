<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '@/_types'
import { getFaviconUrl, getRandomNeutralColor } from '@/utils'

defineProps({
  site: {
    type: Object as PropType<Site>,
    required: true,
  },
})

const { iconStyle } = useIconStyle()

const isGen = ref(false)
const isLoading = ref(true)
</script>

<template>
  <div :style="iconStyle" h-22 w-22>
    <img
      v-if="!isGen"
      :src="site.favicon || getFaviconUrl(site.url)"
      h-full w-full
      @error="() => isGen = true"
      @onload="isLoading = false"
    >
    <div v-else :style="{ backgroundColor: getRandomNeutralColor() }" h-full w-full flex-center rounded-full text-white>
      {{ site.name.toLocaleUpperCase().charAt(0) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
