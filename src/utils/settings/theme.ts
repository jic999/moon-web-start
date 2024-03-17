import type { SettingItemChildren, Theme } from '@/types'
import { SettingItem } from '@/types'

const themeChildren: SettingItemChildren<Theme> = [
  {
    name: () => t('settings.theme.earlySpring'),
    key: 'EarlySpring',
    value: {
      primaryC: '#87a8a4',
      primaryLightC: '#a0c7c2',
      primaryDarkC: '#6d8784',
      siteHoverC: '#a0c7c222',
      settingBorderC: '#6d8784aa',
      bgC: '#87a8a4',
      mainBgC: '#f3f4f6',
      searchBtnC: '#87a8a4',
    },
  },
  {
    name: () => t('settings.theme.vastOcean'),
    key: 'VastOcean',
    value: {
      primaryC: '#146C94',
      primaryLightC: '#1a8dc2',
      primaryDarkC: '#115d80',
      siteHoverC: '#1a8dc222',
      settingBorderC: '#115d80aa',
      bgC: '#0A4D68',
      mainBgC: '#f3f4f6',
      searchBtnC: '#146C94',
    },
  },
  {
    name: () => t('settings.theme.endlessDesert'),
    key: 'EndlessDesert',
    value: {
      primaryC: '#bc6c25',
      primaryLightC: '#d47a2a',
      primaryDarkC: '#96561e',
      siteHoverC: '#d47a2a22',
      settingBorderC: '#96561eaa',
      bgC: '#BF9270',
      mainBgC: '#f3f4f6',
      searchBtnC: '#bc6c25',
    },
  },
  {
    name: () => t('settings.theme.moonWhite'),
    key: 'MoonWhite',
    value: {
      primaryC: '#555555',
      primaryLightC: '#888888 ',
      primaryDarkC: '#333333',
      siteHoverC: '#77777722',
      settingBorderC: '#333333aa',
      bgC: '#E7E6E1',
      mainBgC: '#f3f4f6',
      searchBtnC: '#555555',
    },
  },
]

export const theme = new SettingItem({
  name: () => t('settings.theme.title'),
  key: 'Theme',
  children: themeChildren,
  defaultKey: 'MoonWhite',
})
