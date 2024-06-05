import type { TAvatar } from '../types/main'

export interface IUserState {
  userInfo: IUserInfo | null
}

export type TRoleType = 'hr' | 'candidate'

export interface IUserInfo {
  id: number
  fml: string
  email: string
  role: TRoleType
  avatar: TAvatar
  permissions: string[] // TODO: Сейчас этого поля нету
}

export type TPermissionsKeys = ''
