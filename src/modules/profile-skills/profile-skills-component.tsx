import React, { type FC } from 'react'

import {
  Button, Flex, notification, Typography
} from 'antd'
import { useParams } from 'react-router-dom'

import { goToSkillsMapRoute } from 'app/app-router/app-router-configs'

import { ProfileNavbar } from 'components/profile-navbar'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import { useCopyToClipboard } from 'core/hooks/use-copy-to-clipboard'
import { cn } from 'core/utils/class-names'

import avatar from './../../core/assets/images/agata-avatar.png'
import skills from './../../core/assets/images/skills.png'
import { skillsApi } from './profile-skills-api'

import styles from './profile-skills.module.css'

export const ProfileSkillsComponent: FC = () => {
  const { userId = 'null' } = useParams()

  const { data: userSkills } = skillsApi.useGetSkillsByIdQuery(userId, { skip: !userId })

  const [updateSkill] = skillsApi.useUpdateSkillsByIdMutation()

  const isEditable = userId === 'me'

  const handleCheckSkill = (skill: string, newChecked: boolean) => {
    if (isEditable) {
      void updateSkill({ [skill]: newChecked })
    }
  }

  const [_, copy] = useCopyToClipboard()

  const handleShareSkillsMap = () => {
    if (userSkills?.userId) {
      copy(`${window.location.origin}${goToSkillsMapRoute(String(userSkills.userId))}`)
        .then(() => {
          notification.success({ message: 'Ссылка успешно скопирована' })
        })
        .catch(() => {
          notification.error({ message: 'Ошибки копирования!' })
        })
    }
  }

  const skillsJunior = userSkills?.junior ? Object.entries(userSkills.junior) : []
  const skillsMiddle = userSkills?.middle ? Object.entries(userSkills.middle) : []
  const skillsSenior = userSkills?.senior ? Object.entries(userSkills.senior) : []

  const skillsListJunior = skillsJunior.map(([skill, checked]) => {
    const handleChangeChecked = () => { handleCheckSkill(skill, !checked) }
    return (
      <div className={styles.wrapButton} key={skill}>
        <button
          onClick={handleChangeChecked}
          className={cn(
            styles.buttonSkill,
            {
              [styles.hover]: isEditable,
              [styles.active]: checked
            }
          )}
        >
          {skill}
          {checked
            ? <Icon className={styles.icon} name={'checkCircle'} size={16}/>
            : <Icon className={styles.icon} name={'circleIcon'} size={16}/>
          }
        </button>
      </div>
    )
  })

  const skillsListMiddle = skillsMiddle.map(([skill, checked]) => {
    const handleChangeChecked = () => { handleCheckSkill(skill, !checked) }
    return (
      <div className={styles.wrapButton} key={skill}>
        <button
          onClick={handleChangeChecked}
          className={cn(
            styles.buttonSkill,
            {
              [styles.hover]: isEditable,
              [styles.active]: checked
            }
          )}
        >
          {skill}
          {checked
            ? <Icon className={styles.icon} name={'checkCircle'} size={16}/>
            : <Icon className={styles.icon} name={'circleIcon'} size={16}/>
          }
        </button>
      </div>
    )
  })

  const skillsListSenior = skillsSenior.map(([skill, checked]) => {
    const handleChangeChecked = () => { handleCheckSkill(skill, !checked) }
    return (
      <div className={styles.wrapButton} key={skill}>
        <button
          onClick={handleChangeChecked}
          className={cn(
            styles.buttonSkill,
            {
              [styles.hover]: isEditable,
              [styles.active]: checked
            }
          )}
        >
          {skill}
          {checked
            ? <Icon className={styles.icon} name={'checkCircle'} size={16}/>
            : <Icon className={styles.icon} name={'circleIcon'} size={16}/>
          }
        </button>
      </div>
    )
  })

  const countCheckedSkills = (skills: Array<[string, boolean]>): number => {
    return skills.filter(([, checked]) => checked).length
  }

  const checkedJuniorCount: number = countCheckedSkills(skillsJunior)
  const checkedMiddleCount: number = countCheckedSkills(skillsMiddle)
  const checkedSeniorCount: number = countCheckedSkills(skillsSenior)
  const allCheckedSkills = checkedJuniorCount + checkedMiddleCount + checkedSeniorCount

  return (
    <Container>
      <Flex vertical gap={24}>
        <ProfileNavbar/>
        <Flex vertical gap={20}>
          <Flex
            justify={'space-between'}
            align={'center'}
            className={styles.wrapHeader}
          >
            <Typography.Title>Карта навыков</Typography.Title>
            <Flex gap={20}>
              <Button
                type={'primary'}
                size={'large'}
                shape={'round'}
                icon={<Icon name={'share'} size={16}/>}
                iconPosition={'end'}
                className={styles.button} onClick={handleShareSkillsMap}>Поделиться
              </Button>
            </Flex>
          </Flex>
          <Flex
            className={styles.wrapSkills}
            justify={'space-between'}
            align={'center'}
          >
            <div>
              <img className={styles.avatar} src={avatar} alt=""/>
            </div>
            <Flex vertical align={'center'} gap={5}>
              <Typography.Title level={3}>Иван Иванов</Typography.Title>
              <div>Продуктовый дизайнер</div>
              <div>Рексофт</div>
              <Flex gap={10}>
                <div>👨‍🦰  Мидл</div>
                <div>📍  Москва</div>
              </Flex>
              <Flex gap={10}>
                <Flex vertical align={'center'}>
                  <Typography.Title level={4}>98%</Typography.Title>
                  <div>Мэтч</div>
                </Flex>
                <Flex
                  vertical
                  align={'center'}
                  className={styles.skillBorder}
                >
                  <Typography.Title level={4}>{allCheckedSkills}</Typography.Title>
                  <div>Навыки</div>
                </Flex>
                <Flex vertical align={'center'}>
                  <Typography.Title level={4}>4</Typography.Title>
                  <div>Опыт</div>
                </Flex>
              </Flex>
            </Flex>
            <div>
              <img draggable={false} src={skills} alt=""/>
            </div>
          </Flex>

          <Flex justify={'space-between'}>
            <Flex vertical gap={20}>
              <Typography.Title level={4}>Джуниор</Typography.Title>
              <div className={styles.wrapJun}>
                {skillsListJunior}
              </div>
            </Flex>
            <Flex vertical gap={20}>
              <Typography.Title level={4}>Мидл</Typography.Title>
              <div className={styles.wrapJun}>
                {skillsListMiddle}
              </div>
            </Flex>
            <Flex vertical gap={20}>
              <Typography.Title level={4}>Сеньор</Typography.Title>
              <div className={styles.wrapJun}>
                {skillsListSenior}
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
