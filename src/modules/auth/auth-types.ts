import type { IUserInfo, TRoleType } from 'core/user/user-types'

export type TValue = string | number

export interface ITab {
  label: string
  value: TValue
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse extends IUserInfo {
  token: string
}

export interface IRegRequest {
  email: string
  password: string
  role: TRoleType
}
