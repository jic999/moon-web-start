import preset from '@/preset.json'
import globalPreset from '@/preset_global.json'
import type { Category, Group, Site, WebsitePreference } from '@/types'
import { deepClone } from '@/utils'

function loadData(): Category[] | undefined {
  const data = localStorage.getItem('cache')
  return data ? JSON.parse(data) : undefined
}
export const useSiteStore = defineStore('site', () => {
  const settingStore = useSettingStore()
  const websitePreference = computed(() => settingStore.settings.websitePreference as WebsitePreference)

  const languages = usePreferredLanguages()
  const preferredPresetData = computed(() => languages.value[0] === 'zh-CN' ? preset.data : globalPreset.data)

  // Custom data
  const customData = ref<Category[]>(loadData() || [])
  watch(customData, () => {
    cachingData()
  }, { deep: true })

  // Display data
  const data = computed((): Category[] => {
    if (websitePreference.value === 'Chinese Mainland')
      return preset.data
    if (websitePreference.value === 'Global')
      return globalPreset.data
    if (websitePreference.value === 'Auto')
      return preferredPresetData.value

    // ? init custom data
    if (websitePreference.value === 'Customize' && customData.value.length === 0)
      customData.value = deepClone(data.value)
    return customData.value
  })

  const cateIndex = ref(0)
  const groupIndex = ref(0)
  const siteIndex = ref(0)

  const setCateIndex = (i: number) => cateIndex.value = i
  const setGroupIndex = (i: number) => groupIndex.value = i
  const setSiteIndex = (i: number) => siteIndex.value = i

  const cateList = computed(() => data.value.map(cate => ({ id: cate.id, name: cate.name })))
  const currentCateData = computed(() => data.value[cateIndex.value] || { groupList: [] })

  function addSite(site: Site) {
    customData.value[cateIndex.value].groupList[groupIndex.value].siteList.push(site)
  }
  function addGroup(group: Group) {
    customData.value[cateIndex.value].groupList.push(group)
  }
  function addCate(cate: Category) {
    customData.value.push(cate)
  }
  function updateSite(site: Partial<Site>) {
    Object.assign(customData.value[cateIndex.value].groupList[groupIndex.value].siteList[siteIndex.value], site)
  }
  function updateGroup(group: Partial<Group>) {
    Object.assign(customData.value[cateIndex.value].groupList[groupIndex.value], group)
  }
  function updateCate(cate: Partial<Category>) {
    Object.assign(customData.value[cateIndex.value], cate)
  }
  function deleteSite() {
    customData.value[cateIndex.value].groupList[groupIndex.value].siteList.splice(siteIndex.value, 1)
  }
  function deleteGroup() {
    customData.value[cateIndex.value].groupList.splice(groupIndex.value, 1)
  }
  function deleteCate() {
    customData.value.splice(cateIndex.value, 1)
  }
  function cachingData() {
    localStorage.setItem('cache', JSON.stringify(customData.value))
  }
  function setData(value: Category[]) {
    customData.value = value
  }
  function restoreData() {
    /**
     * 清空 customData 和 localStorage
     * 以便用户重置数据后可以选择其他预设进行自定义
     *
     * Clear customData and localStorage
     * So that users can select other presets for customize after restoring the data
     */
    settingStore.setSettings({ websitePreference: 'Auto' })
    setData([])
    localStorage.removeItem('cache')
  }

  return {
    data,
    customData,
    cateIndex,
    cateList,
    currentCateData,
    setCateIndex,
    setGroupIndex,
    setSiteIndex,
    addSite,
    addGroup,
    addCate,
    updateSite,
    updateGroup,
    updateCate,
    deleteSite,
    deleteGroup,
    deleteCate,
    setData,
    restoreData,
  }
})
