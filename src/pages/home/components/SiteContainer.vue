<script setup lang="ts">
import SiteNavBar from './SiteNavBar.vue'
import SiteGroupList from './SiteGroupList.vue'
import SiteModal from './SiteModal.vue'
</script>

<template>
  <div px="md:32 lg:64" text="$text-c-1" z-8>
    <SiteNavBar />
    <SiteGroupList py-28 />
    <SiteModal />
  </div>
</template>
