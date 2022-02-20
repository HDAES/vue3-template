<template>
  <Icon name="SearchOutlined" @click="dialogVisible = true" />

  <el-dialog v-model="dialogVisible" title="搜索" width="30%">
    <input class="w-full bg-gray-300 h-10 rounded-3xl text-center" />
    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
const dialogVisible = ref(false)
</script>

<style lang="scss" scoped></style>
