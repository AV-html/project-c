import React, { type FC, useState } from 'react'

import {
  Button, Flex, notification, Typography
} from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToArticleByIdRoute } from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

import { useCopyToClipboard } from 'core/hooks/use-copy-to-clipboard'
import { cn } from 'core/utils/class-names'

import styles from './preview-article.module.css'

interface ArticleProps {
  id?: number
  imgUser?: string
  name?: string
  userPosition?: string
  tag?: string
  title?: string
  content?: string
  imgContent?: string
  showImg?: boolean
  like?: number
  view?: number
  colorTag?: string
}

export const PreviewArticleComponent: FC<ArticleProps> = ({
  id,
  imgUser,
  name,
  userPosition,
  title,
  content,
  imgContent,
  tag,
  showImg,
  like,
  view,
  colorTag
}) => {
  const navigate = useNavigate()
  const handleOpenArticle = () => {
    navigate(goToArticleByIdRoute(String(id)))
  }

  const [subscribe, setSubscribe] = useState(false)

  const handleSubscribe = () => {
    if (subscribe) {
      notification.warning({ message: `Вы отписались от ${name ?? ''} и больше не будете получать новостей` })
    } else {
      notification.success({ message: `Вы успешно подписались на ${name ?? ''}` })
    }

    setSubscribe(prev => !prev)
  }

  const [_, copy] = useCopyToClipboard()

  const handleShareArticle = () => {
    copy(`${window.location.origin}${goToArticleByIdRoute(String(id))}`)
      .then(() => {
        notification.success({ message: 'Ссылка успешно скопирована' })
      })
      .catch(() => {
        notification.error({ message: 'Ошибки копирования!' })
      })
  }

  const [likeCount, setLikeCount] = useState(like ?? 0)
  const handleLike = () => {
    setLikeCount(prev => like === likeCount ? prev + 1 : prev - 1)
  }

  return (
    <div className={styles.wrapArticle}>
      <Flex justify={'space-between'}>
        <Flex>
          <div>
            <img className={styles.avatarOne}
              src={imgUser}/>
          </div>
          <Flex vertical>
            <div className={styles.userName}>
              {name}
            </div>
            <div className={styles.userPosition}>
              {userPosition}
            </div>
          </Flex>
        </Flex>
        <Button
          size={'large'}
          shape={'round'}
          className={cn(styles.likeCounter, { [styles.active]: subscribe })}
          onClick={handleSubscribe}
        >
          {subscribe ? 'Вы подписаны' : 'Подписаться'}
        </Button>
      </Flex>
      <Typography.Title level={2} className={styles.title} onClick={handleOpenArticle}>{title}</Typography.Title>
      <Flex className={styles.tagWrap}>
        <div className={styles.tag}
          style={{ backgroundColor: colorTag }}>{tag}</div>
      </Flex>
      <Typography.Text>
        {content}
      </Typography.Text>
      {
        showImg
          ? <div>
            <img className={styles.hrImg}
              src={imgContent}/>
          </div>
          : ''
      }
      <Flex justify={'space-between'}>
        <Button
          size={'large'}
          shape={'round'}
          icon={<Icon name={likeCount === like ? 'heart' : 'heartChecked'} size={16}/>}
          onClick={handleLike}
          className={styles.likeCounter}
        >
          {likeCount}
        </Button>
        <Flex align={'center'}>
          <Icon
            name={'eye'}
            color={'#1A1A1AB2'}
            size={16}
          />
          <div className={styles.viewCounter}>{view}</div>
          <Button
            className={styles.share}
            icon={<Icon name={'share'} size={16} />}
            size={'large'}
            shape={'circle'}
            onClick={handleShareArticle}
          />
        </Flex>
      </Flex>
    </div>
  )
}
