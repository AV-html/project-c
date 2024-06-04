import type { IUser } from 'core/user/user-types'

export interface ILoginResponse {
  user: IUser
  token: string
}
