import { type FC, useState } from 'react'

import {
  Card, Flex, Segmented, Typography
} from 'antd'
import { Navigate, useLocation } from 'react-router-dom'

import { goToMainRoute } from 'app/app-router/app-router-configs'

import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'

import { segmentOptions } from './auth-configs'
import { Login } from './components/login'
import { Registration } from './components/registration'

import styles from './auth.module.scss'

export const AuthComponent: FC = () => {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState('login')
  const handleAuthMode = (value: string): void => {
    setCurrentPage(value)
  }

  const userInfo = useAppSelector(getUserInfo)

  if (userInfo) {
    const path: string = location.state?.from?.pathname
    return <Navigate to={path ? `${path}` : `${goToMainRoute()}`}/>
  }

  return (
    <div className={styles.overlay}>
      <Card className={styles.card}>
        <Flex vertical gap={24}>
          <Segmented
            block
            size={'large'}
            className={styles.segmented}
            options={segmentOptions}
            onChange={handleAuthMode}
            value={currentPage}
          />
          <Flex gap={16}>
            <Flex
              vertical
              gap={16}
              flex={'1 1 auto'}
            >
              <Typography.Title level={2}>
                CommIT.AI
              </Typography.Title>
              {currentPage === 'login' && <Login/>}
              {currentPage === 'reg' && <Registration/>}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </div>
  )
}
