<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div text-center>
    <n-button type="primary" round @click="$router.push({ name: 'grow' })">
      Start!
    </n-button>
    <p mt-24 text="14 gray-5" italic>
      Sprout is tiny, but it nurtures infinite hope.
    </p>
  </div>
</template>
