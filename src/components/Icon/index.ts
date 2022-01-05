import { withInstall } from '@/utils'
import svgIcon from './src/SvgIcon.vue'
import icon from './src/Icon.vue'
import heroIcon from './src/HeroIcon.vue'

export const HeroIcon = withInstall(heroIcon)
export const SvgIcon = withInstall(svgIcon)
export const Icon = withInstall(icon)
