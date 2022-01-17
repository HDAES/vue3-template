import { defineStore } from 'pinia'

import { useLockInfoStorage } from '@/utils/storage/index'
import { LockInfo } from 'types/store'

const { getLockInfo, setLockInfo, clearLockInfo } = useLockInfoStorage()
interface LockState {
  lockInfo: Nullable<LockInfo>
}

export const useLockStore = defineStore({
  id: 'lock',
  state: (): LockState => ({
    lockInfo: getLockInfo as LockInfo
  }),
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
