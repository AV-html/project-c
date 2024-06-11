import { type FC } from 'react'

import { Avatar, Flex } from 'antd'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'
import { Logo } from 'ui/logo'
import { NavLink } from 'ui/nav-link'

import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'

import { type INavbarProps } from './navbar-types'
import {
  goToAiHrRoute, goToAuthRoute, goToCommunityRoute,
  goToEventsRoute,
  goToNewsRoute, goToTalentsRoute, goToVacanciesRoute
} from '../app-router/app-router-configs'

import styles from './navbar.module.css'

export const NavbarComponent: FC<INavbarProps> = () => {
  const userInfo = useAppSelector(getUserInfo)
  return (
    <div className={styles.navbar}>
      <Container className={styles.content}>
        <Logo/>
        <Flex gap={16}>
          <NavLink to={goToNewsRoute()}>
            Лента
          </NavLink>
          <NavLink to={goToVacanciesRoute()}>
            Вакансии
          </NavLink>
          <NavLink to={goToTalentsRoute()}>
            Таланты
          </NavLink>
          <NavLink to={goToAiHrRoute()} className={styles.extra}>
            AI HR
          </NavLink>
          <NavLink to={goToEventsRoute()}>
            События
          </NavLink>
          <NavLink to={goToCommunityRoute()}>
            Кофе
          </NavLink>
        </Flex>
        {
          !userInfo
            ? <NavLink
              to={goToAuthRoute()}
              icon={<Icon name={'logIn'} size={16}/>}
              type={'primary'}
            >
              Войти
            </NavLink>
            : <Avatar
              size={40}
              src={userInfo.avatar}
              icon={<Icon name={'profile'} size={16} color={'#000'}/>}
            />
        }
      </Container>
    </div>
  )
}
