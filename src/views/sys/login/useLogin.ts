import { useI18n } from '@/hooks/web/useI18n'
import type { InternalRuleItem } from 'async-validator'
import type { FormItemRule } from 'element-plus/es/components/form/src/form.type'
import { ref, computed, unref, Ref } from 'vue'

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE
}

const loginState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    loginState.value = state
  }

  const getLoginState = computed(() => loginState.value)

  function handleBack() {
    setLoginState(LoginStateEnum.LOGIN)
  }

  return { setLoginState, getLoginState, handleBack }
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n()

  const getAccountFormRule = computed(() =>
    createRule(t('sys.login.placeholderAccount'))
  )
  const getPasswordFormRule = computed(() =>
    createRule(t('sys.login.placeholderPassword'))
  )
  const getCodeFormRule = computed(() =>
    createRule(t('sys.login.placeholderCode'))
  )
  const getMobileFormRule = computed(() =>
    createRule(t('sys.login.placeholderMobile'))
  )

  const validateConfirmPassword = (password: string) => {
    return (rule: InternalRuleItem, value: string, callback) => {
      if (!value) {
        callback(t('sys.login.placeholderAgainPassword'))
      }
      if (value !== password) {
        callback(t('sys.login.diffPwd'))
      }
      callback()
    }
  }

  const getFormRules = computed(
    (): { [k: string]: FormItemRule | FormItemRule[] } => {
      const codeFormRule = unref(getCodeFormRule)
      const mobileFormRule = unref(getMobileFormRule)
      const accountFormRule = unref(getAccountFormRule)
      const passwordFormRule = unref(getPasswordFormRule)

      switch (unref(loginState)) {
        case LoginStateEnum.LOGIN:
          return {
            account: accountFormRule,
            password: passwordFormRule
          }
        case LoginStateEnum.MOBILE:
          return {
            code: codeFormRule,
            mobile: mobileFormRule
          }
        case LoginStateEnum.RESET_PASSWORD:
          return {
            account: accountFormRule,
            mobile: mobileFormRule,
            code: codeFormRule
          }
        case LoginStateEnum.REGISTER:
          return {
            account: accountFormRule,
            mobile: mobileFormRule,
            code: codeFormRule,
            confirmPassword: [
              {
                validator: validateConfirmPassword(formData?.password),
                trigger: 'change'
              }
            ],
            password: passwordFormRule
          }
      }

      return {}
    }
  )

  return { getFormRules }
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change'
    }
  ]
}
