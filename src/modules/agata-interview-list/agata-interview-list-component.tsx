import { type FC } from 'react'

import {
  Alert, Button, Flex, notification, Typography
} from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToAgataInterviewByIdRoute, goToAgataInterviewReportRoute } from 'app/app-router/app-router-configs'

import { ProfileNavbar } from 'components/profile-navbar'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { agataInterviewApi } from './agata-interview-list-api'
import { statusToBtnText, statusToColor, statusToText } from './agata-interview-list-configs'
import { gradeToColor } from '../agata-interview-report/agata-interview-report-component'

import styles from './agata-interview-list.module.scss'

export const AgataInterviewListComponent: FC = () => {
  const { data = [] } = agataInterviewApi.useGetAgataDialogsQuery()
  const { data: testCompany } = agataInterviewApi.useGetTestCompanyIdQuery()
  const [createInterview] = agataInterviewApi.useCreateAgataDialogMutation()
  const [removeInterview] = agataInterviewApi.useRemoveAgataDialogMutation()

  const navigation = useNavigate()

  const isAnalysis = data.some(({ status }) => status === 'ANALYSIS')

  const cards = data.map(({
    companyAvatar,
    companyName,
    dialogId,
    status,
    reportInfo
  }) => {
    const handleGoToInterview = () => {
      navigation(goToAgataInterviewByIdRoute(dialogId))
    }

    const handleRemove = () => {
      void removeInterview(dialogId)
    }

    const handleGoToReport = () => {
      navigation(goToAgataInterviewReportRoute(dialogId))
    }

    const total = Number((reportInfo.scoreSum / (reportInfo.countQuestion * 10) * 100).toFixed(0))

    let color = gradeToColor.bottom
    if (total > 30 && total < 60) {
      color = gradeToColor.middle
    } else if (total > 30) {
      color = gradeToColor.top
    }

    return (
      <Flex className={styles.card} gap={16} key={dialogId}>
        <div className={styles.preview}>
          <div className={styles.play} onClick={handleGoToInterview}>
            <Icon name={'play'} size={24}/>
          </div>
        </div>
        <div className={styles.right}>
          <Flex vertical gap={16} className={styles.wrap}>
            <Flex justify={'space-between'} align={'center'}>
              <Flex gap={8} align={'center'}>
                {
                  companyAvatar
                    ? <img src={companyAvatar} alt="companyAvatar" width={32} height={32}/>
                    : <div className={styles.emptyLogo}>
                      <Icon name={'crown'} size={16}/>
                    </div>
                }
                <Typography.Text>
                  {companyName}
                </Typography.Text>
              </Flex>
              <Flex gap={8}>
                <div style={{ background: statusToColor[status] }} className={styles.status}>
                  {statusToText[status]}
                </div>
                <Flex gap={4} className={styles.aihr} align={'center'}>
                  <Icon name={'stars'} size={16}/>
                  AI HR
                </Flex>
                <Button
                  shape={'circle'}
                  icon={<Icon name={'trash'} size={16}/>}
                  type={'dashed'}
                  className={styles.trash}
                  onClick={handleRemove}
                />
              </Flex>
            </Flex>
            <Flex gap={24} align={'center'} className={styles.body}>
              <div className={styles.tag}>
                Фронт-енд
              </div>
              <Typography.Text strong>
                Frontend-разработчик
              </Typography.Text>
            </Flex>
            <Flex align={'end'} justify={'space-between'} gap={16}>
              {
                status === 'COMPLETED'
                  ? <div>
                    {status === 'COMPLETED' && <Button
                      size={'large'}
                      type={'primary'}
                      shape={'round'}
                      icon={<Icon name={'post'} size={16}/>}
                      onClick={handleGoToReport}
                      style={{ background: color }}
                    >
                        Результат {total} %
                    </Button>}
                  </div>
                  : <div/>
              }
              <Button
                size={'large'}
                shape={'round'}
                type={'primary'}
                icon={<Icon name={'play'} size={16}/>}
                onClick={handleGoToInterview}
              >
                {statusToBtnText[status]}
              </Button>
            </Flex>
          </Flex>
        </div>
      </Flex>
    )
  })

  const handleCreateInterview = () => {
    const testCompanyId = testCompany?.id

    if (testCompanyId) {
      createInterview(testCompanyId)
        .unwrap()
        .then(({ dialogId }) => {
          navigation(goToAgataInterviewByIdRoute(dialogId))
        })
        .catch(() => {
          notification.error({ message: 'Не удалось создать тестовое интревью' })
        })
    } else {
      notification.error({
        description: 'Тестовая среда не развёрнута',
        message: 'Не удалось создать тестовое интревью'
      })
    }
  }

  return (
    <Container>
      <Flex vertical gap={24}>
        <ProfileNavbar>
          <Button
            icon={<Icon name={'plus'} size={16}/>}
            size={'large'}
            shape={'round'}
            type={'default'}
            className={styles.create}
            onClick={handleCreateInterview}
            disabled={!testCompany?.id}
          >
            Создать тестовое интервью
          </Button>
        </ProfileNavbar>
        {isAnalysis && <Alert
          showIcon
          icon={<Icon name={'error'} size={16}/>}
          type={'warning'}
          message={'Вы недавно завершили интервью. Обработка займёт пару минут и можно будет посмотреть результаты'}
        />}
        <Flex vertical gap={8}>
          {cards}
        </Flex>
      </Flex>
    </Container>
  )
}
