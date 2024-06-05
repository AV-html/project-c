import { type TRoleType } from 'core/user/user-types'

export interface IRegFormValues {
  email: string
  fml: string
  role: TRoleType
  password: string
  confirmPassword: string
}

export interface IRegData {
  fml: string
  email: string
  password: string
  role: TRoleType
}
