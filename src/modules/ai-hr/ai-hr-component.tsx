import React, { type FC } from 'react'

import { Button, Flex } from 'antd'

import { Container } from 'ui/container'

import Block1 from './../../core/assets/images/block_1.svg'
import Block2 from './../../core/assets/images/block_2.svg'
import Block3 from './../../core/assets/images/block_3.svg'
import Block4 from './../../core/assets/images/block_4.svg'
import BlockRecruter from './../../core/assets/images/blockRecruter.svg'
import ProblemBlock from './../../core/assets/images/problem-block.svg'
import TrackAgata from './../../core/assets/images/trackAgata.svg'
import TrackRecruter from './../../core/assets/images/trackRecruter.svg'

import styles from './ai-hr.module.css'

export const AiHrComponent: FC = () => {
  const handleRegistration = () => {}

  return (
    <Container>

      <Flex align={'center'} justify={'space-between'}>
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
          <div className={styles.wrapBlock12}>
            <Block1 className={styles.block1}/>
            <Block2 className={styles.block2}/>
          </div>
          <div>
            <Block3 className={styles.block3}/>
            <Block4 className={styles.block4}/>
          </div>
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
