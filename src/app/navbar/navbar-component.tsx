import { type FC } from 'react'

import { NavLink } from 'ui/nav-link'

import { type INavbarProps } from './navbar-types'
import {
  goToAgataInterviewListRoute,
  goToAiHrRoute, goToCommunityRoute,
  goToEventsRoute,
  goToNewsRoute, goToTalentsRoute, goToVacanciesRoute
} from '../app-router/app-router-configs'

import styles from './navbar.module.css'

export const NavbarComponent: FC<INavbarProps> = () => {
  return (
    <div className={styles.navbar}>
      <NavLink to={goToNewsRoute()}>
        Лента
      </NavLink>
      <NavLink to={goToVacanciesRoute()}>
        Вакансии
      </NavLink>
      <NavLink to={goToTalentsRoute()}>
        Таланты
      </NavLink>
      <NavLink to={goToAiHrRoute()}>
        AI HR
      </NavLink>
      <NavLink to={goToAgataInterviewListRoute()}> {/* FIXME: Временное решение */}
        Агата ИИ (временное)
      </NavLink>
      <NavLink to={goToEventsRoute()}>
        События
      </NavLink>
      <NavLink to={goToCommunityRoute()}>
        Кофе
      </NavLink>
    </div>
  )
}
