<script setup lang="ts">
import dayjs from 'dayjs'
import { calendarFormatter } from '@/utils'

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
  // 若为0点 或阴历为空 刷新日期
  if (!lunarDate.value || time.value === '00:00')
    getDate()
  return refreshTime
}
function getDate() {
  const now = dayjs().format('YYYY-MM-DD')
  const dateArr = now.split('-')
  const lunar = calendarFormatter.solarToLunar(...dateArr)
  if (lunar !== -1) {
    lunarDate.value = `${lunar.gzYear}${lunar.Animal}年${lunar.IMonthCn}${lunar.IDayCn}`
    week.value = lunar.ncWeek
  }
}
function timing() {
  // 获取并记录初始时间
  refreshTime()
  const nowMinute = time.value
  // 开启定时器
  timeInterval = setInterval(() => {
    refreshTime()
    // 若 nowMinute !== newMinute 说明开始了新的分钟
    if (nowMinute !== time.value) {
      // 清除每秒定时器 开启分钟定时器
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
    <div text="14 $text-c-1" dark="text-$dark-text-c-1" lh-100p>
      <p>
        <span>{{ date }}</span>
        <span ml-12>{{ week }}</span>
      </p>
      <p>
        {{ lunarDate }}
      </p>
    </div>
  </div>
</template>
