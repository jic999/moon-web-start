<script setup lang="ts">
import { RouterLink } from 'vue-router'

const route = useRoute()
const settingStore = useSettingStore()

function getIconClass(routeName: string) {
  return {
    'text-$primary-c opacity-100': routeName === route.name,
  }
}
</script>

<template>
  <div px="0 md:24 lg:48" flex items-center justify-between pt-12>
    <RouterLink to="/">
      <div text="$primary-c" flex-center>
        <span i-cus-moonset inline-block text-32 transition-300 hover="opacity-80" />
      </div>
    </RouterLink>
    <div flex gap-x-8>
      <RouterLink v-if="settingStore.isSetting" :class="getIconClass('home')" to="/" i-carbon:home icon-btn />
      <RouterLink v-else :class="getIconClass('setting')" to="/setting" i-carbon:settings icon-btn />
      <div i-carbon:moon dark:i-carbon:light icon-btn @click="(e) => toggleDark(e)" />
    </div>
  </div>
</template>
