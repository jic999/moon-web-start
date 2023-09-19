<script setup lang="ts">
import dayjs from 'dayjs'
import solarLunar from 'solarlunar-es'

const date = ref('')
const time = ref('')
const lunarDate = ref('')
const week = ref('')

let timeInterval: NodeJS.Timer

function refreshTime() {
  const now = dayjs().format('YYYY年MM月DD日 HH:mm')
  const timeArr = now.split(' ')
  date.value = timeArr[0]
  time.value = timeArr[1]
  if (!lunarDate.value || time.value === '00:00') {
    getDate()
  }
  return refreshTime
}

function getDate() {
  const now = dayjs().format('YYYY-MM-DD')
  const dateArr = now.split('-').map(val => Number(val))
  const lunar = solarLunar.solar2lunar(dateArr[0], dateArr[1], dateArr[2])
  if (typeof lunar !== 'number') {
    lunarDate.value = `${lunar.gzYear}${lunar.animal}年${lunar.monthCn}${lunar.dayCn}`
    week.value = lunar.ncWeek
  }
}

function timing() {
  refreshTime()
  const nowMinute = time.value
  timeInterval = setInterval(() => {
    refreshTime()
    if (nowMinute !== time.value) {
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
  </div>
</template>
