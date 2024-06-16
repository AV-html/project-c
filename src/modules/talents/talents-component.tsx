import React, { type FC } from 'react'

import {
  Avatar, Flex, Input, Typography
} from 'antd'
import { Link } from 'react-router-dom'

import { goToProfileRoute } from 'app/app-router/app-router-configs'

import { Container } from 'ui/container'
import { Icon } from 'ui/icon'

import TalentsSets from 'core/assets/images/sets-tenats.svg'
import TalentsList from 'core/assets/images/talents.png'

import { talentsApi } from './talents-api'

import styles from './talents.module.scss'

export const TalentsComponent: FC = () => {
  const { data } = talentsApi.useGetTalentsQuery()

  const talents = data?.data ?? []

  const talentCards = talents.map((talent) => {
    const countCheckedSkills = (skills: Array<[string, boolean]>): number => {
      return skills.filter(([, checked]) => checked).length
    }

    const skillsJunior = talent.skills.skills?.junior ? Object.entries(talent.skills.skills.junior) : []
    const skillsMiddle = talent.skills.skills?.middle ? Object.entries(talent.skills.skills.middle) : []
    const skillsSenior = talent.skills.skills?.senior ? Object.entries(talent.skills.skills.senior) : []

    const checkedJuniorCount: number = countCheckedSkills(skillsJunior)
    const checkedMiddleCount: number = countCheckedSkills(skillsMiddle)
    const checkedSeniorCount: number = countCheckedSkills(skillsSenior)
    const allCheckedSkills = checkedJuniorCount + checkedMiddleCount + checkedSeniorCount

    return <div className={styles.card} key={talent.id}>
      <Flex justify={'center'} vertical style={{ textAlign: 'center' }}>
        <div className={styles.wrapAvatar}>
          {/* <img className={styles.avatar} src={avatar} alt=""/> */}
          <Avatar
            size={100}
            src={talent.avatar}
            icon={<Icon name={'profile'} size={16} color={'#000'}/>}
          />
        </div>

        <Typography.Title level={3}>
          <Link to={goToProfileRoute(talent.id)}>
            {talent.firstName}
            {' '}
            {talent.secondName}
          </Link>
        </Typography.Title>

        <Flex vertical gap={8}>
          <div>{talent.job}</div>
          <div>Reksoft</div>
          <Flex gap={24} justify={'center'}>
            <div>👨‍🦰 {talent.position}</div>
            <div>📍 {talent.location.city}</div>
          </Flex>
          <Flex gap={10} justify={'center'}>
            <Flex vertical align={'center'}>
              <Typography.Title level={4}>98%</Typography.Title>
              <div>Мэтч</div>
            </Flex>
            <Flex
              vertical
              align={'center'}
              className={styles.skillBorder}
            >
              <Typography.Title level={4}>
                {allCheckedSkills}
              </Typography.Title>
              <div>Навыки</div>
            </Flex>
            <Flex vertical align={'center'}>
              <Typography.Title level={4}>
                {parseInt(talent.experience)}
              </Typography.Title>
              <div>Опыт</div>
            </Flex>
          </Flex>
          <Flex gap={8} justify={'center'}>
            <div className={styles.tag}>
              Фронт
            </div>
            <div className={styles.tag}>
              React
            </div>
            <div className={styles.tag}>
              TS
            </div>
          </Flex>
        </Flex>
      </Flex>
    </div>
  })

  return (
    <>
      <Container>
        <Input
          className={styles.inputSearch}
          placeholder="Найти все про IT"
          prefix={<Icon name={'search'}/>}
          style={{
            borderRadius: '100px',
            outline: 'none',
            boxShadow: 'none',
            borderColor: '#1A1A1A0D',
            paddingLeft: '28px',
            paddingRight: '28px'
          }}
        />
      </Container>

      <div className={styles.line}>
        <Container maxWidth={900}>
          <img src={TalentsList} alt=""/>
        </Container>
      </div>

      <Container>
        <Flex vertical gap={73}>
          <Typography.Title>
            Таланты
          </Typography.Title>
          <Flex gap={40}>
            <div className={styles.fa}>
              <div className={styles.flex}>
                {
                  talentCards.length > 0
                    ? talentCards
                    : <Typography.Title level={3}>
                      Нету талантов 😐
                    </Typography.Title>
                }
              </div>
            </div>
            <Flex vertical>
              <TalentsSets/>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
