import { type FC, memo, useState } from 'react'

import {
  Button, Flex, Form, Pagination, Typography
} from 'antd'

import { CheckButton } from 'ui/check-button'
import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { formatToText, positionToText, tagsToText } from './vacancies-list-configs'
import type { IVacancy } from '../../vacancies-types'
import { callbackMainVacancies } from '../../vacancies-utils'
import { VacancyCard } from '../vacancy-card'
import { VacancyItem } from '../vacancy-item'

import styles from './vacancies-list.module.scss'

export interface IVacanciesListProps {
  allVacancies: IVacancy[]
}

export const VacanciesListComponent: FC<IVacanciesListProps> = memo(({ allVacancies }) => {
  const [form] = Form.useForm<Record<string, boolean>>()

  const [page, setPage] = useState(1)
  const [values, setValues] =
    useState<Array<[string, boolean]>>([])

  const handleVacanciesMe = () => {
    const filters = {
      commit: true,
      middle: true,
      development: true,
      senior: true,
      hybrid: true
    }
    form.resetFields()
    form.setFieldsValue(filters)
    setValues(Object.entries(filters))
  }

  const handleChangeValue = (
    changedFields: any,
    allFields: Record<string, boolean>
  ) => {
    const entriesFields = Object.entries(allFields)
    setValues(entriesFields.filter(([_, checked]) => checked))
  }

  let filteredVacancies = allVacancies
  if (values.length > 0) {
    const isAiHr = values.some(([name]) => name === 'commit')
    const jobList = values.map(([name]) => tagsToText[name]).filter(Boolean)
    const positionList = values.map(([name]) => positionToText[name]).filter(Boolean)
    const formatList = values.map(([name]) => formatToText[name]).filter(Boolean)

    filteredVacancies = allVacancies
      .filter((vacancy) => isAiHr ? vacancy.namespace === 'commit' : true)
      .filter((vacancy) => {
        const isTrueTags = jobList.some((job) => vacancy.tags.includes(job))
        return jobList.length > 0 ? isTrueTags : true
      })
      .filter((vacancy) => {
        const isTruePosition = positionList.some((position) => vacancy.position.includes(position))
        return positionList.length > 0 ? isTruePosition : true
      })
      .filter((vacancy) => {
        const isTrueFormat = formatList.some((format) => vacancy.format.toLowerCase().includes(format.toLowerCase()))
        return formatList.length > 0 ? isTrueFormat : true
      })
  }

  const startIndex = (page - 1) * 10
  const endIndex = startIndex + 10

  const vacanciesList = filteredVacancies
    .slice(startIndex, endIndex)
    .map((vacancy) => <VacancyItem
      key={vacancy.vacancyId}
      {...vacancy}
    />)

  const mainVacancy = allVacancies.filter(callbackMainVacancies)
  const lineVacancy = mainVacancy
    .slice(0, 3)
    .map((vacancy) => <VacancyCard key={vacancy.vacancyId} {...vacancy}/>)

  const handleChangePage = (value: any) => {
    setPage(value)

    window.scrollTo({
      top: 400,
      behavior: 'smooth'
    })
  }

  const handleResetClick = () => {
    setValues([])
  }

  return (
    <>
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
            {lineVacancy}
          </Flex>
        </Container>
      </div>
      <Container>
        <Flex vertical gap={24}>
          <Typography.Title level={2}>
            Вакансии
          </Typography.Title>
          <Flex gap={40}>
            <Flex
              vertical
              gap={8}
              className={styles.vacancies}
            >
              {
                vacanciesList.length
                  ? vacanciesList
                  : <Typography.Title level={3}>
                    Нет подходящих вакансий 😐
                  </Typography.Title>
              }
              {
                vacanciesList.length > 0 && <Pagination
                  defaultCurrent={1}
                  current={page}
                  total={filteredVacancies.length}
                  onChange={handleChangePage}
                />
              }
            </Flex>

            <Form
              className={styles.form}
              form={form}
              layout={'inline'}
              onValuesChange={handleChangeValue}
            >
              <Flex vertical gap={24} className={styles.filter}>
                <Flex vertical gap={8}>
                  <Typography.Title level={4}>
                  Фильтры
                  </Typography.Title>

                  <Form.Item name={'commit'} valuePropName={'checked'} initialValue={false} >
                    <CheckButton>AI интервью</CheckButton>
                  </Form.Item>
                </Flex>

                <Flex vertical gap={8}>
                  <Typography.Title level={4}>
                    Профессия
                  </Typography.Title>
                  <Flex wrap gap={16}>
                    {
                      Object.entries(tagsToText).map(([name, label]) => {
                        return <Form.Item name={name} key={name} valuePropName={'checked'} initialValue={false} >
                          <CheckButton>{label}</CheckButton>
                        </Form.Item>
                      })
                    }
                  </Flex>
                </Flex>

                <Flex vertical gap={8}>
                  <Typography.Title level={4}>
                    Уровень
                  </Typography.Title>
                  <Flex gap={8} wrap>
                    {
                      Object.entries(positionToText).map(([name, label]) => {
                        return <Form.Item name={name} key={name} valuePropName={'checked'} initialValue={false} >
                          <CheckButton>{label}</CheckButton>
                        </Form.Item>
                      })
                    }
                  </Flex>
                </Flex>

                <Flex vertical gap={8}>
                  <Typography.Title level={4}>
                    Режим работы
                  </Typography.Title>
                  <Flex gap={8} wrap>
                    {
                      Object.entries(formatToText).map(([name, label]) => {
                        return <Form.Item name={name} key={name} valuePropName={'checked'} initialValue={false} >
                          <CheckButton>{label}</CheckButton>
                        </Form.Item>
                      })
                    }
                  </Flex>
                </Flex>

                <Button
                  className={styles.reset}
                  htmlType={'reset'}
                  shape={'round'}
                  onClick={handleResetClick}
                >
                  Сброс
                </Button>
              </Flex>
            </Form>
          </Flex>
        </Flex>
      </Container>
    </>
  )
})
