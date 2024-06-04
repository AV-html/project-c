import { AuthPage } from 'pages/auth-page'
import { MainPage } from 'pages/main-page'
import { NotFoundPage } from 'pages/not-found-page'

import { AppRoutes, type RouteConfig } from './app-router-types'

export const goToMainRoute = () => '/'
export const goToDashboardRoute = () => '/dashboard'
export const goToLoginRoute = () => '/login'
export const goToForbiddenRoute = () => '/forbidden'

export const goToSettingsTenantsRoute = () => 'settings/tenants'
export const goToSettingsCreateTenantRoute = () => 'settings/tenants/create'
export const goToSettingsEditTenantRoute = (id: string) => `settings/tenants/edit/${id}`

// export const getRouteProfile = (id: string) => `/profile/:${id}`
// export const getRouteArticleEdit = (id: string) => `/articles/:${id}/edit`

export const RoutePath: Record<AppRoutes, string> = {
  main: goToMainRoute(),
  [AppRoutes.LOGIN]: goToLoginRoute(),

  [AppRoutes.DASHBOARD]: goToDashboardRoute(),

  [AppRoutes.SETTINGS_TENANTS]: goToSettingsTenantsRoute(),
  [AppRoutes.SETTINGS_TENANTS_CREATE]: goToSettingsCreateTenantRoute(),
  [AppRoutes.SETTINGS_TENANTS_EDIT]: goToSettingsEditTenantRoute(':tenantId'),

  [AppRoutes.FORBIDDEN]: goToForbiddenRoute(),
  [AppRoutes.NOT_FOUND]: '*'
}

export const routes: RouteConfig[] = [
  {
    name: AppRoutes.LOGIN,
    path: RoutePath.login,
    element: <AuthPage/>
  },
  {
    name: AppRoutes.MAIN,
    path: RoutePath.main,
    element: <MainPage/>
  },
  {
    name: AppRoutes.DASHBOARD,
    path: RoutePath.dashboard,
    element: <div>dashboard</div>,
    permissions: ['dashboard_view_edit'],
    authOnly: true
  },
  {
    name: AppRoutes.NOT_FOUND,
    path: RoutePath['not-found'],
    element: <NotFoundPage/>
  },
  {
    name: AppRoutes.FORBIDDEN, // TODO: Сделать 403 page
    path: RoutePath.forbidden,
    element: <div>Доступ запрещён</div>
  }
]
