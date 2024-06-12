import { type FC } from 'react'

import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToAgataInterviewByIdRoute } from 'app/app-router/app-router-configs'

import { ProfileNavbar } from 'components/profile-navbar'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { agataInterviewApi } from './agata-interview-list-api'
import { statusToBtnText, statusToColor, statusToText } from './agata-interview-list-configs'

import styles from './agata-interview-list.module.scss'

export const AgataInterviewListComponent: FC = () => {
  const { data = [] } = agataInterviewApi.useGetAgataDialogsQuery()

  const navigation = useNavigate()

  const cards = data.map(({
    companyAvatar,
    companyName,
    dialogId,
    status
  }) => {
    const handleGoToInterview = () => {
      navigation(goToAgataInterviewByIdRoute(dialogId))
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
              <Flex gap={8} >
                <div style={{ background: statusToColor[status] }} className={styles.status}>
                  {statusToText[status]}
                </div>
                <Flex gap={4} className={styles.aihr} align={'center'}>
                  <Icon name={'stars'} size={16}/>
                  AI HR
                </Flex>
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
              <div>

              </div>
              <Button
                size={'large'}
                shape={'round'}
                type={'primary'}
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

  return (
    <Container>
      <Flex vertical gap={24}>
        <ProfileNavbar/>
        <Flex vertical gap={8}>
          {cards}
        </Flex>
      </Flex>
    </Container>
  )
}
