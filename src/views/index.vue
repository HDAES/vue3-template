<template>
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
