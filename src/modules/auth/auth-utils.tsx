import { type ReactNode } from 'react'

import { Icon } from 'ui/icon'

export const iconRender = (visible: boolean): ReactNode | undefined =>
  visible
    ? <Icon name="eye" size={16} />
    : <Icon name="eyeOff" size={16} />
