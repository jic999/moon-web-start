<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainClock from './components/MainClock.vue'
import MainSearch from './components/MainSearch.vue'
import SiteContainer from './components/SiteContainer.vue'
import MainSetting from './components/MainSetting.vue'
import { toggleSiteSytle } from '@/composables/dark'

defineOptions({
  name: 'HomePage',
})

toggleSiteSytle()

const settingStore = useSettingStore()

</script>

<template>
  <TheDoc dark:op-80>
    <div my-6vh p-24 bg="$main-bg-c" dark="bg-$dark-main-bg-c" class="mobile-index" :class="{ 'no_select': settingStore.isSetting}">
      <MainHeader />
      <MainClock />
      <MainSearch />
      <SiteContainer />
      <MainSetting />
      <TheFooter />
    </div>
  </TheDoc>
</template>

<route lang="json">
{
  "path": "/",
  "meta": {
    "auth": true
  }
}
</route>
