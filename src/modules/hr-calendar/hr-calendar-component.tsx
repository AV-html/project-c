import { type FC } from 'react'

import { Calendar } from '../calendar'

export const HrCalendarComponent: FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Calendar/>
    </div>
  )
}
