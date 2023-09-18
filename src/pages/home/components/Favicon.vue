<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '@/_types'
import { getFaviconUrl, getRandomColor } from '@/utils'

const props = defineProps({
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

const siteStore = useSiteStore()

const { iconStyle } = useIconStyle()

const isGen = ref(false)
const isLoading = ref(true)

function handleFaviconError(site: Site) {
  isGen.value = true
  siteStore.setGroupIndex(props.groupIndex)
  siteStore.setSiteIndex(props.siteIndex)
  if (site.bgColor)
    return
  siteStore.updateSite({
    ...site,
    bgColor: getRandomColor(),
  })
}
</script>

<template>
  <div :style="iconStyle" h-24 w-24>
    <img
      v-if="!isGen"
      :src="site.favicon || getFaviconUrl(site.url)"
      h-full w-full
      @error="handleFaviconError(site)"
      @onload="isLoading = false"
    >
    <div v-else :style="{ backgroundColor: site.bgColor }" h-full w-full flex-center rounded-full text-white>
      {{ site.name.toLocaleUpperCase().charAt(0) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
@/types
