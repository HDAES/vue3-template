/*
 * @Descripttion: 按需引入
 * @Author: Hades
 * @Date: 2021-09-14 10:00:35
 */

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { Plugin } from 'vite'

export function configAutoImportPlugin(): Plugin | Plugin[] {
  const plugins: Plugin[] = []

  plugins.push(
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: 'types/auto-imports.d.ts'
    })
  )

  plugins.push(
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dirs: ['src/components'],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: false,
      //指定类型声明文件
      dts: 'types/components.d.ts'
    })
  )

  return plugins
}
