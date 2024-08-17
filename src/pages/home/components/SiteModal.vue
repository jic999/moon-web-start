<script setup lang="ts">
import { FAVICON_MAP_SYMBOL, getFaviconUrl } from '@/utils'

const modalStore = useModalStore()
const siteStore = useSiteStore()

const inputStatus = ref<'error' | 'success'>('success')

const faviconMap = inject<Ref<Map<number, HTMLImageElement | HTMLDivElement>>>(FAVICON_MAP_SYMBOL)!

function handleCommit() {
  if (
    !modalStore.inputValues.name
    || (modalStore.target === 'site' && !modalStore.inputValues.url.trim())
  ) {
    inputStatus.value = 'error'
    setTimeout(() => inputStatus.value = 'success', 500)
    return
  }

  // 更新图标
  if (modalStore.target === 'site' && modalStore.action === 'update') {
    const site = siteStore.getCurrentSite()
    const favicon = faviconMap.value.get(site.id)!

    const parent = favicon.parentElement!
    const img = new Image()

    img.src = modalStore.inputValues.favicon || getFaviconUrl(modalStore.inputValues.url)
    img.onload = () => {
      faviconMap.value.set(site.id, img)
      parent.removeChild(favicon)
      parent.appendChild(img)
    }
    img.onerror = () => {
      const divEl = document.createElement('div')
      divEl.innerText = site.name.toLocaleUpperCase().charAt(0)
      faviconMap.value.set(site.id, divEl)
      parent.removeChild(favicon)
      parent.appendChild(divEl)
    }
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
        :placeholder="$t('common.name')"
        @keydown.enter="handleCommit"
      />
      <n-input
        v-if="modalStore.target === 'site'"
        v-model:value="modalStore.inputValues.url"
        :status="modalStore.inputValues.url.trim() ? undefined : inputStatus "
        :placeholder="$t('common.link')"
        @keydown.enter="handleCommit"
      />
      <n-collapse v-if="modalStore.target === 'site'">
        <n-collapse-item :title="$t('common.more')">
          <div flex flex-col gap-y-16>
            <n-input
              v-model:value="modalStore.inputValues.desc"
              :placeholder="$t('siteDescPlaceholder')"
              @keydown.enter="handleCommit"
            />
            <n-input
              v-model:value="modalStore.inputValues.favicon"
              :placeholder="$t('iconLinkPlaceholder')"
              @keydown.enter="handleCommit"
            />
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
    <template #action>
      <div flex gap-x-12>
        <n-button @click="modalStore.handleCancel">
          {{ $t('button.cancel') }}
        </n-button>
        <n-button v-if="modalStore.action === 'update'" type="error" @click="modalStore.handleDelete">
          {{ $t('button.delete') }}
        </n-button>
        <n-button type="primary" @click="handleCommit">
          {{ $t('button.confirm') }}
        </n-button>
      </div>
    </template>
  </n-modal>
</template>
