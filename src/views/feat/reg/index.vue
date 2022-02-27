<template>
  <div>
    <el-card header="正则表达式">
      <el-form label-width="120px">
        <el-form-item label="判断类型：">
          <el-select
            v-model="form.reg"
            placeholder="请选择"
            style="width: 220px"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正则函数：">
          <div v-if="form.reg !== ''">{{ options[form.reg]?.value }}</div>
        </el-form-item>
        <el-form-item label="判断的值：">
          <el-input v-model="form.value" style="width: 220px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCheck">校验</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import {
  phoneReg,
  idCardReg,
  emailReg,
  urlReg,
  wxReg,
  carNoReg,
  passwordReg
} from '@/utils/utils'

const options = [
  {
    value: phoneReg,
    label: '手机号码校验'
  },
  {
    value: idCardReg,
    label: '身份证校验'
  },
  {
    value: emailReg,
    label: '邮箱校验'
  },
  {
    value: urlReg,
    label: 'URL的校验'
  },
  {
    value: wxReg,
    label: '微信号校验'
  },
  {
    value: carNoReg,
    label: '车牌号校验'
  },
  {
    value: passwordReg,
    label: '密码强度校验'
  }
]

const form = reactive({
  reg: '',
  value: null
})
const handleCheck = () => {
  if (form.reg == '') {
    return ElMessage.error('请先选择判断类型')
  }
  if (form.value == null) {
    return ElMessage.error('请先输入要判断的值')
  }
  if (options[form.reg].value.test(form.value)) {
    ElMessage.success('验证成功！')
  } else {
    ElMessage.warning('验证失败！')
  }
}
</script>
