import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerAttributifyJsx,
  transformerDirectives,
} from 'unocss'
import { presetScalpel } from 'unocss-preset-scalpel'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'btn': 'px-4 py-1 rounded inline-block bg-$search-btn-c text-white cursor-pointer hover:op-75 active:brightness-80 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50 transition-300 duration-200',
    'icon-btn': 'text-16 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-$primary-c',
  },
  rules: [
    [
      /^ellipsis-(\d+)$/,
      ([, n]) => ({
        'overflow': 'hidden',
        'text-overflow': 'ellipsis',
        'display': ' -webkit-box',
        '-webkit-line-clamp': `${n}`,
        '-webkit-box-orient': 'vertical',
      }),
    ],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      collections: {
        cus: FileSystemIconLoader('./public/svg'),
      },
    }),
    presetScalpel(),
  ],
  transformers: [
    transformerDirectives(),
    transformerAttributifyJsx(),
  ],
})
