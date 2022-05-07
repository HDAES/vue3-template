<template>
  <el-dialog
    v-model="dialogConfig.visible"
    :title="dialogConfig.type == 'edit' ? '编辑' : '新增'"
    width="600px"
  >
    <el-form :model="ruleForm" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item v-if="dialogConfig.type == 'edit'" label="ID：">
        <el-input disabled v-model="ruleForm.id" placeholder="角色Id" />
      </el-form-item>
      <el-form-item label="角色名：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input v-model="ruleForm.description" placeholder="请输入描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogConfig.visible = false">取 消</el-button>
        <el-button type="primary" @click="handleDetermine">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { postAddRole, putRole } from '@/api/auth'
import { useTable } from '@/components/Table'
import type { FormInstance } from 'types/elemntPlus'
import { reactive, ref, watch } from 'vue'
const { dialogConfig, refresh } = useTable()

type RuleForm = {
  id?: string
  name: string
  description: string
}

const formRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  description: ''
})

watch(
  () => dialogConfig.row,
  () => {
    if (dialogConfig.type == 'edit') {
      ruleForm.id = dialogConfig.row.id
      ruleForm.name = dialogConfig.row.name
      ruleForm.description = dialogConfig.row.description
    }
  }
)

const handleDetermine = () => {
  formRef.value?.validate(async valid => {
    if (valid) {
      if (dialogConfig.type == 'add') {
        await postAddRole(ruleForm)
      } else {
        await putRole({ ...ruleForm, id: dialogConfig.row.id })
      }
      refresh()
      dialogConfig.visible = false
    }
  })
}

const rules = {
  name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
}
</script>
