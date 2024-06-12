import React, { type FC } from 'react'

import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'

import { goToVacanciesRoute } from 'app/app-router/app-router-configs'

import { ProfileNavbar } from 'components/profile-navbar'

import { Container } from 'ui/container'

import oneFrame from 'core/assets/images/oneFrame.png'
import ReksoftLogo from 'core/assets/images/reksoft-logo.svg'
import stars from 'core/assets/images/stars.png'
import threeFrame from 'core/assets/images/threeFrame.png'
import twoFrame from 'core/assets/images/twoFrame.jpg'
import { cn } from 'core/utils/class-names'

import styles from './vacancies-steps.module.css'

export const VacanciesStepsComponent: FC = () => {
  const navigation = useNavigate()

  const handleGoToVacancies = () => {
    navigation(goToVacanciesRoute())
  }
  return (
    <Container>
      <Flex vertical gap={24}>
        <ProfileNavbar/>
        <Flex gap={16}>
          <div className={styles.oneFrame}>
            <img src={oneFrame}/>
            <div className={styles.oneFrameSub}>
              <p className={styles.titleFrame}>111</p>
              <p className={styles.subTitleFrame}>Откликов</p>
            </div>
          </div>
          <div className={styles.oneFrame}>
            <img src={twoFrame}/>
            <div className={styles.oneFrameSub}>
              <p className={styles.titleFrame}>23</p>
              <p className={styles.subTitleFrame}>Интервью</p>
            </div>
          </div>
          <div className={styles.oneFrame}>
            <img src={threeFrame}/>
            <div className={styles.oneFrameSub}>
              <p className={styles.titleFrame}>2</p>
              <p className={styles.subTitleFrame}>В процессе</p>
            </div>
          </div>
        </Flex>
        <Flex
          justify={'space-between'}
          align={'center'}
        >
          <h1 className={styles.h1}>Этапы вакансий</h1>
          <button className={styles.buttonTag} onClick={handleGoToVacancies}>
            Найти вакансии
            <span className={styles.stars}>
              <img src={stars} alt=""/>
            </span>
          </button>
        </Flex>
        <div className={styles.wrapMeet}>
          <Flex justify={'space-between'}>
            <h2>Фронт в Финтех</h2>
            <div>
              <Flex align={'center'}>
                <div className={styles.tag}>Фронт</div>
                <div className={styles.img}>
                  {<ReksoftLogo/>}
                </div>
              </Flex>
            </div>
          </Flex>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <div className={styles.number}>1</div>
              <div className={styles.line}></div>
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>2</div>
              <div className={styles.line}></div>
              <div className={styles.section2}>
                <div>-</div>
                <div>Алгоритмы</div>
              </div>
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>3</div>
              <div className={styles.line}></div>
              <div className={styles.section3}>
                <div>-</div>
                <div>Зум с командой</div>
              </div >
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>4</div>
              <div className={styles.line}></div>
              <div className={styles.section4}>
                <div>-</div>
                <div>Зум с руководителем</div>
              </div>
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>5</div>
              <div className={styles.section5}>
                <div>-</div>
                <div>Офер</div>
              </div>
            </li>
          </ul>
          <Flex justify={'space-between'}
            align={'center'}>
            <div>
              <div className={styles.section1}>
                <div>12.05 11:00</div>
                <div>AI HR</div>
              </div>
            </div>
            <div className={styles.onMeet}>Подключиться к интервью</div>
          </Flex>
        </div>
        <div className={styles.wrapMeet}>
          <Flex justify={'space-between'}>
            <h2>Бэк в Финтех</h2>
            <div>
              <Flex align={'center'}>
                <div className={styles.tag2}>Бэк</div>
                <div className={styles.img}>
                  {<ReksoftLogo/>}
                </div>
              </Flex>
            </div>
          </Flex>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <div className={styles.number}>1</div>
              <div className={cn(styles.line, [styles.dark])}></div>
            </li>
            <li className={styles.li}>
              <div className={styles.number}>2</div>
              <div className={styles.line}></div>
              <div className={styles.section2}>
                <div>17.05 14:00</div>
                <div>Алгоритмы</div>
              </div>
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>3</div>
              <div className={styles.line}></div>
              <div className={styles.section3}>
                <div>-</div>
                <div>Зум с командой</div>
              </div >
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>4</div>
              <div className={styles.line}></div>
              <div className={styles.section4}>
                <div>-</div>
                <div>Зум с руководителем</div>
              </div>
            </li>
            <li className={styles.liGray}>
              <div className={styles.number}>5</div>
              <div className={styles.section5}>
                <div>-</div>
                <div>Офер</div>
              </div>
            </li>
          </ul>
          <Flex justify={'space-between'}
            align={'center'}>
            <div>
              <div className={styles.section1}>
                <div>12.05 11:00</div>
                <div>AI HR</div>
              </div>
            </div>
            <div className={styles.onMeet}>Подключиться к интервью</div>
          </Flex>
        </div>
      </Flex>
    </Container>
  )
}
