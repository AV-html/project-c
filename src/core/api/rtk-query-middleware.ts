import { isRejectedWithValue, type Middleware } from '@reduxjs/toolkit'
import { notification } from 'antd'

export const rtkQueryErrorMiddleware: Middleware = () => {
  return (next) => {
    return (action) => {
      if (isRejectedWithValue(action)) {
        console.warn(action)
        notification.error({ message: 'Ошибка', description: action.error.message })
      }

      return next(action)
    }
  }
}
