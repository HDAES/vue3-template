export interface UserState {
  token: string
  realName: string
  roles: rolesState[]
}

export interface rolesState {
  roleName: string
  value: string
}
