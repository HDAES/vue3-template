<template>
  <div>
    <BasicTable @register="registerTable">
      <template #status="scope">
        <el-switch
          v-model="scope.row.status"
          :active-value="1"
          :inactive-value="0"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChange(scope.row)"
        />
      </template>

      <template #operate="scope">
        <el-button type="text" @click="handleChangePSW(scope.row)"
          >改密</el-button
        >
      </template>
    </BasicTable>

    <el-dialog
      v-model="dialogVisible"
      :title="modifyType == 'edit' ? '编辑' : '新增'"
      width="600px"
    >
      <el-form
        label-width="80px"
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
      >
        <el-row>
          <el-col v-if="modifyType == 'edit'" :span="12">
            <el-form-item label="ID：">
              <el-input
                v-model="formData.id"
                disabled
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名：" prop="username">
              <el-input
                v-model="formData.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称：" prop="nickname">
              <el-input v-model="formData.nickname" placeholder="请输入昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色：" prop="roleIds">
              <el-select
                multiple
                v-model="formData.roleIds"
                placeholder="请选择角色"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in roleOptions"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="modifyType == 'add'">
            <el-form-item label="密码：" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { BasicTable, useTable } from '@/components/Table'
import { reactive, ref } from 'vue'
import {
  getAllRoleList,
  getUser,
  putUserStatus,
  postUserAdd,
  deleteUser,
  putUser
} from '@/api/auth/index'
import { encryptByMd5 } from '@/utils/crypto'
import { ElMessageBox } from 'element-plus'

interface Role {
  name: string
  id: string
}

interface FormData {
  id?: string
  username: string
  nickname: string
  roleIds: string[]
  password?: string
}

const roleOptions = ref<Role[]>([])
const ruleFormRef = ref()

const handleGetRoles = async () => {
  if (roleOptions.value.length == 0) {
    roleOptions.value = await getAllRoleList()
  }
}

const [registerTable, { load, dialogVisible, modifyType, refresh }] = useTable({
  title: '管理员管理',
  title_en: 'user-table',
  apiList: getUser,
  handleAdd: handleGetRoles,
  handleEdit: row => {
    let roleIds: string[] = []
    row.roles.forEach(item => roleIds.push(item.id))
    formData.value = {
      id: row.id,
      username: row.username,
      nickname: row.nickname,
      roleIds
    }
    handleGetRoles()
  },
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

const formData = ref<FormData>({
  username: '',
  nickname: '',
  password: '',
  roleIds: []
})

const switchChange = (e: { id: null; status: any }) => {
  if (e.id != null) {
    putUserStatus({ secUserId: e.id, status: e.status })
  }
}

const handleSubmit = () => {
  ruleFormRef.value.validate(async valid => {
    if (valid) {
      if (modifyType.value == 'add') {
        await postUserAdd({
          ...formData.value,
          password: encryptByMd5(formData.value.password || '')
        })
      } else {
        await putUser(formData.value)
      }
      dialogVisible.value = false
      refresh()
    }
  })
}

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  nickname: [
    {
      required: true,
      message: '请输入昵称',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  roleIds: [
    {
      required: true,
      message: '请选择角色',
      trigger: 'blur'
    }
  ]
})

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
