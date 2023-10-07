export const isDark = useDark()

export function toggleDark(event: MouseEvent) {
  // @ts-expect-error experimental API
  const isAppearanceTransition = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!isAppearanceTransition) {
    isDark.value = !isDark.value
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })
  transition.ready
    .then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: isDark.value
            ? [...clipPath].reverse()
            : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-out',
          pseudoElement: isDark.value
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      )
    })
}

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
