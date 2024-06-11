import { type FC } from 'react'

import {
  Avatar, Dropdown, Flex, type MenuProps
} from 'antd'
import { useNavigate } from 'react-router-dom'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'
import { Logo } from 'ui/logo'
import { NavLink } from 'ui/nav-link'

import { useAppSelector } from 'core/hooks/rtk'
import { userApi } from 'core/user/user-api'
import { getUserInfo } from 'core/user/user-selectors'

import { type INavbarProps } from './navbar-types'
import {
  goToAiHrRoute, goToAuthRoute, goToCommunityRoute,
  goToEventsRoute,
  goToNewsRoute, goToProfileRoute, goToTalentsRoute, goToVacanciesRoute
} from '../app-router/app-router-configs'

import styles from './navbar.module.css'

export const NavbarComponent: FC<INavbarProps> = () => {
  const userInfo = useAppSelector(getUserInfo)

  const navigation = useNavigate()

  const [logout] = userApi.useLazyLogoutQuery()

  const handleGoToProfile = () => {
    navigation(goToProfileRoute('me'))
  }

  const handleLogout = () => {
    void logout()
    navigation(goToNewsRoute())
  }

  const items: MenuProps['items'] = [
    {
      label: 'Профиль',
      key: '0',
      icon: <Icon name={'profile'} size={16}/>,
      onClick: handleGoToProfile
    },
    { type: 'divider' },
    {
      label: 'Выход',
      key: '3',
      icon: <Icon name={'logOut'} size={16}/>,
      onClick: handleLogout
    }
  ]

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
            Комьюнити
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
            : <Dropdown
              menu={{ items }}
              trigger={['click']}
              placement={'bottomRight'}
            >
              <Avatar
                size={40}
                src={userInfo.avatar}
                className={styles.extra}
                icon={<Icon name={'profile'} size={16} color={'#000'}/>}
              />
            </Dropdown>
        }
      </Container>
    </div>
  )
}
