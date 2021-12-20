<template>
  <el-input v-model="input" placeholder="Please input" />
  <el-table :data="tableData" style="width: 100%; margin-top: 20px">
    <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>

  <el-radio v-model="radio1" label="1">备选项1</el-radio>
  <el-radio v-model="radio1" label="2">备选项2</el-radio>

  <el-card class="box-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span>卡片名称</span>
        <el-button class="button" type="text">操作按钮</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ '列表内容 ' + o }}</div>
  </el-card>

  <el-pagination
    v-model:currentPage="currentPage4"
    :page-sizes="[100, 200, 300, 400]"
    :page-size="100"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>

  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
  <DarkModeToggle />
</template>

<script lang="ts" setup>
import DarkModeToggle from '@/components/DarkModeToggle/index.vue'
import { ref } from 'vue'

const input = ref('')
const currentPage4 = ref(5)

const handleSizeChange = val => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = val => {
  console.log(`current page: ${val}`)
}

const radio1 = ref(false)
const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
const value = ref('')
const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]
</script>

<style lang="scss" scoped></style>
