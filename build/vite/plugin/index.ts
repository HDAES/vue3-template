import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

import { configHtmlPlugin } from './html'
import { configSvgIconsPlugin } from './svgSprite'
import { configCompressPlugin } from './compress'
import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [vue()]

  // vite-plugin-windicss
  vitePlugins.push(windiCSS())

  //vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  //vite-plugin-vue-setup-extend
  //vitePlugins.push(VueSetupExtend())

  //unplugin-auto-import
  vitePlugins.push(
    AutoImport({
      resolvers: [ElementPlusResolver()]
    })
  )

  vitePlugins.push(
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ]
    })
  )

  if (isBuild) {
    //vite-plugin-compression
    vitePlugins.push(configCompressPlugin('brotli', false, false))

    vitePlugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    )
  }
  return vitePlugins
}
