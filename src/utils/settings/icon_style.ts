import type { IconStyle, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const iconStyleList: SettingItemChildren<IconStyle> = [
  {
    name: '鲜艳',
    key: 'Vivid',
    value: { name: '鲜艳', key: 'Vivid', style: {} },
  },
  {
    name: '朴素',
    key: 'Plain',
    value: { name: '朴素', key: 'Plain', style: { opacity: '0.8', filter: 'saturate(64%)' } },
  },
  {
    name: '灰白',
    key: 'Gray',
    value: { name: '灰白', key: 'Gray', style: { opacity: '0.7', filter: 'grayscale(72%)' } },
  },
]

export const iconStyle = new SettingItem({
  name: '图标风格',
  key: 'IconStyle',
  children: iconStyleList,
  defaultKey: 'Plain',
})
