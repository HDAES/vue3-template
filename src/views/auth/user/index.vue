<template>
  <div>
    <BasicTable>
      <template #status="scope">
        <el-switch
          v-model="scope.row.status"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchSatatusChange(scope.row)"
        />
      </template>

      <template #operate="scope">
        <el-button type="text" @click="handleChangePSW(scope.row)"
          >改密</el-button
        >
      </template>
    </BasicTable>

    <Dialog />
  </div>
</template>

<script lang="ts" setup name="auth-user">
import { BasicTable, registerTable } from '@/components/Table'
import Dialog from './Dialog.vue'
import { getUser, deleteUser, putUser, putUserStatus } from '@/api/auth/index'
import { encryptByMd5 } from '@/utils/crypto'
import { ElMessageBox } from 'element-plus'

registerTable({
  title: '管理员管理',
  apiList: getUser,
  apiDelele: {
    api: deleteUser,
    name: 'username'
  },
  tableConfig: {
    selection: true
  },
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
      formatter: ({ sex }) => (sex == 1 ? '男' : sex == 2 ? '女' : '未知')
    },
    {
      label: '状态',
      dataIndex: 'status',
      slotname: 'status'
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

const switchSatatusChange = (e: { id: null; status: any }) => {
  if (e.id != null) {
    putUserStatus({ secUserId: e.id, status: e.status })
  }
}

//修改密码
const handleChangePSW = row => {
  ElMessageBox.prompt('请输入密码', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(({ value }) => {
    putUser({ id: row.id, password: encryptByMd5(value) })
  })
}
</script>
