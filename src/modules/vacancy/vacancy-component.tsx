import { type FC } from 'react'

import {
  Button, Flex, notification, Typography
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { goToAgataInterviewByIdRoute, goToAuthRoute, goToVacanciesRoute } from 'app/app-router/app-router-configs'

import { BackButton } from 'ui/back-button'
import { Container } from 'ui/container'

import CommitLogo from 'core/assets/images/commit-logo.svg'
import FrameVacancy from 'core/assets/images/frame-vacancy.png'
import Steps from 'core/assets/images/steps.svg'
import { useAppSelector } from 'core/hooks/rtk'
import { getUserInfo } from 'core/user/user-selectors'
import { cn } from 'core/utils/class-names'

import { vacancyApi } from './vacancy-api'
import { agataInterviewApi } from '../agata-interview-list/agata-interview-list-api'

import styles from './vacancy.module.scss'

export const VacancyComponent: FC = () => {
  const { vacancyId = '' } = useParams()
  const navigation = useNavigate()

  const { data } = vacancyApi.useGetVacanciesByIdQuery(vacancyId, { skip: !vacancyId })

  const [createInterview] = agataInterviewApi.useCreateAgataDialogMutation()

  const dialogId = data?.dialogId
  const companyId = data?.company.id
  const userInfo = useAppSelector(getUserInfo)

  const handleClickVacancy = () => {
    if (!userInfo) {
      navigation(goToAuthRoute())
    } else if (dialogId) {
      navigation(goToAgataInterviewByIdRoute(dialogId))
    } else if (companyId) {
      createInterview(companyId)
        .unwrap()
        .then(({ dialogId }) => {
          navigation(goToAgataInterviewByIdRoute(dialogId))
        })
        .catch(() => {
          notification.error({ message: 'Не удалось создать тестовое интревью' })
        })
    }
  }

  return (
    <>
      <Container className={styles.vacancy} maxWidth={1000}>
        <BackButton path={goToVacanciesRoute()} className={styles.backBtn}/>
        <Flex vertical gap={24}>
          <Flex justify={'space-between'} align={'center'}>
            <CommitLogo width={150} height={32}/>
            <Button
              type={'primary'}
              size={'large'}
              shape={'round'}
              onClick={handleClickVacancy}
              className={cn({ [styles.checked]: !!dialogId })}
            >
              {!dialogId ? 'Откликнуться' : 'Перейти в интервью'}
            </Button>
          </Flex>
          <Flex vertical gap={24}>
            <Flex vertical gap={16}>
              <Typography.Title level={2}>{data?.title}</Typography.Title>
              <Flex gap={24}>
                {data?.city && <span>📍 {data.city}</span>}
                {data?.format && <span>🏢 {data.format}</span>}
                {data?.position && <span>👨‍🦰 {data.position}</span>}
              </Flex>
              <Flex gap={8} wrap className={styles.tags}>
                {
                  data?.skills.map((skill, idx) => {
                    return (
                      <div className={styles.tag} key={idx}>
                        {skill}
                      </div>
                    )
                  })
                }
              </Flex>
            </Flex>

            <Typography.Text>
              {data?.description}
            </Typography.Text>

            <div className={styles.frame}>
              <img src={FrameVacancy} alt="" draggable={false}/>
            </div>

            <Flex vertical gap={16}>
              <Typography.Title level={4}>
                Задачи
              </Typography.Title>
              <ul className={styles.tasks}>
                {data?.tasks.map((task, idx) => {
                  return (
                    <li key={idx}>
                      <Typography.Text>
                        {task}
                      </Typography.Text>
                    </li>
                  )
                })}
              </ul>
            </Flex>

            <Flex vertical gap={16}>
              <Typography.Title level={4}>
                Навыки
              </Typography.Title>
              <ul className={styles.tasks}>
                {data?.methods.map((task, idx) => {
                  return (
                    <li key={idx}>
                      <Typography.Text>
                        {task}
                      </Typography.Text>
                    </li>
                  )
                })}
              </ul>
            </Flex>

          </Flex>
        </Flex>
      </Container>

      <div className={styles.line}>
        <Container maxWidth={1000}>
          <div className={styles.steps}>
            <Steps/>
          </div>
        </Container>
      </div>

      <Container className={styles.vacancy} maxWidth={1000}>
        <Flex vertical gap={24}>
          <Flex vertical gap={16}>
            <Typography.Title level={4}>
              Преимущества
            </Typography.Title>
            <ul className={styles.tasks}>
              {data?.advantages.map((task, idx) => {
                return (
                  <li key={idx}>
                    <Typography.Text>
                      {task}
                    </Typography.Text>
                  </li>
                )
              })}
            </ul>
          </Flex>

          <Flex vertical gap={16}>
            <Typography.Title level={4}>
              Условия
            </Typography.Title>
            <ul className={styles.tasks}>
              {data?.conditions.map((task, idx) => {
                return (
                  <li key={idx}>
                    <Typography.Text>
                      {task}
                    </Typography.Text>
                  </li>
                )
              })}
            </ul>
          </Flex>

          <Flex vertical gap={16}>
            <Typography.Title level={4}>
              Команда
            </Typography.Title>
            <ul className={styles.tasks}>
              {data?.team.map((task, idx) => {
                return (
                  <li key={idx}>
                    <Typography.Text>
                      {task}
                    </Typography.Text>
                  </li>
                )
              })}
            </ul>
          </Flex>
          <Flex justify={'center'}>
            <Button
              type={'primary'}
              size={'large'}
              shape={'round'}
              onClick={handleClickVacancy}
              style={{ width: 300 }}
              className={cn({ [styles.checked]: !!dialogId })}
            >
              {!dialogId ? 'Откликнуться' : 'Перейти в интервью'}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
