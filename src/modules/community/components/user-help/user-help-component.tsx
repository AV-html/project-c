import React, { type FC } from 'react'

import { Flex } from 'antd'

import avatarOne from 'core/assets/images/avatar1.png'

import styles from './user-help.module.css'

export interface IUserHelpProps {
  hex?: string
}

export const UserHelpComponent: FC<IUserHelpProps> = ({ hex }) => {
  return (
    <div
      className={styles.userHelp}
      style={{ backgroundColor: hex }}>
      <div className={styles.test}>“</div>
      <div>
        <p>👍️   Буду полезна</p>
        <br/>
        <p style={{ marginBottom: '20px' }}>
                    Я считаю себя достаточно творческим человеком, однако моя специализация в нашей компании, связана отнюдь не с творчеством. Тем не менее пробовать себя в веб-дизайне уж больно затягивающее занятие. Казалось бы ну пробуешь, пробуй! И попробовал!
        </p>
        <Flex justify={'space-between'}>
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
          <button className={styles.subscribe}>Подписаться</button>
        </Flex>
      </div>
    </div>
  )
}
