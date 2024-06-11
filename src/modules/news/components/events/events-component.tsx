import { Typography } from 'antd'

import eventsImg from 'core/assets/images/events1.png'

import styles from './events.module.css'

export const EventsComponent = () => {
  console.log('Events')

  return (
    <div className={styles.wrapImg}>
      <img className={styles.eventsImg} src={eventsImg}/>
      <Typography.Title level={4} className={styles.h4}>Текст тут есть</Typography.Title>
      <div className={styles.tag}>26 апреля, 12 :00</div>
    </div>
  )
}
