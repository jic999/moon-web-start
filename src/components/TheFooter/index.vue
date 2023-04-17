<script setup lang="ts">
defineOptions({
  name: 'TheFooter',
})
</script>

<template>
  <div flex-center gap-x-8 my-24>
    <div icon-btn i-carbon:moon dark:i-carbon:light @click="toggleDark()" />
    <a icon-btn i-carbon:logo-github href="https://github.com/jic999/vite-sprout" target="_blank" />
    <a icon-btn i-cus-juejin href="https://juejin.cn/user/2617274671048504" target="_blank" />
  </div>
</template>
