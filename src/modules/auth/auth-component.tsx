import { type FC } from 'react'

import { Typography } from 'ui/typography'

import { LoginForm } from './login-form'

import styles from './auth.module.css'

export const AuthComponent: FC = () => {
  // TODO: Сверстать
  return (
    <div className={styles.Login}>
      <LoginForm/>
      <div>
        <Typography>
          Сбор, обработка и хранение данных, из любых источников информации
        </Typography>
      </div>
    </div>
  )
}
