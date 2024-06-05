import { AuthPage } from 'pages/auth-page'
import { MainPage } from 'pages/main-page'
import { NotFoundPage } from 'pages/not-found-page'

import { AppRoutes, type RouteConfig } from './app-router-types'

export const goToMainRoute = () => '/'
export const goToAuthRoute = () => '/auth'
export const goToForbiddenRoute = () => '/forbidden'

// export const getRouteProfile = (id: string) => `/profile/:${id}`
// export const getRouteArticleEdit = (id: string) => `/articles/:${id}/edit`
// export const goToSettingsEditTenantRoute = (id: string) => `settings/tenants/edit/${id}`

export const RoutePath: Record<AppRoutes, string> = {
  main: goToMainRoute(),
  [AppRoutes.AUTH]: goToAuthRoute(),

  [AppRoutes.FORBIDDEN]: goToForbiddenRoute(),
  [AppRoutes.NOT_FOUND]: '*'
}

export const routes: RouteConfig[] = [
  {
    name: AppRoutes.AUTH,
    path: RoutePath.auth,
    element: <AuthPage/>
  },
  {
    name: AppRoutes.MAIN,
    path: RoutePath.main,
    element: <MainPage/>,
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
