import { defineStore } from 'pinia'

import { useLockInfoStorage } from '@/utils/storage/index'
import type { LockInfo } from 'types/store'

const { getLockInfo, setLockInfo, clearLockInfo } = useLockInfoStorage()
interface LockState {
  lockInfo: Nullable<LockInfo>
}

export const useLockStore = defineStore({
  id: 'lock',
  state: (): LockState => ({
    lockInfo: getLockInfo as LockInfo
  }),
  getters: {
    getLockInfo(): Nullable<LockInfo> {
      return this.lockInfo
    }
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info)
      setLockInfo(this.lockInfo)
    },
    resetLockInfo() {
      clearLockInfo()
      this.lockInfo = null
    },
    unLock(password?: string) {
      //const userStore = useUserStore();

      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo()
        return true
      } else {
        return false
      }

      //const username = userStore.getUserName;
    }
  }
})
