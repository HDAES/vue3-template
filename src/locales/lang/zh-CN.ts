import { genMessage } from '../helper'

const modules = import.meta.globEager('./zh-CN/**/*.ts')
console.log(modules)
export default {
  message: {
    ...genMessage(modules, 'zh-CN')
  },
  momentLocaleName: 'zh-cn'
}
