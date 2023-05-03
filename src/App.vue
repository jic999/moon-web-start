<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <AppProvider>
    <AppContainer>
      <RouterView />
    </AppContainer>
  </AppProvider>
</template>
