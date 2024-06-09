import { type TRoleType } from 'core/user/user-types'

export interface IRegForm {
  email: string
  role: TRoleType
  password: string
  confirmPassword: string
}
