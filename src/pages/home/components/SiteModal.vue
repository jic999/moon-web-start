<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <n-modal
    v-model:show="modalStore.modalVisible"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
    :closable="false"
    :on-after-leave="modalStore.clearInput"
  >
    <template #header>
      <div>{{ modalStore.title }}</div>
    </template>
    <div>
      <n-input v-model:value="modalStore.inputValues.name" placeholder="名称" my-8 @keydown.enter="modalStore.handleCommit" />
      <n-input
        v-if="modalStore.target === 'site'"
        v-model:value="modalStore.inputValues.url"
        placeholder="链接"
        my-8
        @keydown.enter="modalStore.handleCommit"
      />
      <n-input
        v-if="modalStore.target === 'site'"
        v-model:value="modalStore.inputValues.favicon"
        placeholder="图标链接（选填）"
        my-8
        @keydown.enter="modalStore.handleCommit"
      />
    </div>
    <template #action>
      <div flex gap-x-12>
        <n-button @click="modalStore.handleCancel">
          取消
        </n-button>
        <n-button v-if="modalStore.action === 'update'" type="error" @click="modalStore.handleDelete">
          删除
        </n-button>
        <n-button type="primary" @click="modalStore.handleCommit">
          确认
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
