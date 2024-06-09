import React, { type FC } from 'react'

import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToArticleByIdRoute } from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

import styles from './twit-article.module.css'

export interface ITwitArticleProps {
  id?: number
  title?: string
  tag?: string
  colorTag?: string
  data?: string
}

export const TwitArticleComponent: FC<ITwitArticleProps> = ({
  id,
  title,
  tag,
  colorTag,
  data
}) => {
  const navigate = useNavigate()
  const handleOpenArticle = () => {
    navigate(goToArticleByIdRoute(String(id)))
  }
  return (
    <Flex className={styles.subArticle}
      align={'center'}>
      <Flex justify={'space-between'}
        gap={10}
        vertical>
        <h2 className={styles.h2}>
          {title}
        </h2>
        <Flex gap={16}
          align={'center'}>
          <div
            className={styles.tag}
            style={{ backgroundColor: colorTag }}
          >{tag}</div>
          <div>{data}</div>
        </Flex>
      </Flex>
      <button
        className={styles.roundButton}
        onClick={handleOpenArticle}
      >
        <Icon name={'arrowShortRight'} />
      </button>
    </Flex>
  )
}
