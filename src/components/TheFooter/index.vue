<script setup lang="ts">
defineOptions({
  name: 'TheFooter',
})
</script>

<template>
  <div my-24 flex-center gap-x-8>
    <div i-carbon:moon dark:i-carbon:light icon-btn @click="toggleDark()" />
    <a i-carbon:logo-github icon-btn href="https://github.com/jic999/vite-sprout" target="_blank" />
    <a i-cus-juejin icon-btn href="https://juejin.cn/user/2617274671048504" target="_blank" />
  </div>
</template>
