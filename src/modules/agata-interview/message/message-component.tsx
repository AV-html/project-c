import { type FC } from 'react'

import { Flex, Typography } from 'antd'

import agataAvatar from 'core/assets/images/agata-avatar.png'
import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'
import { cn } from 'core/utils/class-names'

import { type IMessageProps } from './message-types'
import { getFormattedDate } from './message-utils'
import { LazyVideoComponent } from '../lazy-video/lazy-video-component'

import styles from './message.module.css'

export const MessageComponent: FC<IMessageProps> = ({
  author,
  video,
  message,
  createdDate,
  questionIndex,
  totalQuestions
}) => {
  const isUser = author === 'user'
  const userInfo = useAppSelector(getUserInfo)

  const name = isUser
    ? `${userInfo?.firstName ?? ''} ${userInfo?.secondName ?? ''}`
    : 'Агата, AI HR'

  const avatar = isUser
    ? userInfo?.avatar
    : agataAvatar

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
              {getFormattedDate(createdDate)}
            </div>
          }
        </Flex>
        {
          message && <div className={styles.body}>
            {
              isQuestionNumber && (
                <div className={styles.question}>
                  Вопрос {questionIndex + 1} / {totalQuestions}
                </div>
              )
            }
            {message}
          </div>
        }
        {
          video && <LazyVideoComponent url={video}/>
        }
      </Flex>
    </Flex>
  )
}
