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

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue', val),
})
</script>

<template>
  <div flex items-center justify-between flex-shrink-0 w-320>
    <div text="14" inline-block overflow-hidden w-20p w-80 md:w-auto>
      {{ title }}
    </div>
    <n-select
      v-model:value="modelValue"
      class="w-240"
      :options="options"
      v-bind="$attrs"
    />
  </div>
</template>
