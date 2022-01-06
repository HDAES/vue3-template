export interface UserState {
  token: string
  realName: string
  roles: string[]
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
