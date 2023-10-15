import type * as settingData from '@/utils/settings'

export type TextGetter = () => string

export class SettingItem<T> {
  name: TextGetter
  key: string
  children: SettingItemChildren<T>
  defaultKey: string
  value: T

  constructor(options: {
    name: TextGetter
    key: string
    children: SettingItemChildren<T>
    defaultKey?: string
  }) {
    this.name = options.name
    this.key = options.key
    this.key = options.key
    this.children = options.children
    this.defaultKey = options.defaultKey || options.children[0].key
    this.value = options.defaultKey ? options.children.find(item => item.key === options.defaultKey)!.value : options.children[0].value
  }
}

export interface SettingItemsChild<T> {
  name: TextGetter
  key: string
  value: T
}

export type SettingItemChildren<T> = SettingItemsChild<T>[]

export type Settings = Record<keyof typeof settingData, string>

/* Theme */
export interface Theme {
  primaryC: string
  primaryLightC: string
  primaryDarkC: string
  siteHoverC: string
  settingBorderC: string
  bgC: string
  mainBgC: string
  searchBtnC: string
}

/* Search */
export interface Search {
  url: string
  wd: string
  favicon: string
  s: string
}

/* IconStyle */
export type IconStyle = Partial<CSSStyleDeclaration>

/* WebsitePreference */
export type WebsitePreference = 'ChineseMainland' | 'Global' | 'Auto' | 'Customize'

export type Language = 'zh-CN' | 'en' | 'System'
