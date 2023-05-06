import type { ThemeColor } from '@/utils'
import { themeList } from '@/utils'

type ThemeVar = keyof ThemeColor
type ThemeVars<T extends ThemeColor> = { [K in keyof T]: Ref<string> }

const settingsCache = loadSettings()
const defaultTheme: string = settingsCache ? settingsCache.theme : 'EarlySpring'
function camelToCssVar(str: string) {
  return `--${str.replace(/[A-Z]|[0-9]+/g, (match: string) => `-${match.toLowerCase()}`)}`
}

const currentTheme = themeList.find(item => item.enName === defaultTheme)!
export const themeVars: ThemeVars<ThemeColor> = Object.keys(
  currentTheme.theme).reduce(
  (obj, key) => {
    const cssVar = camelToCssVar(key)
    document.documentElement.style.setProperty(cssVar, currentTheme.theme[key as ThemeVar])
    obj[key as ThemeVar] = useCssVar(cssVar)
    return obj
  },
  {} as Partial<ThemeVars<ThemeColor>>,
) as ThemeVars<ThemeColor>

export function toggleTheme(theme: string) {
  const newTheme = themeList.find(item => item.enName === theme)!
  for (const key in newTheme.theme)
    themeVars[key as ThemeVar].value = newTheme.theme[key as ThemeVar]
}
