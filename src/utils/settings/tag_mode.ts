import type { SettingItemChildren, TagMode } from '@/types'
import { SettingItem } from '@/types'

const tagModeList: SettingItemChildren<TagMode> = [
  { name: () => t('settings.tagMode.concise'), key: 'Concise', value: 'Concise' },
  { name: () => t('settings.tagMode.full'), key: 'Full', value: 'Full' },
]

export const tagMode = new SettingItem({
  name: () => t('settings.tagMode.title'),
  key: 'TagType',
  children: tagModeList,
  defaultKey: 'Concise',
})
