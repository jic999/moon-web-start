<script setup lang="ts">
const resetModal = useResetModalStore()
</script>

<template>
  <n-modal
    v-model:show="resetModal.resetVisible"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
    :closable="false"
  >
    <template #header>
      <div>{{ resetModal.title }}</div>
    </template>   
    <div>
      <div>{{ resetModal.content }}</div>
    </div> 
    <template #action>
      <div flex gap-x-12>
        <n-button @click="resetModal.handleCancel">
          取消
        </n-button>
        <n-button type="primary" text-color='#ffffff' @click="resetModal.handleCommit">
          确认
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
