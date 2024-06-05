import type { PathRouteProps } from 'react-router-dom'

import type { TPermissionsKeys } from 'core/user/user-types'

export enum AppRoutes {
  MAIN = 'main',
  AUTH = 'auth',

  NOT_FOUND = 'not-found', // 404
  FORBIDDEN = 'forbidden' // 403
}

export interface RouteConfig extends PathRouteProps {
  name: AppRoutes
  authOnly?: boolean
  permissions?: TPermissionsKeys[]
}
