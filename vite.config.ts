import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import Unocss from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  base: process.env.REPOSITORY ? `/${process.env.REPOSITORY.split('/').pop()}/` : '',
  plugins: [
    Vue(),
    Unocss(),
    Pages(),
    VueMacros(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue/macros'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dirs: ['src/components/**'],
      extensions: ['vue', 'tsx'],
      dts: 'src/components.d.ts',
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'src/locales/**')],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 1888,
    host: '0.0.0.0',
  },
})
