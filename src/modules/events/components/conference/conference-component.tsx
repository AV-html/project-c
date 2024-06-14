import { type FC } from 'react'

import { Flex, Typography } from 'antd'

import { eventApi } from '../../events-api'

import styles from './conference.module.css'

export const ConferenceComponent: FC = () => {
  const { data: events } = eventApi.useGetEventsQuery()

  const conferenceList = events?.conference.map(conf => {
    let formattedDate = ''
    const isoDate = conf.date
    if (isoDate && !isNaN(Date.parse(isoDate))) {
      const date = new Date(isoDate)
      const day = String(date.getUTCDate()).padStart(2, '0')
      const month = String(date.getUTCMonth() + 1).padStart(2, '0')
      const year = date.getUTCFullYear()
      formattedDate = `${day}.${month}.${year}`
    }

    return (
      <Flex gap={20} key={conf.id}>
        <div className={styles.wrapImg}>
          <img className={styles.img} src={conf.preview} alt=""/>
        </div>
        <div className={styles.wrapConf}>
          <Flex gap={20} vertical>
            <Typography.Title>{conf.title}</Typography.Title>
            <Flex gap={10}>
              <div className={styles.date}>{formattedDate}</div>
              <div className={styles.date}>{conf.position}</div>
            </Flex>
            <div>
              { conf.tags?.map((tag, idx) => (
                <span key={idx} className={styles.tag}>
                  {tag}
                </span>
              )) }
            </div>
            <div>{conf.description}</div>
          </Flex>
          <div>
            <a className={styles.link} href={conf.link} target="_blank" rel="noreferrer">
              Присоединиться
            </a>
          </div>
        </div>
      </Flex>
    )
  })

  return (
    <div>
      {conferenceList}
    </div>
  )
}
