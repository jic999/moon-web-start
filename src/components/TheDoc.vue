<script setup>

</script>

<template>
  <!-- 可以在此添加一些样式 -->
  <div class="doc">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.doc {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>
