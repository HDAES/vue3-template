<template>
  <el-dialog
    v-model="dialogConfig.visible"
    :title="dialogConfig.type == 'edit' ? '编辑' : '新增'"
    width="600px"
  >
    <el-form
      label-width="80px"
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
    >
      <el-row>
        <el-col v-if="dialogConfig.type == 'edit'" :span="12">
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
            <el-input v-model="formData.username" placeholder="请输入用户名" />
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
        <el-col :span="12" v-if="dialogConfig.type == 'add'">
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
        <el-button @click="dialogConfig.visible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useTable } from '@/components/Table/src/hooks/useTable'
import { reactive, ref, watch } from 'vue'
import { encryptByMd5 } from '@/utils/crypto'

import { getAllRoleList, postUserAdd, putUser } from '@/api/auth/index'

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

const { dialogConfig, refresh } = useTable()

const formData = ref<FormData>({
  username: '',
  nickname: '',
  password: '',
  roleIds: []
})

const roleOptions = ref<Role[]>([])
const ruleFormRef = ref()

const handleGetRoles = async () => {
  if (roleOptions.value.length == 0) {
    roleOptions.value = await getAllRoleList()
  }
}

watch(
  () => dialogConfig.visible,
  (oldVal, newVal) => {
    if (!newVal) handleGetRoles()
  }
)

watch(
  () => dialogConfig.row,
  () => {
    if (dialogConfig.type == 'edit') {
      let roleIds: string[] = []
      dialogConfig.row.roles.forEach(item => roleIds.push(item.id))
      formData.value = {
        id: dialogConfig.row.id,
        username: dialogConfig.row.username,
        nickname: dialogConfig.row.nickname,
        roleIds
      }
    }
  }
)

const handleSubmit = () => {
  ruleFormRef.value.validate(async valid => {
    if (valid) {
      if (dialogConfig.type == 'add') {
        await postUserAdd({
          ...formData.value,
          password: encryptByMd5(formData.value.password || '')
        })
      } else {
        await putUser(formData.value)
      }
      dialogConfig.visible = false
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
</script>
