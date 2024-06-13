import { type FC } from 'react'

import { Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { goToVacancyRoute } from 'app/app-router/app-router-configs'

import { Icon } from 'ui/icon'

import CommitLogo from 'core/assets/images/commit-logo.svg'
import ReksoftLogo from 'core/assets/images/reksoft-logo.svg'

import type { IVacancyCardProps } from './vacancy-card-types'
import styles from '../vacancies-list/vacancies-list.module.scss'

export const VacancyCardComponent: FC<IVacancyCardProps> = ({
  vacancyId,
  title,
  city,
  format,
  position,
  namespace,
  link
}) => {
  return (
    <div className={styles.card}>
      <Flex vertical gap={16} style={{ height: '100%' }}>
        <Flex justify={'space-between'}>
          {namespace === 'reksoft' && <ReksoftLogo width={103} height={20}/>}
          {namespace === 'commit' && <CommitLogo width={103} height={20}/>}
          <Icon name={'heart'}/>
        </Flex>
        <Flex vertical gap={8} className={styles.body}>
          <Typography.Title level={4} title={title}>
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
          <Flex gap={24} wrap>
            {city && <span>📍 {city}</span>}
            {format && <span>🏢 {format}</span>}
            {position && <span>👨‍🦰 {position}</span>}
          </Flex>
        </Flex>
        <Flex gap={8}>
          <div className={styles.tag}>Фронт</div>
          <div className={styles.tag}>React</div>
        </Flex>
      </Flex>
    </div>
  )
}
