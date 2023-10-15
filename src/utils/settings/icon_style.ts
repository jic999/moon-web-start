import type { IconStyle, SettingItemChildren } from '@/types'
import { SettingItem } from '@/types'

const iconStyleList: SettingItemChildren<IconStyle> = [
  {
    name: () => t('settings.iconStyle.vivid'),
    key: 'Vivid',
    value: {},
  },
  {
    name: () => t('settings.iconStyle.plain'),
    key: 'Plain',
    value: { opacity: '0.8', filter: 'saturate(64%)' },
  },
  {
    name: () => t('settings.iconStyle.gray'),
    key: 'Gray',
    value: { opacity: '0.7', filter: 'grayscale(72%)' },
  },
]

export const iconStyle = new SettingItem({
  name: () => t('settings.iconStyle.title'),
  key: 'IconStyle',
  children: iconStyleList,
  defaultKey: 'Plain',
})
