<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <AppProvider>
    <Sprout mt-64 />
    <RouterView />
    <TheFooter />
  </AppProvider>
</template>
