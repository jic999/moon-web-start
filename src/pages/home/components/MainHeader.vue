<script setup lang="ts">
import { RouterLink } from 'vue-router'

const route = useRoute()

function getIconClass(routeName: string) {
  return {
    'text-$primary-c opacity-100': routeName === route.name,
  }
}
</script>

<template>
  <div flex justify-between py-12>
    <RouterLink to="/">
      <div text="$primary-c" flex-center text-16 italic>
        <span i-cus-moonset inline-block text-32 transition duration-300 hover="opacity-70" />
      </div>
    </RouterLink>
    <div flex gap-x-8>
      <RouterLink :class="getIconClass('home')" to="/" i-carbon:home icon-btn />
      <RouterLink :class="getIconClass('setting')" to="/setting" i-carbon:settings icon-btn />
      <div i-carbon:moon dark:i-carbon:light icon-btn @click="toggleDark()" />
    </div>
  </div>
</template>
