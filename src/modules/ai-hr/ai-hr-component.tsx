import React, { type FC } from 'react'

import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToAgataInterviewListRoute } from 'app/app-router/app-router-configs'

import { Container } from 'ui/container'

import Block1234 from 'core/assets/images/block1234.png'
import BlockRecruter from 'core/assets/images/blockRecruter.svg'
import ProblemBlock from 'core/assets/images/problem-block.svg'
import TrackAgata from 'core/assets/images/trackAgata.svg'
import TrackRecruter from 'core/assets/images/trackRecruter.svg'

import styles from './ai-hr.module.css'

export const AiHrComponent: FC = () => {
  const navigation = useNavigate()
  const handleRegistration = () => {
    navigation(goToAgataInterviewListRoute())
  }

  return (
    <Container>

      <Flex align={'center'} justify={'space-between'} className={styles.start}>
        <div>
          <h1 className={styles.heading}>AI HR поможет быстро нанять профессионалов</h1>
          <p className={styles.subHeading}>Сопровождает на всех этапах найма, учитывая персональные потребности бизнеса
          </p>
          <Button
            type={'primary'}
            size={'large'}
            shape={'round'}
            iconPosition={'end'}
            className={styles.button}
            onClick={handleRegistration}>Попробовать
          </Button>
        </div>
        <div>
          <img src={Block1234} alt="Block" />
        </div>
      </Flex>

      <div className={styles.wrapProblemBlock}>
        <Flex vertical>
          <div className={styles.problemTitle}>Проблемы бизнеса</div>
          <div className={styles.wrapImg}>
            <ProblemBlock/>
          </div>
          <div className={styles.problemSubTitle}>
            AI HR помощник берет на себя всю операционку и помогает принять эффективные решения
          </div>
        </Flex>
      </div>

      <div className={styles.wrapRecruter}>
        <Flex vertical gap={20}>
          <div className={styles.recHeader}>Этапы найма</div>
          <div className={styles.recSubHeader}>Опыт рекрутера</div>
          <BlockRecruter/>
          <TrackRecruter/>
          <TrackAgata/>
          <div className={styles.recSubTitle}>AI найм на 65% быстрее</div>
        </Flex>
        <div className={styles.wrapButton}>
          <Button
            type={'primary'}
            size={'large'}
            shape={'round'}
            iconPosition={'end'}
            className={styles.recButton}
            onClick={handleRegistration}>Попробовать
          </Button>
        </div>
      </div>
    </Container>
  )
}
