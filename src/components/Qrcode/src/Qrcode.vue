<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { toDataURL, toCanvas } from 'qrcode'
export default {
  props: {
    value: {
      type: [String, Array] as PropType<string | any[]>,
      default: null
    },
    // 宽度
    width: {
      type: Number as PropType<number>,
      default: 200
    },
    tag: {
      type: String as PropType<'canvas' | 'img'>,
      default: 'canvas',
      validator: (v: string) => ['canvas', 'img'].includes(v)
    }
  },
  setup(props, { emit }) {
    const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)
    const { tag, value, width } = props
    async function createQrcode() {
      try {
        if (tag === 'canvas') {
          await toCanvas(
            wrapRef.value,
            value,
            { errorCorrectionLevel: 'H', width, margin: 2, quality: 1 },
            function (error) {}
          )
        }

        if (tag === 'img') {
          await toDataURL(
            value,
            {
              errorCorrectionLevel: 'H',
              type: 'image/jpeg',
              quality: 1,
              margin: 1,
              width
            },
            function (error, url) {
              ;(wrapRef.value as HTMLImageElement).src = url
            }
          )
        }
      } catch (error) {
        emit('error', error)
      }
    }

    watchEffect(() => {
      createQrcode()
    })

    return {
      wrapRef,
      tag
    }
  }
}
</script>
