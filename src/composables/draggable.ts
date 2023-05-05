export function useDrag() {
  const settingStore = useSettingStore()

  const draggableOptions = computed(() => ({
    animation: 200,
    disabled: !settingStore.isSetting,
    ghostClass: 'ghost',
    forceFallback: true,
  }))

  function handleStart() {
    document.body.style.cursor = 'pointer'
    settingStore.setIsDragging(true)
  }
  function handleEnd() {
    document.body.style.cursor = ''
    settingStore.setIsDragging(false)
  }

  return {
    draggableOptions,
    handleStart,
    handleEnd,
  }
}
