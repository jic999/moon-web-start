<script setup lang="ts">
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'

const props = defineProps({
  title: {
    type: String,
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
defineOptions({
  inheritAttrs: false,
})
const modelValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val),
})
</script>

<template>
  <div w-full flex items-center justify-between>
    <div text="14" inline-block overflow-hidden w-20p w-80>
      {{ title }}
    </div>
    <n-select
      v-model:value="modelValue"
      :options="options as unknown as SelectMixedOption[]"
      v-bind="$attrs"
    />
  </div>
</template>
