import React, { type FC, useState } from 'react'

import { Button, Flex, notification } from 'antd'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { goToArticleByIdRoute, goToNewsRoute, goToNotFoundRoute } from 'app/app-router/app-router-configs'

import { BackButton } from 'ui/back-button'
import { dataArticle } from 'ui/configs/news-configs'
import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { useCopyToClipboard } from 'core/hooks/use-copy-to-clipboard'
import { cn } from 'core/utils/class-names'

import styles from './article.module.css'

export const ArticleComponent: FC = () => {
  const navigate = useNavigate()
  const { articleId } = useParams()

  const currentArticle = dataArticle.find((article) => article.id === Number(articleId))

  if (!currentArticle) {
    return <Navigate to={goToNotFoundRoute()}/>
  }

  const handleBack = () => {
    navigate(goToNewsRoute())
  }

  const [_, copy] = useCopyToClipboard()
  const handleShareArticle = () => {
    copy(`${window.location.origin}${goToArticleByIdRoute(String(articleId))}`)
      .then(() => {
        notification.success({ message: 'Ссылка успешно скопирована' })
      })
      .catch(() => {
        notification.error({ message: 'Ошибки копирования!' })
      })
  }

  const [subscribe, setSubscribe] = useState(false)

  const handleSubscribe = () => {
    if (subscribe) {
      notification.warning({ message: `Вы отписались от ${currentArticle.article.name ?? ''} и больше не будете получать новостей` })
    } else {
      notification.success({ message: `Вы успешно подписались на ${currentArticle.article.name ?? ''}` })
    }

    setSubscribe(prev => !prev)
  }

  const like = currentArticle.article.like
  const [likeCount, setLikeCount] = useState(like ?? 0)
  const handleLike = () => {
    setLikeCount(prev => like === likeCount ? prev + 1 : prev - 1)
  }

  return (
    <Container className={styles.container} maxWidth={1000}>
      <BackButton path={goToNewsRoute()} className={styles.backBtn}/>
      <div className={styles.wrapArticle}>
        <Flex justify={'space-between'}>
          <Flex className={styles.wrapHeader}>
            <div>
              <img className={styles.avatarOne}
                src={currentArticle.article.imgUser}/>
            </div>
            <Flex vertical>
              <div className={styles.userName}>
                {currentArticle.article.name}
              </div>
              <div className={styles.userPosition}>
                {currentArticle.article.userPosition}
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
        <h1>
          {currentArticle.article.title}
        </h1>
        <Flex className={styles.tagWrap}>
          <div
            className={styles.tag}
            style={{ backgroundColor: currentArticle.article.colorTag }}
          >{currentArticle.article.tag}</div>
        </Flex>
        {
          currentArticle.article.showImg
            ? <img className={styles.hrImg}
              src={currentArticle.article.imgContent}
            />
            : ''
        }

        <p className={styles.p}>
          {currentArticle.article.content_1}
        </p>
        <p className={styles.p}>
          {currentArticle.article.content_2}
        </p>
        <p className={styles.p}>
          {currentArticle.article.content_3}
        </p>
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
            <Icon name={'eye'}
              color={'#1A1A1AB2'}/>
            <div className={styles.viewCounter}>{currentArticle.article.view}</div>
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
    </Container>
  )
}
