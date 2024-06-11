import { FC } from 'react'

import { Flex } from 'antd'

import { eventApi } from '../../events-api'

import styles from './hackathon.module.css'

export const HackathonComponent: FC = () => {
  const { data: events } = eventApi.useGetEventsQuery()
  console.log(events)

  const hackathonList = events?.hakaton.map(hac => {
    return (
      <div key={hac.id}>
        <div className={styles.wrapImg}>
          <img className={styles.img} src={hac.preview} alt=""/>
          <button className={styles.button}>
            <a href={hac.link} target="_blank" rel="noreferrer" className={styles.link}>
              Перейти
            </a>
          </button>
        </div>
      </div>
    )
  })

  return (
    <Flex wrap={ "wrap" } gap={10}>
      {hackathonList}
    </Flex>
  )
}
