import { type FC } from 'react'

import { Button, Flex } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  goToAgataInterviewListRoute,
  goToProfileRoute, goToSkillsMapRoute,
  goToVacanciesStepsRoute
} from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

import { cn } from 'core/utils/class-names'

import styles from './profile-navbar.module.scss'

export const ProfileNavbarComponent: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const handleGoToVacancies = () => {
    navigate(goToVacanciesStepsRoute())
  }
  const handleGoToInterview = () => {
    navigate(goToAgataInterviewListRoute())
  }
  const handleGoToProfile = () => {
    navigate(goToProfileRoute('me'))
  }
  const handleGoSkillsMap = () => {
    navigate(goToSkillsMapRoute('me'))
  }

  const isVacancies = location.pathname.includes('vacancies-steps')
  const isInterview = location.pathname.includes('interview')
  const isProfile = location.pathname.includes('profile')

  return (
    <Flex gap={16}>
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
        className={cn(styles.button, { [styles.active]: isProfile })}
        size={'large'}
        shape={'round'}
      >
        📈 Карта навыков
      </Button>
    </Flex>
  )
}
