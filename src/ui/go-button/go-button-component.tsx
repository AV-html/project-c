import { type FC } from 'react'

import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { cn } from 'core/utils/class-names'

import type { IGoButtonProps } from './go-button-types'
import { Icon } from '../icon'

import styles from './go-button.module.scss'

export const GoButtonComponent: FC<IGoButtonProps> = ({
  path,
  className
}) => {
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
      className={cn(styles.button, [className])}
      icon={<Icon name={'arrowLongRight'}/>}
      onClick={handleClick}
    />
  )
}
