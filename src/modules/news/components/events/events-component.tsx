import eventsImg from 'core/assets/images/events1.png'

import styles from './events.module.css'

export const EventsComponent = () => {
  console.log('Events')

  return (
    <div className={styles.wrapImg}>
      <img className={styles.eventsImg} src={eventsImg}/>
      <h4 className={styles.h4}>Текст тут есть</h4>
      <div className={styles.tag}>26 апреля, 12 :00</div>
    </div>
  )
}
