import { type FC } from 'react'

import { Button, Flex } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  goToAgataInterviewListRoute,
  goToProfileRoute, goToSkillsMapRoute,
  goToVacanciesStepsRoute
} from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

import { cn } from 'core/utils/class-names'

import type { IProfileNavbarProps } from './profile-navbar-types'

import styles from './profile-navbar.module.scss'

export const ProfileNavbarComponent: FC<IProfileNavbarProps> = ({ children }) => {
  const { userId = '' } = useParams()

  const isMe = userId === 'me'

  const navigate = useNavigate()
  const location = useLocation()
  const handleGoToVacancies = () => {
    navigate(goToVacanciesStepsRoute())
  }
  const handleGoToInterview = () => {
    navigate(goToAgataInterviewListRoute())
  }
  const handleGoToProfile = () => {
    navigate(goToProfileRoute(isMe ? 'me' : userId))
  }
  const handleGoSkillsMap = () => {
    navigate(goToSkillsMapRoute(isMe ? 'me' : userId))
  }

  const isVacancies = location.pathname.includes('vacancies-steps')
  const isInterview = location.pathname.includes('interview')
  const isProfile = location.pathname.includes('profile')
  const isSkillMap = location.pathname.includes('skills-map')

  return (
    <Flex gap={16} justify={'space-between'}>
      <Flex gap={16}>
        {
          isMe && <>
            <Button
              onClick={handleGoToVacancies}
              className={cn(styles.button, { [styles.active]: isVacancies })}
              size={'large'}
              shape={'round'}
            >
              🧑‍💻Вакансии
            </Button>
            <Button
              onClick={handleGoToInterview}
              icon={<Icon name={'stars'} size={16}/>}
              className={cn(styles.button, [styles.ai], { [styles.active]: isInterview })}
              size={'large'}
              shape={'round'}

            >
              AI интервью
            </Button>
          </>
        }
        <Button
          onClick={handleGoToProfile}
          className={cn(styles.button, { [styles.active]: isProfile })}
          size={'large'}
          shape={'round'}
        >
          🙂 Резюме
        </Button>
        <Button
          onClick={handleGoSkillsMap}
          className={cn(styles.button, { [styles.active]: isSkillMap })}
          size={'large'}
          shape={'round'}
        >
          📈 Карта навыков
        </Button>
      </Flex>
      {children}
    </Flex>
  )
}
