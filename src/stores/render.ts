import { getRandomComplexNumber } from '@/utils'

export const useRenderStore = defineStore('render', () => {
  const siteGroupListKey = ref(getRandomComplexNumber())

  function refreshSiteGroupList() {
    siteGroupListKey.value = getRandomComplexNumber()
  }

  return {
    siteGroupListKey,
    refreshSiteGroupList,
  }
})
