<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '@/types'
import { FAVICON_MAP_SYMBOL, getDomainName, getFaviconUrl } from '@/utils'

const props = defineProps({
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

const faviconMap = inject<Ref<Map<string, HTMLImageElement>>>(FAVICON_MAP_SYMBOL)!

const $faviconBox = ref<HTMLDivElement>()

const imgErr = ref(false)

onMounted(() => {
  const domain = getDomainName(props.site.url)
  const img = domain ? faviconMap.value.get(domain) : null

  if (domain && !img) {
    const img = new Image()
    img.src = props.site.favicon || getFaviconUrl(props.site.url)
    img.onload = () => {
      $faviconBox.value?.appendChild(img)
      faviconMap.value.set(domain, img)
    }
    img.onerror = () => {
      imgErr.value = true
    }
  }
  else if (domain && img) {
    $faviconBox.value?.appendChild(img)
  }
})
</script>

<template>
  <div ref="$faviconBox" class="favicon" :style="[iconStyle, { width: `${size}px`, height: `${size}px` }]">
    <div v-if="imgErr" :style="{ backgroundColor: 'var(--primary-c)', fontSize: `${size / 2}px` }" h-full w-full flex-center scale-112 rounded-full text-white>
      {{ site.name.toLocaleUpperCase().charAt(0) }}
    </div>
  </div>
</template>

<style>
.favicon img{
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
</style>
