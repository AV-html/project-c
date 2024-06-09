import { type FC } from 'react'

import { NavLink } from 'ui/nav-link'

import { type INavbarProps } from './navbar-types'
import { goToAgataInterviewListRoute, goToAiHrRoute, goToNewsRoute } from '../app-router/app-router-configs'

import styles from './navbar.module.css'

export const NavbarComponent: FC<INavbarProps> = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to={goToNewsRoute()}>
        Новости
      </NavLink>
      <NavLink to={goToAiHrRoute()}>
        Агата ИИ
      </NavLink>
      <NavLink to={goToAgataInterviewListRoute()}> {/* FIXME: Временное решение */}
        Агата ИИ (временное)
      </NavLink>
    </div>
  )
}
