<script setup lang="ts">
const modalStore = useModalStore()
const siteStore = useSiteStore()
const route = useRoute()

function handleCateClick(cateIndex: number) {
  if (route.name === 'setting' && siteStore.cateIndex === cateIndex)
    modalStore.showModal('update', 'cate')
  else
    siteStore.setCateIndex(cateIndex)
}
</script>

<template>
  <section flex-center gap-x-12 text-14>
    <div
      v-for="(cate, i) in siteStore.cateList" :key="cate.id"
      :class="{ 'border-$primary-c text-$primary-c': siteStore.cateIndex === i }"
      border="b-2 transparent"
      cursor-pointer transition-color duration-300 p-8
      hover="text-$primary-c"
      @click="handleCateClick(i)"
    >
      {{ cate.name }}
    </div>
    <n-button
      v-if="$route.name === 'setting'"
      type="primary"
      size="small"
      secondary
      circle
      :focusable="false"
      @click="modalStore.showModal('add', 'cate')"
    >
      <template #icon>
        <div i-carbon:add />
      </template>
    </n-button>
  </section>
</template>
