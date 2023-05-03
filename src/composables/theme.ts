import { presetThemeList } from '@/utils'

interface Theme {
  primaryC: string
  primaryLightC: string
  primaryDarkC: string
  siteHoverC: string
  settingBorderC: string
  settingGroupBgC: string
  bgC: string
  mainBgC: string
}
type ThemeVar = keyof Theme
type ThemeVars<T> = { [K in keyof T]: Ref<string> }

const themeList = presetThemeList

export type ThemeName = keyof typeof themeList

const settingsCache = loadSettings()
const defaultTheme: ThemeName = settingsCache ? settingsCache.theme : 'earlySpring'
function camelToCssVar(str: string) {
  return `--${str.replace(/[A-Z]|[0-9]+/g, (match: string) => `-${match.toLowerCase()}`)}`
}

export const themeVars: ThemeVars<Theme> = Object.keys(themeList[defaultTheme]).reduce(
  (obj, key) => {
    const cssVar = camelToCssVar(key)
    document.documentElement.style.setProperty(cssVar, themeList[defaultTheme][key as ThemeVar])
    obj[key as ThemeVar] = useCssVar(cssVar)
    return obj
  },
  {} as Partial<ThemeVars<Theme>>,
) as ThemeVars<Theme>

export function toggleTheme(theme: ThemeName) {
  for (const key in themeList[theme])
    themeVars[key as ThemeVar].value = themeList[theme][key as ThemeVar]
}
