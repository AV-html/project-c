import type { ReactElement } from 'react'

import type { TSystemPermissionsKeys } from 'core/user/user-types'

export interface IRequireAuthComponentProps {
  children: ReactElement
  routePermissions?: TSystemPermissionsKeys[]
}
