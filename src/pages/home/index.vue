<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainClock from './components/MainClock.vue'
import MainSearch from './components/MainSearch.vue'
import SiteContainer from './components/SiteContainer.vue'
import MainSetting from './components/MainSetting.vue'

defineOptions({
  name: 'HomePage',
})

const settingStore = useSettingStore()
</script>

<template>
  <TheDoc>
    <div my="0 sm:6vh" p="12 sm:24" bg="$main-bg-c" w="full sm:auto" :class="{ no_select: settingStore.isSetting }">
      <MainHeader />
      <MainClock v-if="!settingStore.isSetting && settingStore.getSettingValue('showTime')" />
      <MainSearch v-if="!settingStore.isSetting" my-24 />
      <SiteContainer />
      <MainSetting />
      <TheFooter v-if="settingStore.getSettingValue('showFooter')" />
    </div>
  </TheDoc>
</template>

<route lang="json">
{
  "path": "/",
  "children": [
    {
      "name": "setting",
      "path": "setting",
      "component": "@/components/Blank.vue"
    }
  ]
}
</route>
