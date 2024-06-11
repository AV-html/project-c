import React, { type FC } from 'react'

import { Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToArticleByIdRoute } from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

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
        <button className={styles.subscribe} disabled={true}>Подписаться</button>
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
        <Flex className={styles.likeWrap}
          align={'center'}>
          <Icon name={'heart'}
            color={ '#1A1A1AB2'}/>
          <div className={styles.likeCounter}>{like}</div>
        </Flex>
        <Flex align={'center'}>
          <Icon name={'eye'}
            color={ '#1A1A1AB2'}/>
          <div className={styles.viewCounter}>{view}</div>
          <div className={styles.share}>
            <Icon className={styles.shareIcon}
              name={'share'}/>
          </div>
        </Flex>
      </Flex>
    </div>
  )
}
