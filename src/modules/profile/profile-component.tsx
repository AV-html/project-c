import { type FC } from 'react'

import {
  Avatar, Button, Flex, notification, Typography
} from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'

import {
  goToAgataInterviewListRoute,
  goToNewsRoute,
  goToProfileRoute,
  goToSkillsMapRoute
} from 'app/app-router/app-router-configs'

import { ProfileNavbar } from 'components/profile-navbar'

import { Container } from 'ui/container'
import { GoButton } from 'ui/go-button'
import { Icon } from 'ui/icon'

import { useCopyToClipboard } from 'core/hooks/use-copy-to-clipboard'

import { profileApi } from './profile-api'
import GitHubIcon from './svg/github.svg'
import Sets from './svg/sets.svg'
import TgIcon from './svg/tg.svg'

import styles from './profile.module.scss'

export const ProfileComponent: FC = () => {
  const { userId = '' } = useParams()

  const isMe = userId === 'me'

  const { data: profileData } = profileApi.useGetProfileQuery(userId, { skip: !userId })

  const contact = profileData?.contact
  const info = profileData?.info
  const location = profileData?.location
  const work = profileData?.work
  const workplace = profileData?.workplace?.[0]

  const [_, copy] = useCopyToClipboard()

  const handleShareClick = () => {
    if (info?.userId) {
      copy(`${window.location.origin}${goToProfileRoute(String(info.userId))}`)
        .then(() => {
          notification.success({ message: 'Ссылка успешно скопирована' })
        })
        .catch(() => {
          notification.error({ message: 'Ошибки копирования!' })
        })
    }
  }

  return (
    <Container maxWidth={1232} className={styles.resume}>
      <Flex gap={24} vertical>
        <ProfileNavbar/>
        <Flex gap={40}>
          <Flex vertical gap={24} style={{ width: 320 }}>
            <Flex vertical gap={16}>
              <Avatar
                src={info?.avatar}
                size={320}
                shape={'square'}
                style={{ borderRadius: 40 }}
                icon={<Icon name={'profile'} size={100}/>}
              />
              <div className={styles.quotes}>
                <Flex gap={16}>
                  <Typography.Title level={1}>
                    “
                  </Typography.Title>
                  <Flex vertical gap={16}>
                    <Typography.Text>
                      {info?.aboutMe}
                    </Typography.Text>
                    <Flex vertical gap={4}>
                      <Typography.Title level={4}>
                        <Icon name={'stars'} size={16} color={'gold'}/>
                        {' Суперсила'}
                      </Typography.Title>
                      <Typography.Text>
                        {info?.superForce}
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            </Flex>
            <Flex vertical gap={8}>
              <Typography.Title level={4}>
                Контакты
              </Typography.Title>
              <Flex gap={8}>
                <TgIcon/>
                <Typography.Text>
                  {contact?.tg ?? '—'}
                </Typography.Text>
              </Flex>
              <Flex gap={8}>
                <GitHubIcon/>
                <Typography.Text>
                  {contact?.github ?? '—'}
                </Typography.Text>
              </Flex>
              <Flex gap={8}>
                <Icon name={'call'} size={24}/>
                <Typography.Text>
                  {contact?.phone ?? '—'}
                </Typography.Text>
              </Flex>
              <Flex gap={8}>
                <Icon name={'mail'} size={24}/>
                <Typography.Text>
                  {contact?.email ?? '—'}
                </Typography.Text>
              </Flex>

            </Flex>
            <Flex vertical gap={8}>
              <Typography.Title level={4}>
                Инструменты
              </Typography.Title>
              <Flex gap={8} wrap>
                <Sets/>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical gap={40} style={{ flex: '1 1 auto' }}>
            <Flex vertical gap={24}>
              <Flex vertical gap={8}>
                <Flex justify={'space-between'}>
                  <Typography.Title level={2}>
                    <Flex gap={8}>
                      <span>{info?.firstName ?? 'Имя'}</span>
                      {info?.secondName ?? 'Фамилия'}
                    </Flex>
                  </Typography.Title>
                  <Flex gap={8}>
                    <Button
                      icon={<Icon name={'edit'} size={16}/>}
                      size={'large'}
                      shape={'circle'}
                      disabled
                    />
                    <Button
                      icon={<Icon name={'download'} size={16}/>}
                      size={'large'}
                      shape={'circle'}
                      disabled
                    />
                    <Button
                      icon={<Icon name={'share'} size={16}/>}
                      size={'large'}
                      shape={'circle'}
                      onClick={handleShareClick}
                      type={'primary'}
                    />
                  </Flex>
                </Flex>

                <Typography.Text>
                  <Typography.Title level={5}>
                    {work?.job}
                  </Typography.Title>
                </Typography.Text>

                <Flex gap={24}>
                  <div>
                    📍 {location?.city}
                  </div>
                  <div>
                    🏢 {work?.format}
                  </div>
                  <div>
                    👨‍🦰 Middle
                  </div>
                </Flex>
              </Flex>

              <Flex gap={8}>
                <div className={styles.tag}>
                  React
                </div>
                <div className={styles.tag}>
                  Next
                </div>
                <div className={styles.tag}>
                  Redux Toolkit
                </div>
                <div className={styles.tag}>
                  PWA
                </div>
              </Flex>

              <Flex gap={16}>
                <div className={styles.card}>
                  <Typography.Title level={4} className={styles.title}>
                    Пройти тестовое AI интервью
                  </Typography.Title>
                  <GoButton className={styles.btn} path={goToAgataInterviewListRoute()}/>
                </div>
                <div className={styles.card}>
                  <Typography.Title level={4} className={styles.title}>
                    Карта навыков
                  </Typography.Title>
                  <GoButton className={styles.btn} path={goToSkillsMapRoute(isMe ? 'me' : userId)}/>
                </div>
                <div className={styles.card}>
                  <Typography.Title level={4} className={styles.title}>
                    Посты
                  </Typography.Title>
                  <GoButton className={styles.btn} path={goToNewsRoute()}/>
                </div>
              </Flex>
            </Flex>
            <Flex vertical gap={16}>
              <Flex align={'center'} gap={16}>
                <Avatar icon={<Icon name={'star'} size={16}/>} shape={'circle'} size={40}/>
                <Typography.Title level={4}>
                  {workplace?.name}
                </Typography.Title>
              </Flex>
              <Typography.Title level={3}>
                {workplace?.position}
              </Typography.Title>
              <Typography.Text type={'secondary'}>
                {dayjs(workplace?.period[0]).format('MM.YYYY')}
                {' — '}
                {dayjs(workplace?.period[1]).format('MM.YYYY')}
              </Typography.Text>
              <Typography.Title level={5}>
                Задачи
              </Typography.Title>
              <ul>

                {workplace?.tasks.map((task, idx) => {
                  return <li key={idx}>
                    <Typography.Text key={idx}>{task}</Typography.Text>
                  </li>
                })}

              </ul>
              <Typography.Title level={5}>
                Результат
              </Typography.Title>
              <ul>
                {workplace?.result.map((result, idx) => {
                  return <li key={idx}>
                    <Typography.Text>{result}</Typography.Text>
                  </li>
                })}
              </ul>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
