<script setup lang="ts">
const modalStore = useModalStore()

const inputStatus = ref<'error' | 'success'>('success')

function handleCommit() {
  if (
    !modalStore.inputValues.name
    || (modalStore.target === 'site' && !modalStore.inputValues.url.trim())
  ) {
    inputStatus.value = 'error'
    setTimeout(() => inputStatus.value = 'success', 500)
    return
  }
  modalStore.handleCommit()
}
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
    <div flex flex-col gap-y-16>
      <n-input
        v-model:value="modalStore.inputValues.name"
        :status="modalStore.inputValues.name ? undefined : inputStatus "
        placeholder="名称"
        @keydown.enter="modalStore.handleCommit"
      />
      <n-input
        v-if="modalStore.target === 'site'"
        v-model:value="modalStore.inputValues.url"
        :status="modalStore.inputValues.url.trim() ? undefined : inputStatus "
        placeholder="链接"
        @keydown.enter="modalStore.handleCommit"
      />
      <n-input
        v-if="modalStore.target === 'site'"
        v-model:value="modalStore.inputValues.favicon"
        placeholder="图标链接（选填）"
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
        <n-button type="primary" @click="handleCommit">
          确认
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
