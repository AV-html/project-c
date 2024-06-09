import type { PathRouteProps } from 'react-router-dom'

import type { TPermissionsKeys } from 'core/user/user-types'

import { type AppRoutes } from './app-router-configs'

export interface RouteConfig extends PathRouteProps {
  name: AppRoutes
  authOnly?: boolean
  permissions?: TPermissionsKeys[]
}
