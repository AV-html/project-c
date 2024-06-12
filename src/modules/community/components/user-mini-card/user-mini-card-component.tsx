import React, { type FC } from 'react'

import { Flex } from 'antd'

import avatarOne from 'core/assets/images/avatar1.jpg'

import styles from './user-mini-card.module.css'

export interface IUserMiniCardProps {
  test?: string
}

export const UserMiniCardComponent: FC<IUserMiniCardProps> = () => {
  return (
    <div className={styles.userCard}>
      <div className={styles.wrapImg}>
        <img className={styles.avatarOne} src={avatarOne}/>
        <div className={styles.rating}>
                    4.6
        </div>
      </div>
      <Flex vertical>
        <div className={styles.userName}>
                    Дарья Васильева
        </div>
        <div className={styles.userPosition}>
                    HR-директор
        </div>
      </Flex>
    </div>
  )
}
