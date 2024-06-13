import { type FC } from 'react'

import {
  Button, Flex, Input, Typography
} from 'antd'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { VacancyCard } from './components/vacancy-card'
import { VacancyItem } from './components/vacancy-item'
import { vacanciesApi } from './vacancies-api'

import styles from './vacancies.module.scss'

export const VacanciesComponent: FC = () => {
  const { data: vacancies = [] } = vacanciesApi.useGetVacanciesQuery()
  const { data: vacanciesRNT = [] } = vacanciesApi.useGetVacanciesRNTGroupQuery()

  const allVacancies = vacancies.concat(vacanciesRNT)

  const handleVacanciesMe = () => {
    // FIXME: Установить фильтры на фронт
  }

  const mainVacancy = allVacancies.filter((vacancy) => {
    const conditions = vacancy.title.includes('react') ||
      vacancy.title.includes('Фронт') ||
      vacancy.title.includes('React') ||
      vacancy.title.includes('Front-end') ||
      vacancy.title.includes('Frontend')

    return conditions
  })
    .slice(0, 3)
    .map((vacancy) => <VacancyCard key={vacancy.vacancyId} {...vacancy}/>)

  const filteredVacancies = allVacancies
  const vacanciesList = filteredVacancies.map((vacancy) => <VacancyItem
    key={vacancy.vacancyId}
    {...vacancy}
  />)

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
                Вакансии подходящие <br/> Вам на 90%
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
            {mainVacancy}
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
              {vacanciesList}
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
