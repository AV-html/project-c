export interface IUserState {
  userInfo: IUserInfo | null
}

export type TRoleType = 'hr' | 'candidate'

export interface IUserInfo {
  id: number
  email: string
  firstName: string
  secondName: string
  role: TRoleType
  avatar: string
  permissions: string[] // TODO: Сейчас этого поля нету
}

export type TPermissionsKeys = ''
