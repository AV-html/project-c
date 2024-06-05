import type { ReactElement } from 'react'

import type { TPermissionsKeys } from 'core/user/user-types'

export interface IRequireAuthComponentProps {
  children: ReactElement
  routePermissions?: TPermissionsKeys[]
}
