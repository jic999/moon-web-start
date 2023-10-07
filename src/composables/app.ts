export const isDark = useDark()

export const toggleDark = useToggle(isDark)

const preferredDark = usePreferredDark()

watch(preferredDark, () => {
  const favicon = document.querySelector('link[rel="icon"]')!
  if (preferredDark.value)
    favicon.setAttribute('href', '/favicon-dark.svg')
  else
    favicon.setAttribute('href', '/favicon.svg')
}, { immediate: true })

export const isXsScreen = useMediaQuery('(max-width: 639px)')

export const isSmScreen = useMediaQuery('(min-width: 640px)')

export const isMdScreen = useMediaQuery('(min-width: 768px)')

export const isLgScreen = useMediaQuery('(min-width: 1024px)')

export const isXlScreen = useMediaQuery('(min-width: 1280px)')
