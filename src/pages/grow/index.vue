<script setup lang="ts">
defineOptions({
  name: 'Grow',
})
window.$loadingBar.start()
const loadingMsg = window.$message.loading('Growing', { duration: 0 })
setTimeout(() => {
  window.$loadingBar.finish()
  loadingMsg.destroy()
  window.$message.success('Grow up~')
}, 1200)
</script>

<template>
  <div flex-center>
    <n-button type="primary" secondary round @click="$router.push({ name: 'index' })">
      Back~
    </n-button>
  </div>
</template>

<style lang="scss" scoped></style>
