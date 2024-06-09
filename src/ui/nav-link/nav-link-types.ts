import { type ReactNode } from 'react'

import { type ButtonType } from 'antd/es/button/buttonHelpers'
import { type LinkProps } from 'react-router-dom'

export interface INavLinkProps extends LinkProps {
  title?: string
  to: string
  icon?: ReactNode
  type?: ButtonType
}
