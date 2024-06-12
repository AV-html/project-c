import {
  type FC, useEffect, useRef, useState
} from 'react'

import { Typography } from 'antd'

import type { IStopwatchProps } from './stopwatch-types'

export const StopwatchComponent: FC<IStopwatchProps> = ({ isRunning }) => {
  const [time, setTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else if (!isRunning && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2)
    const minutes = Math.floor(time / 60)
    const getMinutes = `0${minutes % 60}`.slice(-2)
    return `${getMinutes}:${getSeconds}`
  }

  return (
    <Typography.Text type={'secondary'}>
      {formatTime(time)}
    </Typography.Text>
  )
}
