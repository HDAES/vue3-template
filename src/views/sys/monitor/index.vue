<template>
  <div>
    <BasicTable>
      <template #operate="scope">
        <el-button
          type="text"
          style="color: #f00"
          v-has="'btn:sys:monitor:delete'"
          @click="handleKickOut(scope.row)"
          >踢出</el-button
        >
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" setup>
import { BasicTable, registerTable, useTable } from '@/components/Table'
import { getOnline, deleteKickout } from '@/api/sys/index'
import { ElMessageBox, ElMessage } from 'element-plus'

const { refresh } = useTable()

const handleKickOut = (row: any) => {
  ElMessageBox.confirm(`是否踢出 ${row.username}?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      deleteKickout({ ids: row.id }).then(res => {
        refresh()
      })
    })
    .catch(() => {
      ElMessage({ type: 'info', message: '已取消' })
    })
}

registerTable({
  title: '管理员管理',
  apiList: getOnline,
  tableConfig: {
    selection: true
  },
  customOperate: true,
  columns: [
    {
      label: '角色名',
      dataIndex: 'username'
    },
    {
      label: '昵称',
      dataIndex: 'nickname'
    },
    {
      label: '头像',
      dataIndex: 'avatar'
    },
    {
      label: '手机',
      dataIndex: 'phone'
    },
    {
      label: '性别',
      dataIndex: 'sex',
      formatter: ({ sex }) => {
        return sex == 1 ? '男' : sex == 2 ? '女' : '未知'
      }
    },
    {
      label: '状态',
      dataIndex: 'status',
      formatter: ({ status }) => {
        return status == 1 ? '正常' : '暂停'
      }
    },
    {
      label: '操作',
      width: 150,
      dataIndex: 'operate',
      align: 'center',
      slotname: 'operate'
    }
  ]
})
</script>
