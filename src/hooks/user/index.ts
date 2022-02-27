import { computed, ComputedRef } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useLockInfoStorage } from '@/utils/storage/index'
export function userHooks() {
  const userStore = useUserStore()
  const { clearLockInfo } = useLockInfoStorage()
  const nickName: ComputedRef<string> = computed(
    (): string => userStore.getNickName
  )

  const hasRoles: ComputedRef<string[]> = computed(
    (): string[] => userStore.getHasRole
  )
  const roles: ComputedRef<string[]> = computed(
    (): string[] => userStore.getroles
  )

  const loginOut = () => userStore.loginOut()

  const getInfo = () => userStore.info()
  return {
    roles,
    nickName,
    loginOut,
    getInfo,
    hasRoles,
    clearLockInfo
  }
}
