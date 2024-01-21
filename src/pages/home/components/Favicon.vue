<script setup lang="ts">
import type { PropType } from 'vue'
import type { Site } from '@/types'
import { FAVICON_MAP_SYMBOL, getFaviconUrl } from '@/utils'

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

const faviconMap = inject<Ref<Map<number, HTMLImageElement | HTMLDivElement>>>(FAVICON_MAP_SYMBOL)!

const $faviconBox = ref<HTMLDivElement>()

onMounted(() => {
  const id = props.site.id
  const img = faviconMap.value.get(id)

  if (!img) {
    const img = new Image()
    img.src = props.site.favicon || getFaviconUrl(props.site.url)
    img.onload = () => {
      $faviconBox.value?.appendChild(img)
      faviconMap.value.set(id, img)
    }
    img.onerror = () => {
      const favicon = document.createElement('div')
      favicon.innerText = props.site.name.toLocaleUpperCase().charAt(0)
      faviconMap.value.set(id, favicon)
      $faviconBox.value?.appendChild(favicon)
    }
  }
  else if (img) {
    $faviconBox.value?.appendChild(img)
  }
})
</script>

<template>
  <div ref="$faviconBox" class="favicon" :style="[iconStyle, { width: `${size}px`, height: `${size}px`, fontSize: `${size / 2}px` }]" />
</template>

<style lang="scss">
.favicon {
  img, div {
    width: 100%;
    height: 100%;
  }
  img {
    object-fit: contain;
    object-position: center;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: var(--primary-c);
    transform: scale(1.12);
    border-radius: 50%;
  }
}
</style>
