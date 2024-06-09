import { type FC } from 'react'

import { Flex, Typography } from 'antd'

import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'
import { cn } from 'core/utils/class-names'

import { type IMessageProps } from './message-types'

import styles from './message.module.css'

export const MessageComponent: FC<IMessageProps> = ({
  author,
  video,
  message,
  createdDate,
  questionIndex
}) => {
  const isUser = author === 'user'
  const userInfo = useAppSelector(getUserInfo)

  const name = isUser
    ? `${userInfo?.firstName ?? ''} ${userInfo?.secondName ?? ''}`
    : 'Агата, AI HR'

  const avatar = isUser
    ? userInfo?.avatar
    : null

  const isQuestionNumber = questionIndex !== null && questionIndex !== undefined

  return (
    <Flex
      gap={8}
      align={'start'}
    >
      <div className={styles.avatar}>
        {
          avatar && <img
            src={avatar}
            alt="avatar"
          />
        }
      </div>
      <Flex
        className={cn(styles.message, { [styles.user]: isUser })}
        vertical gap={8}
      >
        <Flex align={'center'}>
          <Typography.Text strong className={styles.name}>
            {name}
          </Typography.Text>
          {
            createdDate && <div className={styles.date}>
              {createdDate}
            </div>
          }
        </Flex>
        {
          message && <div className={styles.body}>
            {
              isQuestionNumber && <div className={styles.question}>
                                Вопрос {questionIndex + 1}
              </div>
            }
            {message}
          </div>
        }
        {
          video && <div className={styles.video}>
            {video}
          </div>
        }
      </Flex>
    </Flex>
  )
}
