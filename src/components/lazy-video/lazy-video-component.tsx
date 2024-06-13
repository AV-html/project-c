import React, { type FC, useState } from 'react'

import ReactPlayer from 'react-player'

import { Icon } from 'ui/icon'

import type { ILazyVideoProps } from './lazy-video-types'

import styles from './lazy-video.module.css'

export const LazyVideoComponent: FC<ILazyVideoProps> = ({
  url, width, height, preview
}) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)

  const handlePlayerClick = () => {
    setIsPlayerVisible(true)
  }

  const styleGeometry = {
    width,
    height
  }

  return (
    <div onClick={handlePlayerClick} className={styles.lazy}>
      {isPlayerVisible && (
        <div className={styles.playerWrapper} style={styleGeometry}>
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
          <div className={styles.wrapPreview} style={styleGeometry}>
            <div className={styles.preview} style={styleGeometry}>
              <Icon name={'play'} size={24}/>
              Нажмите, чтобы загрузить видео
            </div>
            {preview && <img src={preview} alt="" className={styles.previewImg} />}
          </div>
        )
      }
    </div>
  )
}
