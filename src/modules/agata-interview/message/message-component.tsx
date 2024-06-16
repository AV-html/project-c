import { type FC } from 'react'

import { Avatar, Flex, Typography } from 'antd'

import { LazyVideo } from 'components/lazy-video'

import { Icon } from 'ui/icon'

import agataAvatar from 'core/assets/images/agata-avatar.png'
import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'
import { cn } from 'core/utils/class-names'

import { type IMessageProps } from './message-types'
import { getFormattedDate } from './message-utils'

import styles from './message.module.css'

export const MessageComponent: FC<IMessageProps> = ({
  author,
  video,
  preview,
  message,
  createdDate,
  questionIndex,
  totalQuestions
}) => {
  const isUser = author === 'user'
  const userInfo = useAppSelector(getUserInfo)

  const name = isUser
    ? `${userInfo?.firstName ?? 'Имя'} ${userInfo?.secondName ?? 'Фамилия'}`
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
        <Avatar
          size={40}
          src={avatar}
          icon={<Icon name={'profile'} size={16} color={'#000'}/>}
        />
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
          video && <LazyVideo url={video} preview={preview}/>
        }
      </Flex>
    </Flex>
  )
}
