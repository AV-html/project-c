import { type FC, useMemo } from 'react'

import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo, getUserPermissions } from 'core/user/user-selectors'

import type { IRequireAuthComponentProps } from './protect-route-types'
import { goToAuthRoute, goToForbiddenRoute } from '../app-router-configs'

export const ProtectRouteComponent: FC<IRequireAuthComponentProps> = ({
  children,
  routePermissions
}) => {
  const location = useLocation()
  const userInfo = useAppSelector(getUserInfo)

  const userPermissions = useAppSelector(getUserPermissions)

  const hasRequiredRoles = useMemo(() => {
    if (!routePermissions) {
      return true
    }

    return routePermissions.every(
      (requiredPermissions) => userPermissions?.includes(requiredPermissions)
    )
  }, [routePermissions, userPermissions])

  if (!userInfo) {
    return (
      <Navigate
        to={goToAuthRoute()}
        state={{ from: location }}
        replace
      />
    )
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate
        to={goToForbiddenRoute()}
        state={{ from: location }}
        replace
      />
    )
  }

  return children
}
