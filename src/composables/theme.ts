import type { Theme } from '@/types'
import { theme } from '@/utils'
import preset from '@/preset.json'

type ThemeVar = keyof Theme
type ThemeVars = { [K in keyof Theme]: Ref<string> }

const settingsCache = loadSettings()
const defaultTheme: string = settingsCache ? settingsCache.theme : preset.settings.theme

function camelToCssVar(str: string) {
  return `--${str.replace(/[A-Z]|[0-9]+/g, (match: string) => `-${match.toLowerCase()}`)}`
}

const currentTheme = theme.children.find(item => item.enName === defaultTheme)!.value

// 根据主题设置 CSS 变量
export const themeVars: ThemeVars = Object.keys(
  currentTheme,
).reduce(
  (obj, key) => {
    const cssVar = camelToCssVar(key)
    document.documentElement.style.setProperty(cssVar, currentTheme[key as ThemeVar])
    obj[key as ThemeVar] = useCssVar(cssVar)
    return obj
  },
  {} as Partial<ThemeVars>,
) as ThemeVars

export function toggleTheme(key: string) {
  const newTheme = theme.children.find(item => item.enName === key)!.value
  for (const key in newTheme)
    themeVars[key as ThemeVar].value = newTheme[key as ThemeVar]
}
