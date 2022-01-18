import { withInstall } from '@/utils'
import flip from './src/flip.vue'
import flipClock from './src/FlipClock.vue'

export const Flip = withInstall(flip)
export const FlipClock = withInstall(flipClock)
