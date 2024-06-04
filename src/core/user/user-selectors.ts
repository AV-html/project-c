import { createSelector } from '@reduxjs/toolkit'

import { type TRootState } from 'app/store/store-types'

export const getUserInfoSelector = (state: TRootState) => {
  return state.user.userInfo
}

export const getUserTenantsSelector = createSelector(
  getUserInfoSelector,
  (userInfo) => userInfo?.tenants
)

export const getUserArrayPermissionsSelector = createSelector(
  getUserInfoSelector,
  (userInfo) => {
    const permissions = userInfo?.system_permissions ?? {}

    return Object.entries(permissions)
      .filter(([_, value]) => value)
      .map(([permission]) => permission)
  }
)
