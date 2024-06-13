import { type FC } from 'react'

import {
  Button, Flex, Input, Typography
} from 'antd'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import ReksoftLogo from 'core/assets/images/reksoft-logo.svg'

import { vacanciesApi } from './vacancies-api'

import styles from './vacancies.module.scss'

export const VacanciesComponent: FC = () => {
  const { data: vacancies = [] } = vacanciesApi.useGetVacanciesQuery()
  const { data: vacanciesRNT = [] } = vacanciesApi.useGetVacanciesRNTGroupQuery()

  console.log(vacancies, vacanciesRNT)

  const handleVacanciesMe = () => {

  }

  const card = <div className={styles.card}>
    <Flex vertical gap={16}>
      <Flex justify={'space-between'}>
        <ReksoftLogo width={103} height={20}/>
        <Icon name={'heart'}/>
      </Flex>
      <Flex vertical gap={8}>
        <Typography.Title level={4}>
          Frontend-разработчик
        </Typography.Title>
        <Flex gap={24} wrap>
          <span>📍 Москва</span>
          <span>🏢 Гибрид</span>
          <span>👨‍🦰 Middle-Senior</span>
        </Flex>
      </Flex>
      <div>
        <div className={styles.tag}>Фронт</div>
      </div>
    </Flex>
  </div>

  return (
    <>
      <Container>
        <Input
          className={styles.inputSearch}
          placeholder="Найти все про IT"
          prefix={<Icon name={'search'}/>}
          style={{
            borderRadius: '100px',
            outline: 'none',
            boxShadow: 'none',
            borderColor: '#1A1A1A0D',
            paddingLeft: '28px',
            paddingRight: '28px'
          }}
        />
      </Container>
      <div className={styles.line}>
        <Container className={styles.lineInner}>
          <Flex gap={16}>
            <Flex vertical gap={24}>
              <Typography.Title level={3} style={{ color: '#fff' }}>
                Вакансии подходящие <br/> Вам на 100%
              </Typography.Title>
              <Button
                size={'large'}
                shape={'round'}
                type={'default'}
                icon={<Icon name={'search'}/>}
                onClick={handleVacanciesMe}
                className={styles.startBtn}
              >
                Смотреть все
              </Button>
            </Flex>
            {card}
            {card}
            {card}
          </Flex>
        </Container>
      </div>
      <Container>
        <Flex vertical gap={24}>
          <Typography.Title level={2}>
            Вакансии
          </Typography.Title>
          <Flex gap={40}>
            <Flex vertical gap={8} className={styles.vacancies}>
              Список вакансий
            </Flex>
            <Flex vertical gap={24} className={styles.filter}>
              Фильтры
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
