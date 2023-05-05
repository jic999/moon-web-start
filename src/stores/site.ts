import { presetData } from '@/utils'

export interface Site {
  id: number
  name: string
  url: string
  favicon?: string
}
export interface Group {
  id: number
  name: string
  siteList: Site[]
}
export interface Category {
  id: number
  name: string
  groupList: Group[]
}

function loadData(): Category[] | undefined {
  const data = localStorage.getItem('cache')
  return data ? JSON.parse(data) : undefined
}
export const useSiteStore = defineStore('site', () => {
  const data = ref<Category[]>(loadData() || presetData)
  const cateIndex = ref(0)
  const groupIndex = ref(0)
  const siteIndex = ref(0)

  const setCateIndex = (i: number) => cateIndex.value = i
  const setGroupIndex = (i: number) => groupIndex.value = i
  const setSiteIndex = (i: number) => siteIndex.value = i

  const cateList = computed(() => data.value.map(cate => ({ id: cate.id, name: cate.name })))
  const currentCateData = computed(() => data.value[cateIndex.value] || { groupList: [] })

  function addSite(site: Site) {
    console.log('addSite => ', site)
    data.value[cateIndex.value].groupList[groupIndex.value].siteList.push(site)
  }
  function addGroup(group: Group) {
    data.value[cateIndex.value].groupList.push(group)
  }
  function addCate(cate: Category) {
    data.value.push(cate)
  }
  function updateSite(site: Partial<Site>) {
    Object.assign(data.value[cateIndex.value].groupList[groupIndex.value].siteList[siteIndex.value], site)
  }
  function updateGroup(group: Partial<Group>) {
    Object.assign(data.value[cateIndex.value].groupList[groupIndex.value], group)
  }
  function updateCate(cate: Partial<Category>) {
    Object.assign(data.value[cateIndex.value], cate)
  }
  function deleteSite() {
    data.value[cateIndex.value].groupList[groupIndex.value].siteList.splice(siteIndex.value, 1)
  }
  function deleteGroup() {
    data.value[cateIndex.value].groupList.splice(groupIndex.value, 1)
  }
  function deleteCate() {
    data.value.splice(cateIndex.value, 1)
  }
  function cachingData() {
    localStorage.setItem('cache', JSON.stringify(data.value))
  }

  watch(data, () => {
    cachingData()
  }, { deep: true })

  return {
    data,
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
  }
})
