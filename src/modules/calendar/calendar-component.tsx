import React, { type FC } from 'react'

import type { BadgeProps, CalendarProps } from 'antd'
import { Badge, Calendar } from 'antd'
import type { Dayjs } from 'dayjs'

import { getListData, getMonthData } from './calendar-utils'

import styles from './calendar.module.css'

export const CalendarComponent: FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value)
    return num
      ? (
        <div className={styles['notes-month']}>
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      )
      : null
  }

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value)
    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }

  return <Calendar cellRender={cellRender} />
}
