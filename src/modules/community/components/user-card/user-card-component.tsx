import React, { type FC } from 'react'

import { Flex } from 'antd'

import avatarOne from 'core/assets/images/avatar1.png'

import styles from './user-card.module.css'

export interface IUserCardProps {
  tset?: string
}

export const UserCardComponent: FC<IUserCardProps> = (props) => {
  return (
    <div>
      <div className={styles.wrapUserCard}>
        <Flex >
          <div >
            <img className={styles.avatarOne} src={avatarOne}/>
          </div>
          <Flex vertical>
            <div className={styles.userName}>
                            Дарья Васильева
            </div>
            <div className={styles.userPosition}>
                            HR-директор
            </div>
          </Flex>
        </Flex>
        <div className={styles.wrapUserInfo}>
          <p>👍️   Буду полезна</p>
          <br/>
          <p>Прошла более 100 собеседований, пишу что думаю, делюсь опытом</p>
          <br/>
          <p>✨️   Суперсила</p>
          <br/>
          <p>Нахожу красоту в простых вещах</p>
          <Flex className={styles.tagWrap}>
            <div className={styles.tag} style={{ backgroundColor: '#FF5574' }}>Дизайн</div>
            <div className={styles.tag} style={{ backgroundColor: '#FB814D' }}>Бэк</div>
            <div className={styles.tag} style={{ backgroundColor: '#71CB3E' }}>Аналитика</div>
          </Flex>
        </div>
      </div>
    </div>
  )
}
