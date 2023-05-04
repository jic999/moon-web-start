<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainClock from './components/MainClock.vue'
import MainSearch from './components/MainSearch.vue'
import SiteContainer from './components/SiteContainer.vue'
import MainSetting from './components/MainSetting.vue'

defineOptions({
  name: 'HomePage',
})
</script>

<template>
  <div mt-6vh p-24 bg="$main-bg-c" dark="bg-$dark-main-bg-c">
    <MainHeader />
    <MainClock />
    <MainSearch />
    <SiteContainer />
    <MainSetting />
    <TheFooter />
  </div>
</template>

<route lang="json">
{
  "path": "/",
  "meta": {
    "auth": true
  }
}
</route>
