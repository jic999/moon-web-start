export function addCursorStyle() {
  document.body.style.cursor = 'pointer'
}
export function removeCursorStyle() {
  document.body.style.cursor = ''
}

export function useDrag() {
  const settingStore = useSettingStore()

  const draggableOptions = computed(() => ({
    animation: 200,
    disabled: !settingStore.isSetting,
    ghostClass: 'ghost',
    forceFallback: true,
  }))

  return {
    draggableOptions,
  }
}
