import { type FC, useState } from 'react'

import {
  Button, Flex, notification, Popover, Typography
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { goToAgataInterviewByIdRoute, goToVacancyRoute } from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

import CommitLogo from 'core/assets/images/commit-logo.svg'
import ReksoftLogo from 'core/assets/images/reksoft-logo.svg'

import type { IComponentsProps } from './vacancy-item-types'
import { agataInterviewApi } from '../../../agata-interview-list/agata-interview-list-api'

import styles from './vacancy-item.module.scss'

export const VacancyItemComponent: FC<IComponentsProps> = ({
  company,
  namespace,
  vacancyId,
  format,
  link,
  position,
  skills,
  title,
  tasks,
  city
}) => {
  const navigation = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const [createInterview] = agataInterviewApi.useCreateAgataDialogMutation()

  const handleCreateInterview = () => {
    const companyId = company.id

    createInterview(companyId)
      .unwrap()
      .then(({ dialogId }) => {
        setOpen(false)
        navigation(goToAgataInterviewByIdRoute(dialogId))
      })
      .catch(() => {
        notification.error({ message: 'Не удалось создать тестовое интревью' })
      })
  }

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <Flex vertical gap={16} className={styles.innerBody}>
          <Flex vertical gap={8}>
            <Flex justify={'space-between'}>
              <Typography.Title level={4}>
                {
                  namespace === 'commit' &&
                    <Link to={namespace === 'commit' ? goToVacancyRoute(String(vacancyId)) : link}>
                      {title}
                    </Link>
                }
                {
                  namespace === 'reksoft' &&
                    <a className={styles.link} href={link} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                }
              </Typography.Title>
              {
                namespace === 'commit' && <Popover

                  content={<Flex vertical gap={16}>
                    <Flex vertical gap={8}>
                      <Typography.Title level={4}>
                          Пройдите интервью с AI HR
                      </Typography.Title>
                      <Typography.Text>
                          В любое удобное время, видео-интервью на 30 минут, несколько вопросов об опыте, профессии и целям.
                      </Typography.Text>
                    </Flex>
                    <Flex justify={'end'}>
                      <Button
                        size={'large'}
                        shape={'round'}
                        type={'primary'}
                        style={{ width: 200 }}
                        onClick={handleCreateInterview}
                      >
                          Пройти интервью
                      </Button>
                    </Flex>
                  </Flex>}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button
                    size={'middle'}
                    icon={<Icon name={'stars'} size={16}/>}
                    className={styles.btnInterview}
                  >
                        AI интервью
                  </Button>
                </Popover>
              }
            </Flex>
            <Flex gap={24}>
              <span>📍 {city}</span>
              <span>🏢 {format}</span>
              <span>👨‍🦰 {position}</span>
            </Flex>
          </Flex>
          <ul className={styles.tasks}>
            {
              tasks.map((task, idx) => {
                return (
                  <li key={idx}>
                    <Typography.Text>
                      {task}
                    </Typography.Text>
                  </li>
                )
              })
            }
          </ul>
          <Flex gap={8} wrap className={styles.tags}>
            {
              skills.map((skill, idx) => {
                return (
                  <div className={styles.tag} key={idx}>
                    {skill}
                  </div>
                )
              })
            }
          </Flex>
        </Flex>
      </div>
      <div className={styles.company}>
        {
          namespace === 'reksoft'
            ? <ReksoftLogo/>
            : <CommitLogo/>
        }
      </div>
    </div>
  )
}
