<script setup lang="ts">
import solarLunar from 'solarlunar-es'

const settingStore = useSettingStore()

const $time = ref<HTMLDivElement | null>(null)

const date = ref('')
const time = ref('')
const lunarDate = ref('')
const week = ref('')

let timeInterval: NodeJS.Timer

function refreshTime() {
  const now = new Date()
  const lang = settingStore.settings.language === 'System' ? navigator.language : settingStore.settings.language
  date.value = now.toLocaleString(lang, { month: 'long', day: 'numeric' })
  week.value = now.toLocaleString(lang, { weekday: 'long' })

  if (settingStore.getSettingValue('showSecond'))
    time.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  else
    time.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  $time.value!.innerText = time.value

  // 若为0点 或阴历为空 刷新日期
  // en: If 00:00 or the lunar is empty, refresh date
  if (!lunarDate.value || time.value === '00:00' || time.value === '00:00:00')
    getDate()
  return refreshTime
}

function getDate() {
  const now = new Date().toISOString().split('T')[0]
  const dateArr = now.split('-').map(val => Number(val))
  const lunar = solarLunar.solar2lunar(dateArr[0], dateArr[1], dateArr[2])
  if (typeof lunar !== 'number')
    lunarDate.value = `${lunar.gzYear}${lunar.animal}年${lunar.monthCn}${lunar.dayCn}`
}

function timing() {
  // 获取并记录初始时间
  // en: Get and record the initial time
  refreshTime()
  const nowMinute = time.value
  // 开启定时器
  // en: Start the timer
  timeInterval = setInterval(() => {
    refreshTime()
    // 若 nowMinute !== newMinute 说明开始了新的分钟
    // en: nowMinute !== newMinute means a new minute has started
    if (!settingStore.getSettingValue('showSecond') && nowMinute !== time.value) {
      // 清除每秒定时器 开启分钟定时器
      // en: Clear second timer and start minute timer
      clearInterval(timeInterval)
      timeInterval = setInterval(refreshTime, 60000)
    }
  }, 1000)
}
onMounted(() => {
  timing()
})

onBeforeUnmount(() => {
  clearInterval(timeInterval)
})
</script>

<template>
  <div text-center>
    <div v-if="settingStore.getSettingValue('showTime')" ref="$time" text-48 tracking-wide>
      {{ time }}
    </div>
    <p text="14 $text-c-1">
      <span v-if="settingStore.getSettingValue('showDate')">{{ date }}<span ml-8>{{ week }}</span></span>
      <span v-if="settingStore.getSettingValue('showLunar')" ml-8>{{ lunarDate }}</span>
    </p>
  </div>
</template>
