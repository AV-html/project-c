import { type FC } from 'react'

import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToNewsRoute } from 'app/app-router/app-router-configs'

import NotFound from 'core/assets/images/page-not-found.svg'

import styles from './not-found-page.module.css'

export const NotFoundPageComponent: FC = () => {
  const navigation = useNavigate()

  const handleGoToMain = () => {
    navigation(goToNewsRoute())
  }
  return (
    <Flex align={'center'}
      vertical
      className={styles.page}
    >
      <Typography.Title level={2}>
        Упс! Страница не найдена
        <NotFound/>
        <Button
          size={'large'}
          shape={'round'}
          type={'primary'}
          onClick={handleGoToMain}
        >
          На главную
        </Button>
      </Typography.Title>
    </Flex>
  )
}
