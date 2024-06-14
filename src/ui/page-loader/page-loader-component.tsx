import { type FC } from 'react'

import { type IPageLoaderProps } from './page-loader-types'
import { Icon } from '../icon'

import styles from './page-loader.module.scss'

export const PageLoaderComponent: FC<IPageLoaderProps> = ({ fontSize = 60 }) => {
  return <div className={styles.spin}>
    <Icon name={'simpleLoader'} size={fontSize} color={'#FF8A9C'}/>
  </div>
}
