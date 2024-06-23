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
  tags,
  company,
  namespace,
  vacancyId,
  format,
  link,
  position,
  skills,
  title,
  tasks,
  city,
  dialogId
}) => {
  const navigation = useNavigate()
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  const [createInterview] = agataInterviewApi.useCreateAgataDialogMutation()

  const handleCreateInterview = () => {
    const companyId = company.id

    if (!dialogId) {
      createInterview(companyId)
        .unwrap()
        .then(({ dialogId: newDialogId }) => {
          setOpen(false)
          navigation(goToAgataInterviewByIdRoute(newDialogId))
        })
        .catch(() => {
          notification.error({ message: 'Не удалось создать тестовое интревью' })
        })
    }
  }

  const handleGoInterview = () => {
    if (dialogId) {
      navigation(goToAgataInterviewByIdRoute(dialogId))
    }
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
                    <a title={title} className={styles.link} href={link} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                }
              </Typography.Title>
              {
                namespace === 'commit' && <Popover

                  content={!dialogId
                    ? (
                      <Flex vertical gap={16}>
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
                      </Flex>)
                    : (
                      <Flex vertical gap={16}>
                        <Flex vertical gap={8}>
                          <Typography.Title level={4}>
                            Интервью с AI HR
                          </Typography.Title>
                          <Typography.Text>
                            У вас уже есть созданное AI-интервью с этой вакансией
                          </Typography.Text>
                        </Flex>
                        <Flex justify={'end'}>
                          <Button
                            size={'large'}
                            shape={'round'}
                            type={'primary'}
                            style={{ width: 200 }}
                            onClick={handleGoInterview}
                          >
                            Перейти к интервью
                          </Button>
                        </Flex>
                      </Flex>
                    )
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button
                    size={'middle'}
                    icon={<Icon name={'stars'} size={16}/>}
                    className={styles.btnInterview}
                  >
                        Откликнуться
                  </Button>
                </Popover>
              }
            </Flex>
            <Flex gap={24}>
              {city && <span>📍 {city}</span>}
              {format && <span>🏢 {format}</span>}
              {position && <span>👨‍🦰 {position}</span>}
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
              [...tags, ...skills].map((skill, idx) => {
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
