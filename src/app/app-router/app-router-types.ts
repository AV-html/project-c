import type { PathRouteProps } from 'react-router-dom'

import type { TSystemPermissionsKeys } from 'core/user/user-types'

export enum AppRoutes {
  MAIN = 'main',
  LOGIN = 'login',

  DASHBOARD = 'dashboard',

  SETTINGS_TENANTS = 'settings-tenants',
  SETTINGS_TENANTS_CREATE = 'settings-tenants-create',
  SETTINGS_TENANTS_EDIT = 'settings-tenants-edit',

  NOT_FOUND = 'not-found', // 404
  FORBIDDEN = 'forbidden' // 403
}

export interface RouteConfig extends PathRouteProps {
  name: AppRoutes
  authOnly?: boolean
  permissions?: TSystemPermissionsKeys[]
}
