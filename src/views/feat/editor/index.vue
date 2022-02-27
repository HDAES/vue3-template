<template>
  <div>
    <div ref="editor"></div>
    <button @click="syncHTML">同步内容</button>
    <div :innerHTML="content.html"></div>
  </div>
</template>

<script lang="ts" setup>
import WangEditor from 'wangeditor'
// https://www.wangeditor.com/doc/
// tinymce
const editor = ref()
const content = reactive({
  html: '',
  text: ''
})
let instance
onMounted(() => {
  instance = new WangEditor(editor.value)
  instance.config.menuTooltipPosition = 'down'
  Object.assign(instance.config, {
    onchange() {
      console.log('change')
    }
  })
  instance.create()
})
onBeforeUnmount(() => {
  instance.destroy()
  instance = null
})
const syncHTML = () => {
  content.html = instance.txt.html()
}
</script>
