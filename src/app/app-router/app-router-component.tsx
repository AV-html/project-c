import {
  type FC,
  type ReactNode,
  Suspense,
  useCallback
} from 'react'

import { Route, Routes } from 'react-router-dom'

import { routes } from './app-router-configs'
import { type RouteConfig } from './app-router-types'
import { ProtectRoute } from './protect-route'

export const AppRouterComponent: FC = () => {
  const renderRoutes: (route: RouteConfig) => ReactNode = useCallback(({
    path,
    element,
    authOnly,
    permissions
  }) => {
    const wrapElement = <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>

    return (
      <Route
        key={path}
        path={path}
        element={
          authOnly
            ? <ProtectRoute routePermissions={permissions}>
              {wrapElement}
            </ProtectRoute>
            : wrapElement
        }
      />
    )
  }, [])

  return <Routes>{routes.map(renderRoutes)}</Routes>
}
