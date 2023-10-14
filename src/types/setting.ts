import type * as settingData from '@/utils/settings'

export class SettingItem<T> {
  name: string
  enName: string
  children: SettingItemChildren<T>
  defaultKey: string
  value: T

  constructor(options: {
    name: string
    enName: string
    children: SettingItemChildren<T>
    defaultKey?: string
  }) {
    this.name = options.name
    this.enName = options.enName
    this.children = options.children
    this.defaultKey = options.defaultKey || options.children[0].enName
    this.value = options.defaultKey ? options.children.find(item => item.enName === options.defaultKey)!.value : options.children[0].value
  }
}

export interface SettingItemsChild<T> {
  name: string
  enName: string
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

/* WebsitePreference */
export type WebsitePreference = 'Chinese Mainland' | 'Global' | 'Auto' | 'Customize'
