
import type { ReactNode } from 'react'

import { type TAuthorMessage } from '../agata-interview-types'

export interface IMessageProps {
  author: TAuthorMessage
  createdDate?: string
  message?: ReactNode
  questionIndex?: number | null
  video?: string
  totalQuestions?: number
}
