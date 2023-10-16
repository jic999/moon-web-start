export function useDrag() {
  const settingStore = useSettingStore()

  const disabled = ref(false)
  const draggableOptions = computed(() => ({
    animation: 200,
    disabled: !settingStore.isSetting || disabled.value,
    ghostClass: 'ghost',
    forceFallback: true,
    delay: isSmScreen.value ? 0 : 100,
    fallbackTolerance: 3,
  }))

  function handleStart() {
    if (!handleCustomize()) {
      disabled.value = true
      return
    }

    document.body.style.cursor = 'pointer'
    settingStore.setIsDragging(true)
  }
  function handleEnd() {
    if (disabled.value)
      disabled.value = false
    document.body.style.cursor = ''
    settingStore.setIsDragging(false)
  }

  return {
    draggableOptions,
    handleStart,
    handleEnd,
  }
}
