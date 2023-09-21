export const isDark = useDark()

export const toggleDark = useToggle(isDark)

export const isXsScreen = useMediaQuery('(max-width: 639px)')

export const isSmScreen = useMediaQuery('(min-width: 640px)')

export const isMdScreen = useMediaQuery('(min-width: 768px)')

export const isLgScreen = useMediaQuery('(min-width: 1024px)')

export const isXlScreen = useMediaQuery('(min-width: 1280px)')
