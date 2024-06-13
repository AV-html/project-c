import { type FC } from 'react'

import { Flex } from 'antd'
import { useLocation } from 'react-router-dom'

import { goToEventsRoute } from 'app/app-router/app-router-configs'

import { eventApi } from '../../events-api'

import styles from './hackathon.module.css'

export const HackathonComponent: FC = () => {
  const { data: events } = eventApi.useGetEventsQuery()

  const location = useLocation()
  const isConferencePath = location.pathname === goToEventsRoute()

  const hackathonList = events?.hakaton
    .slice(0, isConferencePath ? events.hakaton.length : 3)
    .map(hac => (
      <div key={hac.id}>
        <div className={styles.wrapImg}>
          <img className={styles.img} src={hac.preview} alt="" />
          <button className={styles.button}>
            <a href={hac.link} target="_blank" rel="noreferrer" className={styles.link}>
              Перейти
            </a>
          </button>
        </div>
      </div>
    ))

  return (
    <Flex wrap={ 'wrap' } gap={23}>
      {hackathonList}
    </Flex>
  )
}
