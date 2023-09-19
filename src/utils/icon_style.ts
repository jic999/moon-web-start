import type { SettingItem } from '@/stores/setting'

export interface IconStyle {
  name: string
  enName: string
  style: Partial<CSSStyleDeclaration>
}

export type IconStyleSetting = SettingItem<IconStyle>

export const iconStyleList: IconStyleSetting[] = [
  {
    name: '鲜艳',
    enName: 'Vivid',
    value: { name: '鲜艳', enName: 'Vivid', style: {} },
  },
  {
    name: '朴素',
    enName: 'Plain',
    value: { name: '朴素', enName: 'Plain', style: { opacity: '0.8', filter: 'saturate(72%)' } },
  },
  {
    name: '灰白',
    enName: 'Gray',
    value: { name: '灰白', enName: 'Gray', style: { opacity: '0.7', filter: 'grayscale(72%)' } },
  },
]
