<template>
  <el-dialog
    v-model="dialogConfig.visible"
    :title="dialogConfig.type == 'edit' ? '编辑' : '新增'"
    width="600px"
    @close="close"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单类型：">
            <el-radio-group v-model="formData.type">
              <el-radio-button :label="0">目录</el-radio-button>
              <el-radio-button :label="1">菜单</el-radio-button>
              <el-radio-button :label="2">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="formData.type == 2 ? '按钮名称：' : '名称：'"
            prop="name"
          >
            <el-input
              v-model="formData.name"
              :placeholder="
                formData.type == 2 ? '请输入按钮名称' : '请输入名称'
              "
            />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item
            label="菜单图标："
            v-if="formData.type != 2"
            prop="icon"
          >
            <SelectIcon v-model:icon="formData.icon" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限标识：">
            <el-input
              v-model="formData.permission"
              placeholder="请输入权限标识"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序：">
            <el-input-number
              v-model="formData.sort"
              controls-position="right"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.type == 2">
          <el-form-item label="请求方式：" prop="method">
            <el-select v-model="formData.method" placeholder="请选择">
              <el-option label="GET" value="GET"></el-option>
              <el-option label="POST" value="POST"></el-option>
              <el-option label="PUT" value="PUT"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            :label="formData.type == 2 ? '请求地址：' : '路由地址：'"
            prop="path"
          >
            <el-input
              v-model="formData.path"
              :placeholder="
                formData.type == 2 ? '接口请求地址' : '请输入路由地址'
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="formData.type == 1">
          <el-form-item label="组件地址：">
            <el-input
              v-model="formData.component"
              placeholder="请输入组件地址"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="上级目录："
            prop="parentId"
            v-if="formData.type != 0"
          >
            <SelectTree v-model:parentId="formData.parentId" :options="data" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogConfig.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleDetermine(formRef)"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useTable } from '@/components/Table'
import type { FormInstance } from 'types/elemntPlus'
import { postPermissionAdd, putPermission } from '@/api/auth'
const { dialogConfig, refresh, data } = useTable()

type FormData = {
  id?: string
  type: number
  name: string
  icon: string
  permission: string
  sort: number
  path: string
  parentId: string
  method: string
  component?: any
}

const formRef = ref<FormInstance>()

const formData = ref<FormData>({
  type: 0,
  name: '',
  icon: '',
  permission: '',
  sort: 0,
  path: '',
  parentId: '',
  method: ''
})

watch(
  () => dialogConfig.row,
  () => {
    const row = dialogConfig.row
    if (row) {
      console.log(row.icon)
      formData.value = {
        name: row.name,
        path: row.path,
        method: row.method,
        component: row.component,
        type: row.type,
        permission: row.permission,
        icon: row.icon,
        sort: row.sort,
        parentId: row.parentId,
        id: row.id
      }
    }
  }
)

const handleDetermine = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async valid => {
    if (valid) {
      if (dialogConfig.type == 'add') {
        if (formData.value.type == 0) {
          formData.value.parentId = '0'
          formData.value.component = 'Layout'
        }
        await postPermissionAdd(formData.value)
      } else {
        await putPermission(formData.value)
      }
      dialogConfig.visible = false
      refresh()
    } else {
      return false
    }
  })
}

const close = () => {
  formData.value = {
    type: 0,
    name: '',
    icon: '',
    permission: '',
    sort: 0,
    path: '',
    parentId: '',
    method: ''
  }
}

const rules = {
  name: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  method: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  path: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ],
  parentId: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur'
    }
  ]
}
</script>
