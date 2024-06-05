import { type FC, useEffect, useState } from 'react'

import { Layout } from 'antd'

import { useAppDispatch } from 'core/hooks/rtk'
import { userApi } from 'core/user/user-api'
import { userActions } from 'core/user/user-slice'

import { AppRouter } from './app-router'

import './styles/index.scss'

export const App: FC = () => {
  const [firstLoading, setFirstLoading] = useState(true)
  const { data } = userApi.useAuthMeQuery()

  const dispatch = useAppDispatch()

  console.log(data)

  useEffect(() => {
    if (data !== undefined) {
      dispatch(userActions.setUserInfo(data))
      setFirstLoading(false)
    }
  }, [data])

  return (
    <div className={'app'}>
      <Layout style={{
        minHeight: '100vh',
        background: '#fff'
      }}>
        {!firstLoading && <AppRouter/>}
      </Layout>
    </div>
  )
}
