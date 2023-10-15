<script setup lang="ts">
import solarLunar from 'solarlunar-es'

const settingStore = useSettingStore()

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
  time.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  // 若为0点 或阴历为空 刷新日期
  // en: If 00:00 or the lunar is empty, refresh date
  if (!lunarDate.value || time.value === '00:00')
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
    if (nowMinute !== time.value) {
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
    <div text-48>
      {{ time }}
    </div>
    <div text="14 $text-c-1" lh-100p>
      <p>
        <span>{{ date }}</span>
        <span ml-12>{{ week }}</span>
      </p>
      <p v-if="settingStore.getSettingValue('showLunar')">
        {{ lunarDate }}
      </p>
    </div>
  </div>
</template>
