<template>
  <div>
    <el-card header="粘贴板">
      <el-input placeholder="请输入内容" v-model="text" style="width: 200px">
        <template #append>
          <el-button icon="document-copy" @click="handleCopy"></el-button>
        </template>
      </el-input>

      <el-button type="text" @click="handleCopy">点击复制</el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import useClipboard from '@/utils/clipboard3'
import { ElMessage } from 'element-plus'
const text = ref('')
const { toClipboard } = useClipboard(null)
const handleCopy = async () => {
  try {
    await toClipboard(text.value)
    ElMessage.success('复制成功！')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}
</script>
