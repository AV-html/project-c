import React, { type FC, useState } from 'react'

import ReactPlayer from 'react-player'

import { Icon } from 'ui/icon'

import type { ILazyVideoProps } from './lazy-video-types'

import styles from './lazy-video.module.css'

export const LazyVideoComponent: FC<ILazyVideoProps> = ({ url }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)

  const handlePlayerClick = () => {
    setIsPlayerVisible(true)
  }

  return (
    <div onClick={handlePlayerClick}>
      {isPlayerVisible && (
        <div className={styles.playerWrapper}>
          <ReactPlayer
            url={url}
            className={styles.player}
            controls={true}
            width='100%'
            height='100%'
          />
        </div>
      )}
      {
        !isPlayerVisible && (
          <div className={styles.preview}>
            <Icon name={'play'} size={24}/>
            Нажмите, чтобы загрузить видео
          </div>
        )
      }
    </div>
  )
}
