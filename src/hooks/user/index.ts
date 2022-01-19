import { computed, ComputedRef } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useLockInfoStorage } from '@/utils/storage/index'
export function userHooks() {
  const userStore = useUserStore()
  const { clearLockInfo } = useLockInfoStorage()
  const nickName: ComputedRef<string> = computed(
    (): string => userStore.getNickName
  )

  const roles: ComputedRef<string[]> = computed(
    (): string[] => userStore.getroles
  )

  const loginOut = () => userStore.loginOut()

  return {
    roles,
    nickName,
    loginOut,
    clearLockInfo
  }
}
