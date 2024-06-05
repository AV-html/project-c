import { type TRootState } from 'app/store/store-types'

export const getUserInfo = (state: TRootState) => {
  return state.user.userInfo
}

export const getUserPermissions = (state: TRootState) => {
  return state.user.userInfo?.permissions
}
