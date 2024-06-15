import React from 'react'

import { Flex } from 'antd'

import { Container } from 'ui/container'

import { UserCard } from './components/user-card'
import { UserHelp } from './components/user-help'
import { UserMiniCard } from './components/user-mini-card'

import styles from './community.module.css'

export const CommunityComponent = () => {
  const filter = 'all' // убрать

  return (
    <Container >
      <Flex gap={40} vertical>
        <Flex >
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('all')}
          >
                        Все
          </button>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('front')}
          >
                        ‍👋  Общение
          </button>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('back')}
          >
                        🤝  Менторство
          </button>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('des')}
          >
                        👩‍💼 Карьерные консультации
          </button>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('ml')}
          >
                        🦸‍  Тренировка собеседований
          </button>
        </Flex>
        <Flex className={styles.tagWrap}>
          <div className={styles.tag} style={{ backgroundColor: '#31BBF2' }}>Фронт</div>
          <div className={styles.tag} style={{ backgroundColor: '#FB814D' }}>Бэк</div>
          <div className={styles.tag} style={{ backgroundColor: '#71CB3E' }}>Аналитика</div>
          <div className={styles.tag} style={{ backgroundColor: '#FF5574' }}>Дизайн</div>
          <div className={styles.tag} style={{ backgroundColor: '#6889FF' }}>Менеджмент</div>
        </Flex>
        <h2 className={styles.h2}>Общение</h2>
        <Flex gap={16}>
          <UserCard/>
          <UserCard/>
          <UserCard/>
        </Flex>
        <Flex gap={16}>
          <UserCard/>
          <UserCard/>
          <UserCard/>
        </Flex>
        <h2 className={styles.h2}>Менторство</h2>
        <Flex >
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('all')}
          >
                        Все
          </button>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('front')}
          >
                        ‍👍️   Буду полезна
          </button>
          <button
            className={`${styles.filter} ${filter === 'all' ? styles.active : ''}`}
            // onClick={() => filterButtonHandler('back')}
          >
                        🙏  Нужен совет
          </button>
        </Flex>
        <Flex gap={16}>
          <UserHelp hex={'#E9F5F1'}/>
          <UserHelp hex={'#E9F5F1'}/>
        </Flex>
        <Flex gap={16}>
          <UserHelp hex={'#FDEDED'}/>
          <UserHelp hex={'#FDEDED'}/>
        </Flex>
        <h2 className={styles.h2}>Карьерные консультации</h2>
        <Flex gap={10}>
          <UserMiniCard/>
          <UserMiniCard/>
          <UserMiniCard/>
          <UserMiniCard/>
          <UserMiniCard/>
          <UserMiniCard/>
        </Flex>
      </Flex>
    </Container>
  )
}
