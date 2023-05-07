<script setup lang="ts">
import SiteNavBar from './SiteNavBar.vue'
import SiteGroupList from './SiteGroupList.vue'
import SiteModal from './SiteModal.vue'
</script>

<template>
  <div px="12 md:24 lg:48" text="$text-c-1 dark:$text-dark-c-1">
    <SiteNavBar />
    <SiteGroupList />
    <SiteModal />
  </div>
</template>
