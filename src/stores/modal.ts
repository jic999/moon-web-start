export type ActionType = 'add' | 'update'
export type ActionTarget = 'cate' | 'group' | 'site'

const ACTION_NAME = {
  add: '添加',
  update: '编辑',
}
const TARGET_NAME = {
  cate: '分类',
  group: '分组',
  site: '网页',
}
export const useModalStore = defineStore('modal', () => {
  const modalVisible = ref(false)
  const action = ref<ActionType>('add')
  const target = ref<ActionTarget>('site')
  const title = computed(() => ACTION_NAME[action.value] + TARGET_NAME[target.value])

  const siteStore = useSiteStore()
  const inputValues = reactive({
    name: '',
    url: '',
    favicon: '',
    bgColor: '',
  })

  // ! get common props
  type CommonProperties<T, U> = {
    [K in Extract<keyof T, keyof U>]: T[K] | U[K];
  }
  function getCommonProps<T extends object, U extends object>(obj1: T, obj2: U): CommonProperties<T, U> {
    const commonProps = {} as CommonProperties<T, U>
    Object.keys(obj1).forEach((key) => {
      const K = key as keyof CommonProperties<T, U>
      if (obj1[K] !== undefined && obj2[K] !== undefined)
        commonProps[K] = obj2[K]
    })
    return commonProps
  }
  function showModal(actionType: ActionType, actionTarget: ActionTarget, groupIndex = -1, siteIndex = -1) {
    action.value = actionType
    target.value = actionTarget
    if (groupIndex !== -1)
      siteStore.setGroupIndex(groupIndex)
    if (siteIndex !== -1)
      siteStore.setSiteIndex(siteIndex)
    modalVisible.value = true
    // init inputs
    if (actionType === 'update') {
      const updateTarget = {
        site: () => getCommonProps(inputValues, siteStore.data[siteStore.cateIndex].groupList[groupIndex].siteList[siteIndex]),
        group: () => getCommonProps(inputValues, siteStore.data[siteStore.cateIndex].groupList[groupIndex]),
        cate: () => getCommonProps(inputValues, siteStore.data[siteStore.cateIndex]),
      }
      Object.assign(inputValues, updateTarget[actionTarget]())
    }
  }

  let now = 0
  const commitHandler = {
    add: {
      site: () => siteStore.addSite({ id: now, ...inputValues }),
      group: () => siteStore.addGroup({ id: now, name: inputValues.name, siteList: [] }),
      cate: () => siteStore.addCate({ id: now, name: inputValues.name, groupList: [] }),
    },
    update: {
      site: () => siteStore.updateSite({ ...inputValues }),
      group: () => siteStore.updateGroup({ name: inputValues.name }),
      cate: () => siteStore.updateCate({ name: inputValues.name }),
    },
  }
  const deleteHandler = {
    site: () => siteStore.deleteSite(),
    group: () => siteStore.deleteGroup(),
    cate: () => siteStore.deleteCate(),
  }
  function handleCancel() {
    modalVisible.value = false
  }
  let isCommit = false
  function handleCommit() {
    if (isCommit)
      return
    isCommit = true
    now = Date.now()
    commitHandler[action.value][target.value]()
    modalVisible.value = false
    setTimeout(() => isCommit = false, 1000)
  }
  function handleDelete() {
    deleteHandler[target.value]()
    modalVisible.value = false
    // If delete a cate, cateIndex--
    if (target.value === 'cate' && siteStore.cateIndex > 0)
      siteStore.setCateIndex(siteStore.cateIndex - 1)
  }
  function clearInput() {
    let key: keyof typeof inputValues
    for (key in inputValues) inputValues[key] = ''
  }

  return {
    modalVisible,
    action,
    target,
    title,
    inputValues,
    showModal,
    handleCancel,
    handleCommit,
    handleDelete,
    clearInput,
  }
})
