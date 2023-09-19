<script setup lang="ts">
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
  <div>
    <div text="14" overflow-hidden w-20p w-90 mb-10>
      {{ title }}
    </div>
    <n-select
      v-model:value="modelValue"
      :options="options"
      v-bind="$attrs"
      :show-checkmark="false"
    />
  </div>
</template>
