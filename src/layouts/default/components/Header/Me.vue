<template>
  <el-dropdown class="h-dropdown" trigger="click" @command="handleCommand">
    <div class="me">
      <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar" />
      <div class="name">{{ nickName }}</div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <div class="dropdown-item">
            <GithubOutlined />
            <span class="s"> {{ $t('layout.header.gitHub') }}</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="lock">
          <div class="dropdown-item">
            <LockOutlined />
            <span class="s"> {{ $t('layout.header.lockScreen') }}</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item command="loginOut">
          <div class="dropdown-item">
            <PoweroffOutlined />
            <span class="s"> {{ $t('layout.header.exitSystem') }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dialog
    :title="$t('layout.header.lockScreen')"
    v-model="visible"
    width="30%"
  >
    <div class="lock-dialog">
      <img class="avatar" src="@/assets/images/avatar.jpg" alt="avatar" />
      <!-- <div class="name">{{firstLetterToUpperCase(userName)}} {{firstLetterToUpperCase(roles.toString())}}</div> -->

      <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        class="lock-form"
        label-position="top"
      >
        <el-form-item
          :label="$t('layout.header.lockPassword')"
          prop="lockPassWord"
        >
          <el-input
            @keyup.enter="handleLock"
            v-model="formData.lockPassWord"
            :placeholder="$t('layout.header.lockPasswordPlaceholder')"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLock">{{
            $t('layout.header.lock')
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { router } from '@/router'
import {
  GithubOutlined,
  LockOutlined,
  PoweroffOutlined
} from '@ant-design/icons-vue'

import { userHooks } from '@/hooks/user/index'
import { t } from '@/hooks/web/useI18n'
import { FormInstance } from 'types/elemntPlus'
import { useLockStore } from '@/store/modules/lock'
import { encryptByMd5 } from '@/utils/crypto'
type FormData = {
  lockPassWord: string
}
const { nickName, loginOut } = userHooks()

const { setLockInfo } = useLockStore()
const formRef = ref<FormInstance>()
const visible = ref(false)
const formData = reactive<FormData>({
  lockPassWord: ''
})

const rules = markRaw({
  lockPassWord: [
    {
      required: true,
      message: t('layout.header.lockPasswordPlaceholder'),
      trigger: 'blur'
    }
  ]
})

const handleCommand = (command: string) => {
  if (command == 'lock') {
    formData.lockPassWord = ''
    visible.value = true
  } else if (command == 'loginOut') {
    loginOut().then(res => {
      router.push('/login')
    })
  }
}

const handleLock = () => {
  formRef.value?.validate(valid => {
    if (valid) {
      setLockInfo({
        pwd: encryptByMd5(formData.lockPassWord),
        isLock: true
      })
      visible.value = false
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.me {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .name {
    margin-left: 10px;
    font-size: 14px;
  }
}
.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .s {
    margin-left: 15px;
  }
}
.lock-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  .avatar {
    width: 100px;
    border-radius: 50%;
  }
  .name {
    margin-top: 10px;
  }
  .lock-form {
    margin-top: 20px;
    width: 100%;
    padding: 0 20px;
  }
}
</style>
