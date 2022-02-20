<template>
  <el-popover v-model:visible="visible" placement="bottom" :width="400">
    <template #reference>
      <el-input
        v-model="iconName"
        @clear="$emit('update:icon', '')"
        @focus="visible = true"
        @blur="visible = false"
        placeholder="请输入图标名"
        clearable
      >
        <template #prepend>
          <Icon :name="iconName" v-if="iconName" />
        </template>
      </el-input>
    </template>
    <el-scrollbar max-height="200px">
      <el-row>
        <el-col
          :span="12"
          v-for="(item, index) in iconNames"
          :key="index"
          @click="handleSelect(item)"
          style="margin-bottom: 10px"
        >
          <el-button :icon="item" size="small" circle></el-button>
          <span style="cursor: pointer">{{ item }}</span>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-popover>
</template>

<script lang="ts" setup>
import { globalState } from '@/utils/storage'
const emit = defineEmits(['update:icon'])
const props = defineProps({
  icon: {
    type: String,
    default: ''
  }
})
const visible = ref<boolean>(false)
const { iconNames } = globalState()

const iconName = ref<string>(props.icon)

const handleSelect = (name: string): void => {
  iconName.value = name
  emit('update:icon', name)
  visible.value = false
}
</script>
