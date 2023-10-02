<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
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
      :options="options as any"
      v-bind="$attrs"
    />
  </div>
</template>
