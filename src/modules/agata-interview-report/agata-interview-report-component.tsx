import { type FC } from 'react'

import { goToAgataInterviewListRoute } from 'app/app-router/app-router-configs'

import { BackButton } from 'ui/back-button'

import styles from './agata-interview-report.module.scss'

export const AgataInterviewReportComponent: FC = () => {
  return (
    <div className={styles.report}>
      <BackButton path={goToAgataInterviewListRoute()}/>
      AgataInterviewReportComponent
    </div>
  )
}
