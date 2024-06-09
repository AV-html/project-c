import { type FC } from 'react'

import { Button, Tooltip } from 'antd'
import { Link, useMatch } from 'react-router-dom'

import { cn } from 'core/utils/class-names'

import { type INavLinkProps } from './nav-link-types'

import styles from './nav-link.module.scss'

export const NavLinkComponent: FC<INavLinkProps> = ({
  icon,
  title,
  to,
  type = 'default',
  className,
  children,
  ...restProps
}) => {
  const match = useMatch(to)

  const tabLinkClass = cn(
    styles.link,
    [],
    { [styles.active]: !!match }
  )

  return (
    <Tooltip
      placement={'right'}
      title={title}
      className={className}
    >
      <Link
        to={to}
        {...restProps}
      >
        <Button
          className={tabLinkClass}
          type={type}
          size={'large'}
          icon={icon}
        >
          {children}
        </Button>
      </Link>
    </Tooltip>
  )
}
