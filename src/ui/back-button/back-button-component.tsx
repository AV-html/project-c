import { type FC } from 'react'

import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import type { IBackButtonProps } from './back-button-types'
import { Icon } from '../icon'

import styles from './back-button.module.css'

export const BackButtonComponent: FC<IBackButtonProps> = ({ path }) => {
  const navigation = useNavigate()

  const handleClick = () => {
    if (path) {
      navigation(path)
    } else {
      navigation(-1)
    }
  }

  return (
    <Button
      size={'large'}
      shape={'circle'}
      className={styles.button}
      icon={<Icon name={'arrowLongLeft'}/>}
      onClick={handleClick}
    />
  )
}
