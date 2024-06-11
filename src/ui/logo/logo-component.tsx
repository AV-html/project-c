import { type FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { goToNewsRoute } from 'app/app-router/app-router-configs'

import CommitLogo from 'core/assets/images/commit-logo.svg'
import ReksoftLogo from 'core/assets/images/reksoft-logo.svg'

import { Icon } from '../icon'

import styles from './logo.module.css'

export const LogoComponent: FC = () => {
  const navigation = useNavigate()

  const handleGoToStartPage = () => {
    navigation(goToNewsRoute())
  }

  return (
    <button className={styles.logo} onClick={handleGoToStartPage}>
      <div className={styles.left}>
        <ReksoftLogo width={129} height={25}/>
      </div>
      <div className={styles.center}>
        <Icon name={'close'} size={16}/>
      </div>
      <div className={styles.right}>
        <CommitLogo width={163} height={36}/>
      </div>
    </button>
  )
}
