export interface UserState {
  token: string
  realName: string
  nickName: string
  roles: string[]
  hasRoles: string[]
}

export interface MetaState {
  title: string
  icon: string
}

export interface SidebarItem {
  path: string
  children: SidebarItem[]
  meta: MetaState
}

export interface LockInfo {
  // Password required
  pwd?: string | undefined
  // Is it locked?
  isLock?: boolean
}

export interface HasRole {
  authority: string
}
