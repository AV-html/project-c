import { type FC } from 'react'

import { Button } from 'antd'
import { Link, useMatch } from 'react-router-dom'

import { cn } from 'core/utils/class-names'

import { type INavLinkProps } from './nav-link-types'

import styles from './nav-link.module.scss'

export const NavLinkComponent: FC<INavLinkProps> = ({
  icon,
  to,
  type = 'default',
  children,
  className,
  activeClassName = '',
  ...restProps
}) => {
  const match = useMatch(to)

  const tabLinkClass = cn(
    styles.link,
    [className],
    {
      [styles.active]: !!match,
      [activeClassName]: !!match && activeClassName
    }
  )

  const isActive = !!match

  return (
    <Link
      {...restProps}
      to={to}
      className={cn({ [styles.active]: !!match })}
    >
      <Button
        className={tabLinkClass}
        type={isActive ? 'primary' : type }
        size={'large'}
        shape={'round'}
        icon={icon}
        iconPosition={'end'}
      >
        {children}
      </Button>
    </Link>
  )
}
