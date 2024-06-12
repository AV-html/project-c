import { type FC, useState } from 'react'

import { Flex } from 'antd'
import Title from 'antd/lib/typography/Title'

import { Container } from 'ui/container'

import { Conference } from './components/./conference'
import { Hackathon } from './components/hackathon'

import styles from './events.module.css'

export const EventsComponent: FC = () => {
  const [filter, setFilter] = useState('all')

  const filterButtonHandler = (filter: string) => {
    setFilter(filter)
  }

  const eventsList = () => {
    switch (filter) {
      case 'all':
        return (
          <>
            <Title>Конференции</Title>
            <Conference/>
            <Title>Хакатоны</Title>
            <Hackathon/>
          </>
        )
      case 'front':
        return (
          <>
            <Title>Конференции</Title>
            <Conference/>
          </>
        )
      case 'back':
        return (
          <>
            <Title>Хакатоны</Title>
            <Hackathon/>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Container>
      <Flex style={{ marginBottom: '40px' }}>
        <button
          className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => {
            filterButtonHandler('all')
          }}
        >
          Все
        </button>
        <button
          className={`${styles.filter} ${filter === 'front' ? styles.active : ''}`}
          onClick={() => {
            filterButtonHandler('front')
          }}
        >
          ️👩‍🎨 Конференции
        </button>
        <button
          className={`${styles.filter} ${filter === 'back' ? styles.active : ''}`}
          onClick={() => {
            filterButtonHandler('back')
          }}>
          👨‍💼 Хакатоны
        </button>
        <button
          className={styles.filterDisabled}>
          👩‍🏫 Митапы
        </button>
        <button
          className={styles.filterDisabled}>
          🕵️‍♂️ Быстрый офер
        </button>
      </Flex>
      <Flex vertical gap={20}>
        {eventsList()}
      </Flex>
    </Container>
  )
}
