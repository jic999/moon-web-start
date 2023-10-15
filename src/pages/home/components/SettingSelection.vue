<script setup lang="ts">
import type { PropType } from 'vue'
import type { TextGetter } from '@/types'
import { getText } from '@/utils'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  title: {
    type: Function as PropType<TextGetter>,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
})
const emits = defineEmits(['update:modelValue'])
const modelValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val),
})
</script>

<template>
  <div w-full>
    <div my8>{{ getText(title) }}</div>
    <n-select v-model:value="modelValue" :options="options as any" v-bind="$attrs" />
  </div>
</template>
