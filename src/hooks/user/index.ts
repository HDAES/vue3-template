import { computed, ComputedRef } from 'vue'
import { useUserStore } from '@/store/modules/user'

export function userHooks() {
  const userStore = useUserStore()

  const nickName: ComputedRef<string> = computed(
    (): string => userStore.getNickName
  )

  const roles: ComputedRef<string[]> = computed(
    (): string[] => userStore.getroles
  )
  return {
    roles,
    nickName
  }
}
