import type { SettingItem } from '@/stores/setting'
export interface WebStyle {
name: string
enName: string
}
export type WebStyleSetting = SettingItem<WebStyle>
export const siteStyleList: WebStyleSetting[] = [
    {
        name: '系统自动',
        enName: 'auto',
        value: { name: '系统自动', enName: 'auto' }
    },
    {
        name: '夜晚模式',
        enName: 'dark',
        value: { name: '夜晚模式', enName: 'dark' }
    },
    {
        name: '白天模式',
        enName: 'light',
        value: { name: '白天模式', enName: 'light' }
    },
]
