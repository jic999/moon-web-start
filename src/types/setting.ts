export interface Settings {
  theme: string
  search: string
  iconStyle: string
}
export interface SettingItem<T> {
  name: string
  enName: string
  value: T
}
export type SettingKey = keyof Settings

export type SettingItems<T> = SettingItem<T>[]

/* Theme */
export interface Theme {
  primaryC: string
  primaryLightC: string
  primaryDarkC: string
  siteHoverC: string
  settingBorderC: string
  settingGroupBgC: string
  bgC: string
  mainBgC: string
}

/* Search */
export interface Search {
  name: string
  enName: string
  url: string
  key: string
  favicon: string
  s: string
}

/* IconStyle */
export interface IconStyle {
  name: string
  enName: string
  style: Partial<CSSStyleDeclaration>
}
