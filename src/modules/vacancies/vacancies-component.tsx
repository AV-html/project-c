import {
  type ChangeEvent, type FC, useMemo, useState
} from 'react'

import { Input } from 'antd'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { VacanciesList } from './components/vacancies-list'
import { vacanciesApi } from './vacancies-api'

import styles from './vacancies.module.scss'

export const VacanciesComponent: FC = () => {
  const { data: vacancies = [] } = vacanciesApi.useGetVacanciesQuery()
  const { data: vacanciesRNT = [] } = vacanciesApi.useGetVacanciesRNTGroupQuery()

  const [search, setSearch] = useState('')
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const allVacancies = useMemo(() => vacancies.concat(vacanciesRNT), [vacancies, vacanciesRNT])

  return (
    <>
      <Container>
        <Input
          className={styles.inputSearch}
          placeholder="Найти все про IT"
          prefix={<Icon name={'search'}/>}
          value={search}
          onChange={handleChangeSearch}
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
      <VacanciesList allVacancies={allVacancies}/>
    </>
  )
}
